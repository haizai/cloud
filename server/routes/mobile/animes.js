var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/animes', function(req, res, next) {
  res.render('mobile/default', { title: 'animes' });
});

module.exports = router;