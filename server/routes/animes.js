var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/animes', function(req, res, next) {
  res.render('default', { title: 'animes' , script: 'js/animes.js'});
});

module.exports = router;