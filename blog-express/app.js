var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require("fs");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var FileStreamRotator = require('file-stream-rotator');//日志分割
const session = require('express-session')
const redisStore = require('connect-redis')(session)

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user')


var app = express();

//日志
var logDirectory = __dirname + '/log'; 
// ensure log directory exists 
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
 
// create a rotating write stream 
var accessLogStream = FileStreamRotator.getStream({
    date_format: 'YYYYMMDD',//文件名称格式
    filename: logDirectory + '/%DATE%.log',
    frequency: 'daily',
    verbose: false
});
//自定义token
logger.token('localDate',function getDate(req) {
  let date = new Date();
  return date.toLocaleString()
})
// 自定义format，其中包含自定义的token date使用当地(北京)时间
logger.format('joke', ':remote-addr - :remote-user [:localDate]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');
// 使用自定义的format
// app.use(morgan('joke'));

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发环境
  app.use(logger('dev',{
    stream:process.stdout   //默认参数
  }));
} else {
  //线上环境
  const logFileName = path.join(__dirname,'logs','access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags:'a'
  })
  // app.use(logger('combined',{
  app.use(logger('joke',{
    // stream: writeStream   //写入单文件
    stream: accessLogStream     // 按日期写入单文件
  }));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

const redisClient = require('./db/redis')
const sessionStore = new redisStore({
  client: redisClient
})
app.use(session({
    resave: false, //添加 resave 选项
    saveUninitialized: true, //添加 saveUninitialized 选项
    // secret: 'Fan#$7889_',     //  注意秘钥要一致!!!!!!! const SECRET_KEY = 'WJiol_8776#'
    secret: 'WJiol_8776#',     //  注意秘钥要一致!!!!!!! const SECRET_KEY = 'WJiol_8776#'  
    cookie:{
      // path: '/',   // 默认配置
      // httpOnly: true,   //默认配置
      maxAge:24*60*60*1000 
    },
    store: sessionStore
}))

// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
