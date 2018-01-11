var app = require('../app').app;
var port = require('./port');
app.set('port', port);

var http = require('http');
var server = http.Server(app);

module.exports = server;