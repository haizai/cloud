var server = require('./server.js')
var io = require('socket.io')(server)
var sessionMiddleware = require('../app').sessionMiddleware;

io.use(function(socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next);
});


module.exports = {
  server,
  io
};