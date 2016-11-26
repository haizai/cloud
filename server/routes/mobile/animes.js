var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/animes', function(req, res, next) {
  var deviceAgent = req.headers['user-agent'].toLowerCase();
  var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
  if(agentID) {
    res.render('mobile/default', { title: 'animes' });
  } else {
    res.redirect('/animes')
  }
});

module.exports = router;