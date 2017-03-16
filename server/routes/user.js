var express = require('express');
var router = express.Router();

router.get('/user', function(req, res, next) {
  res.render('default', { title: 'user' })
});

router.get('/gomoku', function(req, res, next) {
  res.render('default', { title: 'gomoku' })
});

module.exports = router;