var express = require('express');
var router = express.Router();
var util = require('util')


/* GET home page. */
router.get('/', function(req, res, next) {

  var deviceAgent = req.headers['user-agent'].toLowerCase();
  var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);


  if(agentID) {
    res.redirect('/mobile')
  } else {
    console.log(util.inspect({ip: req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress || "unknown", url: "/",time: new Date()},{colors: true}));
    res.render('index', {title:'index',NODE_ENV: process.env.NODE_ENV});
  }
});

module.exports = router;
