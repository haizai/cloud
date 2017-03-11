var express = require('express');
var router = express.Router();

router.get('/oldUser', function(req, res, next) {

  var session = req.session

  if (session.isLogin) {
    res.render('oldUser',{title: 'user', session: req.session});
  } else {
    res.redirect('/oldLogin');
  }


});

module.exports = router;