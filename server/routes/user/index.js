var express = require('express');
var router = express.Router();

var register = require('./register')
var login = require('./login')
var user = require('./user')

router.use(register)
router.use(login)
router.use(user)

module.exports = router;