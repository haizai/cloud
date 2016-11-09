var express = require('express');
var router = express.Router();

router.get('/file', function(req, res, next) {
  res.render('file');
});

module.exports = router;
