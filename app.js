const Koa = require('koa'),
views = require('koa-views'),
json = require('koa-json'),
onerror = require('koa-onerror'),
bodyparser = require('koa-bodyparser'),
logger = require('koa-logger'),
router = require('koa-router')(),
render = require('koa-art-template'),
path = require('path'),
index = require('./routes/index'),
admin = require('./routes/admin'),
api = require('./routes/api'),
artFilter = require('./module/artFilter')


const app = new Koa()
//art-template render
new artFilter();

render(app,{
    root:path.join(__dirname,'views'), //视图的位置
    extname:'.html', //后缀名
    extension: 'pug',
    debug:process.env.NODE_ENV !== 'production' //是否开启调试模式
})



// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/static'))

// app.use(views(__dirname + '/views', {
//   extension: 'pug'
// }))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  //设置全局信息
  //获取当前路由
  console.log(ctx.request.url)
  
  var reg = /\?([^\?]*)$/;
  var currentNav = ctx.request.url.replace(reg, "");
  console.log("currentNav",currentNav)
  ctx.state.currentNav= currentNav
  ctx.state.siteTitle= 'kacoro'
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// routes
router.use(index)
router.use(admin)
router.use(api)
app.use(router.routes()).use(router.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
