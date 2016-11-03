var express = require('express');
var router = express.Router();

var file = require('./file')
var animes = require('./animes')
var index = require('./index')
var ajax = require('./ajax/index')

router.use(file)
router.use(animes)
router.use(index)
router.use('/ajax',ajax)

module.exports = router;