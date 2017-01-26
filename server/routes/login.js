var express = require('express');
var router = express.Router();

router.get('/login', function(req, res, next) {

  var session = req.session

  if (session.isLogin) {
    res.redirect('/user')
  } else {
    res.render('login',{title: 'login', session: req.session});
  }



});

module.exports = router;