var express = require('express');
var router = express.Router();

var file = require('./file')
var animes = require('./animes')
var index = require('./index')
var login = require('./login')
var ajax = require('./ajax/index')
var mobile = require('./mobile/index')

router.use(file)
router.use(animes)
router.use(login)
router.use(index)
router.use('/ajax',ajax)
router.use('/mobile',mobile)

module.exports = router;