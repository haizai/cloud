var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/animes', function(req, res, next) {
  var deviceAgent = req.headers['user-agent'].toLowerCase();
  var agentID = deviceAgent.match(/(iphone|ipod|ipad|android)/);
  if(agentID) {
    res.redirect('/mobile/animes')
  } else {
   res.render('default', { title: 'animes' });
  }
});

module.exports = router;