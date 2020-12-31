var createError = require('http-errors');
var express = require('express');
var path = require('path');
const fs = require('fs')
const ejs = require('ejs')
var cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blog');
var userRouter = require('./routes/user');
var spaceRouter = require('./routes/space');

var app = express();

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });

// view engine setup.
// app.set('views engine', 'ejs');
// app.set('views', path.join(__dirname, 'view'));
// app.engine('html',require('ejs').__express);
// app.use(express.static(path.join(__dirname,'static')));


const ENV = process.env.NODE_ENV
// if(ENV !== 'production'){
//   //开发环境
//   app.use(logger('dev'));
// }else {
//   //线上环境
//   const logFileName = path.join(__dirname,'logs','access.log')
//   const writeFileName = fs.createWriteStream(logFileName,{
//     flags:'a'
//   })
//   app.use(logger('combined',{
//     stream:writeFileName
//   }));
// }

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis');
const sessionStore = new RedisStore({
  client:redisClient
})
app.use(session({
  // resave: false, //添加 resave 选项
  // saveUninitialized: true, //添加 saveUninitialized 选项
  secret:'WJiol_8776#',
  cookie:{
    path:'/',
    httpOnly:true,
    maxAge:24*60*60*1000
  }
  // store:sessionStore
}))




// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user',userRouter);
app.use('/api/space',spaceRouter);

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
  res.status(err.status );
  res.render('error');
});

module.exports = app;
