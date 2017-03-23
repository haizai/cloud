var express = require('express');
var app = express();

var path = require('path');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// var formidable = require('formidable');
//var favicon = require('serve-favicon');
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


var cookieParser = require('cookie-parser');
app.use(cookieParser());


// express-session
var session = require('express-session')
app.set('trust proxy', 1)
let sessionMiddleware = session({
  secret: 'keyboard cat',
  cookie: {}
})
app.use(sessionMiddleware)


app.use(express.static(path.join(__dirname, 'public')));


var routes = require('./routes/routes');
app.use('/', routes);


if (process.env.NODE_ENV == "dev") {

  var logger = require('morgan');
  app.use(logger('dev'))

  //热更新
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
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});


module.exports = {
  app,
  sessionMiddleware
};