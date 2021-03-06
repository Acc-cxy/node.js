var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const blogRouter  = require('./routes/blog');
const useRouter  = require('./routes/use');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret : 'WJiol#23123',
  cookie : {
    path:'/', //默认配置
    httpOnly : true,  //默认配置
    maxAge : 24*60*60*1000
  }
}))

app.use('/', indexRouter);
app.use('/test', indexRouter);
app.use('/users', usersRouter);

app.use('/api/blog', (req, res, next) => {
  console.log('处理blog路由')
  next()
},blogRouter);
app.use('/api/use', useRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
