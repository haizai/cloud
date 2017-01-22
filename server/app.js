var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var formidable = require('formidable');
var session = require('express-session')


var routes = require('./routes/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
if (process.env.NODE_ENV == "dev") app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// express-session
app.set('trust proxy', 1)
let sess = {
  secret: 'keyboard cat',
  cookie: {}
}
app.use(session(sess))




app.use('/', routes);

if (process.env.NODE_ENV == "dev") {

  var webpack = require('webpack')
  var webpackDevMiddleware = require('webpack-dev-middleware')
  var webpackHotMiddleware = require('webpack-hot-middleware')
  var webpackDevConfig = require('../webpack.config.js')
  
  var compiler = webpack(webpackDevConfig);
  app.use(webpackDevMiddleware(compiler, {
      publicPath: webpackDevConfig.output.publicPath,
      noInfo: true,
      stats: {
          colors: true
      }
  }));
  app.use(webpackHotMiddleware(compiler));
  // var reload = require('reload');
  // var http = require('http');

  // var server = http.createServer(app);
  // reload(server, app);

  // server.listen(80, function(){
  //   console.log('App (dev) is now running on port 80!');
  // });
}


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
