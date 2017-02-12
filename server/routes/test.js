var express = require('express');
var router = express.Router();

router.get('/test', function(req, res, next) {
  res.render('default', { title: 'user' })
});

module.exports = router;