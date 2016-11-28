var mongoose = require('mongoose')

mongoose.Promise = global.Promise;

var db = mongoose.connect('mongodb://localhost/haizai')

module.exports = db;