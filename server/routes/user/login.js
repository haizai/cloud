var fs = require('fs')
var util = require('util');
var path = require('path')
var mongoose = require('mongoose')

var express = require('express');
var router = express.Router();

mongoose.Promise = global.Promise;

var db = require(path.resolve(__dirname, '..', '..', 'mongoose/db'))
var User = require(path.resolve(__dirname, '..', '..', 'mongoose/User'))



router.get('/login', (req, res) => {
  res.render('user/login', { title: 'login' });
})

router.post('/login', (req, res) => {
  console.log('?post login',req.body)
  User.findOne({'account': req.body.account}).exec((err,doc)=> {
    if (err) console.log(err)
    if (doc === null) {
      res.send({
        status: false,
        text:'无此账户名'
      })
    } else {
      if (doc.password !== req.body.password) {
        res.send({
          status:false,
          text:'密码错误'
        })
      } else {
        res.cookie('account',req.body.account, {maxAge:864000,path:'/',httpOnly:true})
        res.cookie('password',req.body.password, {maxAge:864000,path:'/',httpOnly:true})
        res.send({
          status:true
        })
      }
    }
  })

})

module.exports = router;