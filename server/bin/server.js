var app = require('../app');
var port = require('./port');
var http = require('http');

app.set('port', port);

var server = http.createServer(app);

module.exports = server;