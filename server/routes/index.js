var express = require('express');
var router = express.Router();
var util = require('util')


/* GET home page. */
router.get('/', function(req, res, next) {

  var deviceAgent = req.headers['user-agent'].toLowerCase();
  var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);

  console.log(util.inspect({ip: req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress || "unknown", time: req._startTime},{colors: true}));


  if(agentID) {
    res.redirect('/mobile')
  } else {
    res.render('index', {title:'index'});
  }
});

module.exports = router;
