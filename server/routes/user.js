var express = require('express');
var router = express.Router();

router.get('/user', function(req, res, next) {
  res.render('default', { title: 'user' })
});

module.exports = router;