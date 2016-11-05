var mongoose = require('mongoose')
var fs = require('fs')
var path = require('path')
var util = require('util');
var co = require('co')


var express = require('express');
var router = express.Router();

mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://localhost/haizai')

var animeSchma = new mongoose.Schema({
 id: Number, 
 title: String,
 allTitle: String,
 year: Number,
 info: {
  '导演': String,
  "编剧": String,
  "主演": String,
  "类型": String,
  "首播": String,
  '季数': String,
  "集数": String,
  "单集片长": String,
  "又名": String
 },
 rating: {
  value: Number,
  count: Number,
  start5: Number,
  start4: Number,
  start3: Number,
  start2: Number,
  start1: Number  
 },
 summary: String,
 comments: [String],
 reviews: [{
  title: String,
  html: [String]
 }]
});


var Anime = mongoose.model('Anime', animeSchma);

router.get('/animes', (req, res) => {

	console.log(req.query)
  let keyword = req.query.keyword ? decodeURIComponent(req.query.keyword).replace(/[\*\.\?\+\$\^\[\]\(\)\{\}\|\\\/]/g,'') : ''
  let skip = req.query.page ? parseInt(req.query.page, 10) * 10 - 10 : 0

  co(function* () {
    var animes = yield Anime
      .find(
        {allTitle: new RegExp(keyword, 'i')},
        {_id: 0, title: 1, allTitle: 1, info: 1, rating: 1, year: 1, id: 1}
        )
      .limit(10)
      .skip(skip)
      .exec();
    var count = yield Anime.find({allTitle: new RegExp(keyword, 'i')}).count().exec()

    return yield {animes, count}
  }).then(doc=> {
    res.send(doc)
  }, err => {
    console.error(err)
  })

})
module.exports = router;
