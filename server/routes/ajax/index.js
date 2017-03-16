var express = require('express');
var router = express.Router();

var file = require('./file')
var animes = require('./animes')
var captcha = require('./captcha')
var user = require('./user')
var gomoku = require('./gomoku')


// dev环境允许跨域
router.all('*',(req,res,next)=> {
  if (process.env.NODE_ENV === 'dev') {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080'); // cookie跨域,不能为*
    res.header('Access-Control-Allow-Origin', 'http://localhost:8081'); // cookie跨域,不能为*
    res.header('Access-Control-Allow-Credentials', 'true'); //cookie跨域
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', '*');
  }
  next()
})

router.use(file)
router.use(animes)
router.use(captcha)
router.use('/user',user)
router.use('/gomoku',gomoku)


module.exports = router;