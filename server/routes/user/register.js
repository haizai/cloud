var fs = require('fs')
var util = require('util');
var path = require('path')
var mongoose = require('mongoose')

var express = require('express');
var router = express.Router();

mongoose.Promise = global.Promise;

var db = require(path.resolve(__dirname, '..', '..', 'mongoose/db'))
var User = require(path.resolve(__dirname, '..', '..', 'mongoose/User'))


let uid

User.find().count().exec((err,doc)=>{
  uid = doc
})


router.get('/register', (req, res) => {
  res.render('user/register', { title: 'register' });
})

router.post('/register', (req, res) => {
  // console.log('?post register',req.body)
  // uid++
  // var user = new User({
  //   uid,
  //   account: req.body.account,
  //   password: req.body.password,
  //   name: req.body.name
  // })
  // user.save((err,doc)=>{
  //   if(err)console.log(err)
  //   console.log('save user: ', doc)
  //   res.send({state:'success'})
  // })
  res.send({
    status: false,
    text: '登入系统还在测试'
  })
})

module.exports = router;