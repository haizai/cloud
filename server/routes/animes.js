var express = require('express');
var router = express.Router();
var util = require("util")

/* GET home page. */
router.get('/animes', function(req, res, next) {
  var deviceAgent = req.headers['user-agent'].toLowerCase();
  var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
  if(agentID) {
    res.redirect('/mobile/animes')
  } else {
    res.render('default', { title: 'animes' });
    console.log(util.inspect({ip: req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress || "unknown", url: "/animes",time: new Date()},{colors: true}));
  }
});

module.exports = router;