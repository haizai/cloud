var mongoose = require('mongoose')
mongoose.Promise = global.Promise;
var fs = require('fs')
var path = require('path')

var util = require('util')

var db = require(path.resolve(__dirname, '..', '..', 'mongoose/db'))
var User = require(path.resolve(__dirname, '..', '..', 'mongoose/User'))

var admin = {
  uid: 0, 
  account: 'admin',
  password: 'admin123',
  position: 'admin',
  sign: '使生如夏花之灿烂。',
  msg: {
    sex: 'male',
    proID: 11,
    cityID: 78
  }
}

var member = {
  uid: 1, 
  account: 'member',
  password: 'member123',
}

User.remove({uid: 0}).exec((err,doc)=>{
  new User(admin).save()
})
User.remove({uid: 1}).exec((err,doc)=>{
  new User(member).save()
})


var express = require('express');
var router = express.Router();

function send(req,res,send,obj) {
  var method = req.method
  var param = method == 'GET' ? req.query : req.body
  var url = req.originalUrl.replace(/\?.*$/,'')

  console.log('?'+method,url,param,send)
  if (req.session.isLogin) {
    User.update({account: req.session.user.account},{$push:{record:{
      url,
      method,
      param,
      res: send,
      time: new Date()
    }}}).exec(err=> {
      if (err) {
        console.log('?record:',err)
      }
    })
  }
  if (obj) {
    if (obj.cb) cb()
    if (obj.trueSend) {
      res.send(obj.trueSend) //防止record循环记录record
      return
    }
  }
  res.send(send)
}




router.get('/login',(req, res) => {


  if (!req.query.account) {
    send(req, res, {state: 1001}) //用户名为空
    return
  }

  if (!req.query.password) {
    send(req,res,{state: 1002}) //密码为空
    return
  }

  User.findOne({account:req.query.account},{_id:0,__v:0},(err,user) => {
    if (err) {
      console.log(__dirname,' ERROR:\n',err)
      send(req, res, {state:3001}) //数据库错误
      return 
    }
    if (user) {
      if (req.query.password === user.password) {
        req.session.isLogin = true
        req.session.user = user
        console.log('?login',req.session)
        send(req,res,{state:1})
        // send(req, res, {state:1,user}) //登入成功
      } else {
        send(req, res, {state:1004}) //密码错误
      }
    } else {
      send(req, res, {state:1003}) //用户名不存在
    }
  })

})

router.get('/logoff',(req, res) => {

  send(req,res,{state:1},{cb:function() {
    req.session.isLogin = false
    req.session.user = null
  }})

})

router.post('/setSign', (req, res) => {

  if (req.session.isLogin) {
    if (!req.body.sign) {
      send(req, res, {state:1002}) //个性签名为空
    } else {
      if (req.body.sign.length > 30) {
        send(req, res, {state:1003}) //个性签名超过30个字符
      } else {
        User.update({account: req.session.user.account},{$set: {sign: req.body.sign}}, err => {
          if (err) {
            console.log(__dirname,' Error:\n', err)
            send(req, res, {state:3001}) //数据库更新错误
          } else {
            req.session.user.sign = req.body.sign
            send(req,res,{state:1}) //成功
          }
        })
      }
    }
  } else {
    send(req, res, {state:2001}) //尚未登入
  }
})

router.post('/setSex', (req, res) => {

  if (!req.session.isLogin) {
    send(req, res, {state:2001}) //尚未登入
    return
  }
  if (!req.body.sex) {
    send(req, res, {state:1001}) //性别为空
    return
  }
  if (req.body.sex != 'secret' && req.body.sex != 'male' && req.body.sex != 'female' && req.body.sex != 'other' ) {
    send(req, res, {state:1002}) //性别不为给定值
    return
  }
  User.update({account: req.session.user.account},{$set: {'msg.sex': req.body.sex}}, err => {
    if (err) {
      console.log(__dirname,' Error:\n', err)
      send(req, res, {state:3001}) //数据库更新错误
      return
    }
    req.session.user.msg.sex = req.body.sex
    send(req, res, {state:1}) //成功
  })
})


router.get('/getProAndCity',(req, res) => {

  if (!req.session.isLogin) {
    send(req, res, {state:2001}) //尚未登入
    return
  }

  User.findOne({account: req.session.user.account},{'msg.proID':1,'msg.cityID':1}).exec( (err,doc) => {
    if (err) {
      console.log(__dirname,' Error:\n', err)
      send(req, res, {state:3001}) //数据库错误
      return
    }
    send(req, res, {
      state:1,
      proID: doc.msg.proID,
      cityID: doc.msg.cityID,
    })
  })
})

router.post('/setProID', (req, res) => {

  if (!req.session.isLogin) {
    send(req, res, {state:2001}) //尚未登入
    return
  }
  if (req.body.proID === void 0) {
    send(req, res, {state:1001}) //proID为空
    return
  }
  if (!/^\d+$/.test(req.body.proID)) {
    send(req, res, {state:1002}) //proID不全为数字
    return
  }
  User.update({account: req.session.user.account},{$set: {'msg.proID': +req.body.proID,'msg.cityID':0}}, err => {
    if (err) {
      console.log(__dirname,' Error:\n', err)
      send(req, res, {state:3001}) //数据库更新错误
      return
    }
    send(req, res, {state:1}) //成功
  })
})

router.post('/setCityID', (req, res) => {

  if (!req.session.isLogin) {
    send(req, res, {state:2001}) //尚未登入
    return
  }
  if (req.body.cityID === void 0) {
    send(req, res, {state:1001}) //cityID为空
    return
  }
  if (!/^\d+$/.test(req.body.cityID)) {
    send(req, res, {state:1002}) //cityID不全为数字
    return
  }
  User.update({account: req.session.user.account},{$set: {'msg.cityID': +req.body.cityID}}, err => {
    if (err) {
      console.log(__dirname,' Error:\n', err)
      send(req, res, {state:3001}) //数据库更新错误
      return
    }
    send(req, res, {state:1}) //成功
  })
})

router.get('/getRecord',(req, res) => {

  if (!req.session.isLogin) {
    send(req, res, {state:2001}) //尚未登入
    return
  }

  User.findOne({account: req.session.user.account},{'record':1}).exec( (err,doc) => {
    if (err) {
      console.log(__dirname,' Error:\n', err)
      send(req, res, {state:3001}) //数据库错误
      return
    }
    send(req, res, {state:1},{trueSend:{state:1,record: doc.record}})
  })
})


module.exports = router