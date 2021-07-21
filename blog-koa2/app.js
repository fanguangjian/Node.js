const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const path = require('path')
const fs = require('fs')
const morgan = require('koa-morgan')

const index = require('./routes/index')
const users = require('./routes/users')
const user = require('./routes/user')
const blog = require('./routes/blog')

const { REDIS_CONF } = require('./conf/db')


// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})
//日志
//自定义token
morgan.token('localDate',function getDate(req) {
  let date = new Date();
  return date.toLocaleString()
})
// 自定义format，其中包含自定义的token date使用当地(北京)时间
morgan.format('joke', ':remote-addr - :remote-user [:localDate]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"');

const ENV = process.env.NODE_ENV
if (ENV !== 'production') {
  // 开发环境
  app.use(morgan('dev',{
    stream:process.stdout   //默认参数
  }));
} else {
  //线上环境
  const logFileName = path.join(__dirname,'logs','access.log')
  const writeStream = fs.createWriteStream(logFileName, {
    flags:'a'
  })
  // app.use(morgan('combined',{
  app.use(morgan('joke',{
    stream: writeStream   //写入单文件
    // stream: accessLogStream     // 按日期写入单文件
  }));
}


//session配置
app.keys = ['WJiol_8776#']
app.use(session({
  //配置cookie
  cookie:{
    path:"/",
    httpOnly:true,
    maxAge:24*60*60*1000
  },
  //配置redis
  store:redisStore({
    // all:'127.0.0.1:6379' //写死本地redis
    all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
  })
}))

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(blog.routes(), blog.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
