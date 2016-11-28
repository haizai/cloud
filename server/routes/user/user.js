var fs = require('fs')
var util = require('util');
var path = require('path')
var mongoose = require('mongoose')

var express = require('express');
var router = express.Router();

mongoose.Promise = global.Promise;

var db = require(path.resolve(__dirname, '..', '..', 'mongoose/db'))
var User = require(path.resolve(__dirname, '..', '..', 'mongoose/User'))


router.get('/user', (req, res) => {
  console.log('cookies',req.cookies)
  if (!req.cookies.account || !req.cookies.password) {
    res.send('请先登入')
    return
  }
  User.findOne({account: req.cookies.account}).exec((err,doc)=> {
    if(doc === 'null' || doc.password !== req.cookies.password) {
      res.send('请先登入')
    } else {
      res.render('user/user', { title: 'user' ,user: doc});
    }
  })
})

router.post('/user/setSign', (req, res) => {
  console.log('?post /user/setSign', req.body, req.cookies)
  if (req.body.sign) {
    User.findOneAndUpdate({'account':req.cookies.account},{ $set:{'sign':req.body.sign}}).exec((err,doc)=>{
      if(err) console.log(err)
      res.send({
        status: true
      })
    })
  }
})

module.exports = router;