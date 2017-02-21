var svgCaptcha = require('svg-captcha')
var express = require('express');
var router = express.Router();

router.get('/getCaptcha',(req,res)=>{
  var captcha = svgCaptcha.create()
  req.session.captcha = captcha.text.toLowerCase()
  res.set('Content-Type','image/svg+xml')
  res.send(captcha.data)
})

router.get('/checkCaptcha',(req,res)=>{

  if (!req.session.captcha) {
    res.send({state:4001}) //未获取验证码
    return
  }
  if (!req.query.captcha) {
    res.send({state:4002}) //验证码为空
    return
  }
  if (req.query.captcha!==req.session.captcha) {
    res.send({state:4003}) //验证码错误
    return
  }

  res.send({state:1}) //验证码正确
})

module.exports = router