var app = require('../app').app;
var port = require('./port');
app.set('port', port);

var http = require('http');
var server = http.Server(app);
var io = require('socket.io')(server)
var sessionMiddleware = require('../app').sessionMiddleware;

io.use(function(socket, next) {
  sessionMiddleware(socket.request, socket.request.res, next);
});


io.of('gomoku').on('connection', function (socket) {
  console.log('gomoku connection')
  socket.on('log',()=>{
    console.log(
      'socket.request.session:\n\n',
      socket.request.session
    );
  })
  socket.on('join',()=>{
    socket.join('roomtest')
  })

  socket.on('seesion', ()=>{
    console.log('seesion:\n\n',seesion);
  })

});



module.exports = server;