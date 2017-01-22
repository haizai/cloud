var mongoose = require('mongoose')
mongoose.Promise = global.Promise;
var fs = require('fs')
var path = require('path')

var db = require(path.resolve(__dirname, '..', '..', 'mongoose/db'))
var User = require(path.resolve(__dirname, '..', '..', 'mongoose/User'))

var admin = {
  uid: 0, 
  account: 'admin',
  password: 'admin123',
  position: 'admin',
}

var tourist = {
  uid: 1, 
  account: 'tourist',
  password: 'tourist123',
}

User.findOne({uid: 0}).exec((err,doc)=>{
  if (doc) {
    User.update({uid: 0},{$set:admin})
  } else {
    new User(admin).save()
  }
})
User.findOne({uid: 1}).exec((err,doc)=>{
  if (doc) {
    User.update({uid: 1},{$set:tourist})
  } else {
    new User(tourist).save()
  }
})


var express = require('express');
var router = express.Router();

router.get('/login',(req, res) => {

  if (process.env.NODE_ENV === 'dev') {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'POST, GET');
  }

  console.log('?GET login',req.query)

  if (!req.query.account) {
    res.send({state: 1001}) //用户名为空
    return
  }

  if (!req.query.password) {
    res.send({state: 1002}) //密码为空
    return
  }

  User.findOne({account:req.query.account},{_id:0,__v:0},(err,user) => {
    if(err) console.log(__dirname,' ERROR:\n',err)
    if (user) {
      if (req.query.password === user.password) {
        req.session.isLogin = true
        req.session.user = user
        console.log('?login',req.session)
        res.send({state:1,user}) //登入成功
      } else {
        res.send({state:1004}) //密码错误
      }
    } else {
      res.send({state:1003}) //用户名不存在
    }
  })
})

module.exports = router