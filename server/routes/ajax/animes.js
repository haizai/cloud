var mongoose = require('mongoose')
var fs = require('fs')
var path = require('path')
var util = require('util');

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

// Anime.find({}).exec((err, doc) => {
// 	console.log(util.inspect(doc))
// })

router.get('/animes', (req, res) => {

	console.log(req.query)

  let keyword = req.query.keyword ? decodeURIComponent(req.query.keyword) : ''


  Anime.find({title: new RegExp(keyword, 'i')}, (err, doc) => {
    res.send(doc)
  })

})
module.exports = router;
