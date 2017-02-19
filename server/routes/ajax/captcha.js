var svgCaptcha = require('svg-captcha')
var express = require('express');
var router = express.Router();

router.get('/captcha',(req,res)=>{
  var captcha = svgCaptcha.create()
  req.session.captcha = captcha.text
  console.log(req.session)
  res.set('Content-Type','image/svg+xml')
  res.send(captcha.data)
})

module.exports = router