var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {

  var session = req.session

  if (session.isLogin) {
    res.render('login',{user: session.user});
  } else {
    res.render('login');
  }



});

module.exports = router;