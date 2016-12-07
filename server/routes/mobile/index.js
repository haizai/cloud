var express = require('express');
var router = express.Router();
var util = require("util")
var animes = require('./animes')

router.get('/', function(req, res, next) {
  var deviceAgent = req.headers['user-agent'].toLowerCase();
  var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
  if(agentID) {
    console.log(util.inspect({ip: req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress || "unknown", url: "/mobile",time: new Date()},{colors: true}));
    res.render('mobile/index', { title: 'mobile' });
  } else {
    res.redirect('/')
  }
});


router.use(animes)

module.exports = router; 