var express = require('express');
var router = express.Router();

var animes = require('./animes')

router.get('/', function(req, res, next) {
  var deviceAgent = req.headers['user-agent'].toLowerCase();
  var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
  if(agentID) {
    res.render('mobile/index', { title: 'mobile' });
  } else {
    res.redirect('/')
  }
});


router.use(animes)

module.exports = router; 