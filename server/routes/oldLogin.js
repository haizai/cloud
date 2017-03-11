var express = require('express');
var router = express.Router();

router.get('/oldLogin', function(req, res, next) {

  var session = req.session

  if (session.isLogin) {
    res.redirect('oldUser')
  } else {
    res.render('oldLogin',{title: 'login', session: req.session});
  }



});

module.exports = router;