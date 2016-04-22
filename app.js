var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);

// Setup Routes
var routes = require('./routes/index');
var posts = require('./routes/posts');

// Database configuration
var config = require('./config/db');
  // connect to the db
mongoose.connect(config.url);
  // check if MongoDB is running
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Make sure MongoDB is running.');
});
  // check if connection success
mongoose.connection.once('connected', function() {
  console.log('db connected successfully');
});

var app = express();

// Passport configuration
require('./config/passport')(passport);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
// secret for session
app.use(session({
  secret: 'SECRET',
  saveUninitialized: true,
  resave: true,
  // store session on MongoDB using express-session + connect-mongo
  store: new MongoStore({
    url: config.url,
    collection: 'sessions'
  })
}));

// Init passport authentication
app.use(passport.initialize());
// Persistent login sessions
app.use(passport.session());

app.use('/', routes);
app.use('/api', posts);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
