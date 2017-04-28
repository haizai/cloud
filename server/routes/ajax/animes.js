var mongoose = require('mongoose')
var fs = require('fs')
var path = require('path')
var util = require('util');
var co = require('co')

var express = require('express');
var router = express.Router();

mongoose.Promise = global.Promise;

var db = require(path.resolve(__dirname, '..', '..', 'mongoose/db.js'))

var Anime = require(path.resolve(__dirname, '..', '..', 'mongoose/Anime'))

router.get('/animes', (req, res) => {

	console.log('?GET animes',req.query)

  let keyword = req.query.keyword ? decodeURIComponent(req.query.keyword).replace(/[\*\.\?\+\$\^\[\]\(\)\{\}\|\\\/]/g,'') : ''
  let skip = (req.query.page && parseInt(req.query.page, 10) > 0) ? parseInt(req.query.page, 10) * 10 - 10 : 0

  let range = 'all'
  let reg = new RegExp(keyword, 'i')
  let findObj = {}

  if (req.query.range) {
    switch (req.query.range) {
      case 'default':
        findObj = {$or: [{allTitle: reg}, {'info.又名': reg}, {'info.主演': reg}, {'info.导演': reg}, {'info.编剧': reg}]}
        break
      case 'title':
        findObj = {$or: [{allTitle: reg}, {'info.又名': reg}]}
        break;
      case 'person':
        findObj = {$or: [{'info.主演': reg}, {'info.导演': reg}, {'info.编剧': reg}]}
        break;
      case 'summary':
        findObj = {summary: reg}
        break;
      case 'all':
        findObj = {$or: [{allTitle: reg}, {'info.又名': reg}, {'info.主演': reg}, {'info.导演': reg}, {'info.编剧': reg}, {summary: reg}]}
        break
      default:
        break;
    }
  }

  let sort = {}

  if (req.query.sort) {
    switch (req.query.sort) {
      case 'year':
        sort = {'year': -1}
        break;
      case 'value':
        sort = {'rating.value': -1}
        break;
      case 'count':
        sort = {'rating.count': -1}
        break;
      default:
        break;
    }
  } 

  co(function* () {
    var animes = yield Anime
      .find(
        findObj,
        {_id: 0, title: 1, allTitle: 1, info: 1, 'rating.count': 1,'rating.value': 1, year: 1, id: 1}
        )
      .sort(sort)
      .limit(10)
      .skip(skip)
      .exec();
    var count = yield Anime.find(findObj).count().exec()

    return yield {animes, count}
  }).then(doc=> {
    res.send(doc)
  }, err => {
    console.error('Error ?GET animes \n',err)
  })

})

router.get('/anime', (req, res) => {

  console.log('?GET anime',req.query)

    if (req.query.id) {
      Anime.findOne({
        id: req.query.id
      },{
        _id: 0, __v: 0,"reviews._id": 0
      }).exec((err, doc) => {
        if (err) console.error('Error ?GET anime id \n',err)
        res.send(doc)
        return
      })
    }
    if (req.query.random) {
      co(function* (){
        let count = yield Anime.count().exec()
        var rand = Math.floor(Math.random() * count)
        return yield Anime.findOne({},{_id: 0,id: 1}).skip(rand).exec();
      }).then( doc => {
        res.send(doc)
      }, err => {
        console.error('Error ?GET anime random \n',err)
      })
    }

})

module.exports = router;