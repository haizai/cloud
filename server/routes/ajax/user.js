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

var test = {
  uid: 2, 
  account: 'test',
  password: 'test123',
}


User.remove({uid: 0}).exec((err,doc)=>{
  new User(admin).save()
})
User.remove({uid: 1}).exec((err,doc)=>{
  new User(member).save()
})
User.findOne({uid:2}).exec((err,doc)=>{
  if (!doc) new User(test).save()
})




var express = require('express');
var router = express.Router();

/**
 * 中间件函数，记录操作记录
 * @param  req  请求
 * @param  res  响应
 * @param  back 用于记录的返回值
 * @param  obj  {cb: 返回前执行的函数,trueSend: 真实的返回值}
 */

function send(req,res,back,obj) {
  var method = req.method
  var param = method == 'GET' ? req.query : req.body
  var url = req.originalUrl.replace(/\?.*$/,'')

  console.log('?'+method,url,param,back)
  var account //只要有account参数就能记录
  if (req.session.isLogin) {
    account = req.session.user.account
  } else {
    if (method == 'GET') account = req.query.account
    if (method == 'POST') account = req.body.account
  }
  if (account) {
    User.update({account},{$push:{record:{
      url,
      method,
      param,
      res: back,
      time: new Date()
    }}}).exec(err=> {
      if (err) {
        console.log('?record:',err)
      }
    })
  }
  if (obj) {
    if (obj.cb) {
      obj.cb()
    }
    if (obj.trueSend) {
      res.send(obj.trueSend) //防止record循环记录record
      return
    }
  }
  res.send(back)
}


router.get('/login',(req, res) => {

  if (req.session.isLogin) {
    send(req, res, {state: 2002}) //你已登录
    return
  }


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
        // console.log('?login',req.session)
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

router.get('/checkLogin',(req,res) => {
  req.session.isLogin ? res.send({state:2002}) : res.send({state:2001}) //已登录，未登录
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

router.get('/getUserInCenter',(req, res) => {

  if (!req.session.isLogin) {
    send(req, res, {state:2001}) //尚未登入
    return
  }

  User.findOne({account: req.session.user.account},{'_id':0,'uid':1,'account':1,'msg':1,'position':1,'sign':1,'registerTime':1}).exec( (err,doc) => {
    if (err) {
      console.log(__dirname,' Error:\n', err)
      send(req, res, {state:3001}) //数据库错误
      return
    }
    send(req, res, {
      state:1,
      user: doc
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


router.get('/checkAccount',(req,res) => {

  if (!req.query.account) {
    send(req, res, {state: 1001}) //用户名为空
     return
  }

  let account = req.query.account

  if (account.length < 4 || account.length > 16) {
    send(req, res, {state: 1002}) //用户名长度应该在4-16之间
    return
  }

  if(!/^[\dA-z]+$/.test(account)) {
    send(req, res, {state: 1003}) //用户名应该仅使用英文或数字
    return
  }

  User.findOne({account},(err,doc) => {
    if (err) {
      console.log(__dirname,' ERROR:\n',err)
      send(req, res, {state:3001}) //数据库错误
      return 
    } 
    if (doc) {
      send(req, res, {state:3002}) //用户名已存在
      return
    }
    send(req, res, {state:1}) //用户名可用
  })
})

router.post('/register',(req,res)=>{

  if (!req.session.captcha) {
    send(req, res, {state: 4001})//未获取验证码
    return
  }
  if (!req.body.captcha) {
    send(req, res, {state:4002}) //验证码为空
    return
  }
  if (req.body.captcha!==req.session.captcha) {
    send(req, res, {state:4003}) //验证码错误
    return
  }

  if (!req.body.account) {
    send(req, res, {state: 1001}) //用户名为空
    return
  }
  if (!req.body.password) {
    send(req, res, {state: 1011}) //密码为空
    return
  }
  let account = req.body.account,
    password = req.body.password

  if (account.length < 4 || account.length > 16) {
    send(req, res, {state: 1002}) //用户名长度应该在4-16之间
    return
  }

  if (password.length < 6 || password.length > 16) {
    send(req, res, {state: 1012}) //密码长度应该在6-16之间
    return
  }

  if(!/^[\dA-z]+$/.test(account)) {
    send(req, res, {state: 1003}) //用户名应该仅使用英文或数字
    return
  }

  if(!/^[\dA-z]+$/.test(password)) {
    send(req, res, {state: 1013}) //密码应该仅使用英文或数字
    return
  }

  let passwordStrength = 1
  if (password.length == 16) passwordStrength++
  if (/\d/.test(password) && /[A-z]/.test(password)) passwordStrength++
  if (passwordStrength == 1) {
    send(req, res, {state: 1014}) //密码强度过低
    return
  }

  User.findOne({account},(err,doc) => {
    if (err) {
      console.log(__dirname,' ERROR:\n',err)
      send(req, res, {state:3001}) //数据库findOne错误
      return 
    } 
    if (doc) {
      send(req, res, {state:3002}) //用户名已存在
      return
    }
    
    User.find({},{'_id':0,uid:1}).sort({uid:-1}).limit(1).exec((err2,doc)=>{
      if (err2) {
        console.log(__dirname,' ERROR:\n',err2)
        send(req, res, {state:3003}) //数据库find错误
        return
      }
      new User({uid: doc[0].uid+1,account,password}).save(err3=>{
        if(err3) {
          console.log(__dirname,' ERROR:\n',err2)
          send(req, res, {state:3004}) //数据库save错误
          return
        }
        send(req, res, {state:1})
      })
    })
  })
})

module.exports = router