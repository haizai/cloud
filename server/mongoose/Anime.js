var mongoose = require('mongoose')
mongoose.Promise = global.Promise;

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

module.exports = Anime