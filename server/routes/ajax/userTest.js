var mongoose = require('mongoose')
mongoose.Promise = global.Promise;
var fs = require('fs')
var path = require('path')

var db = require(path.resolve(__dirname, '..', '..', 'mongoose/db'))
var User = require(path.resolve(__dirname, '..', '..', 'mongoose/User'))

var user = {
  uid: 0, 
  account: 'admin',
  password: 'admin123',
  position: 'admin',
}

User.findOne({uid: 0}).exec((err,doc)=>{
  console.log(doc?'update':'save')
  if (doc) {
    User.update({uid: 0},{$set:user})
  } else {
    new User(user).save()
  }
})