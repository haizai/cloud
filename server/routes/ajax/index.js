var express = require('express');
var router = express.Router();

var file = require('./file')
var animes = require('./animes')
var user = require('./user')

router.use(file)
router.use(animes)
router.use('/user',user)

module.exports = router;