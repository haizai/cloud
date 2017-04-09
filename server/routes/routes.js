var express = require('express');
var router = express.Router();

var animes = require('./animes')
var index = require('./index')
var oldLogin = require('./oldLogin')
var oldUser = require('./oldUser')

var ajax = require('./ajax/index')
var mobile = require('./mobile/index')


router.use(animes)
router.use(oldLogin)
router.use(oldUser)

router.use(index)
router.use('/ajax',ajax)
router.use('/mobile',mobile)


function defalutRouter() {
  [].slice.call(arguments).forEach( title => {
    router.get('/' + title, function(req, res, next) {
      res.render('default', { title })
    });
  } )
}
function titleRouter() {
  [].slice.call(arguments).forEach( title => {
    router.get('/' + title, function(req, res, next) {
      res.render(title, { title })
    });
  } )
}
defalutRouter('user','gomoku')
titleRouter('file')

module.exports = router;