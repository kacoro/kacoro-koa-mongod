const Koa = require('koa'),
views = require('koa-views'),
json = require('koa-json'),
onerror = require('koa-onerror'),
bodyparser = require('koa-bodyparser'),
koaBody = require('koa-body'),
logger = require('koa-logger'),
router = require('koa-router')(),
render = require('koa-art-template'),
path = require('path'),
index = require('./routes/index'),
admin = require('./routes/admin'),
api = require('./routes/api'),
passport = require('./module/passport'),
artFilter = require('./module/artFilter'),
session = require('koa-session'),
RedisStore = require('koa-redis'),
Static = require('koa-static'),
rewrite = require('koa-rewrite'),
fs = require('fs')
const app = new Koa()
app.keys = ['newkey','oldkey']
//art-template render
new artFilter();

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}))

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
  formLimit:"3mb",
  jsonLimit:"3mb",
  textLimit:"3mb",
  enableTypes:['json', 'form', 'text']
}))

app.use(session({
  cookie: {secure: false, maxAge:86400000},
  //store: RedisStore(redisConf.session)
}, app))
//passport
app.use(passport.initialize())
app.use(passport.session())

app.use(json())
app.use(logger())
app.use(Static( __dirname + '/static'))
app.use(Static( __dirname + '/public'))

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
  ctx.state.siteTitle= `Kacoro's blog`;
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

const redirect = async (ctx, next) => {
  // var stats  = await sendfile(this,'../webapp/dist/index.html')
  var htmlFile = await (new Promise(function(resolve, reject){
      fs.readFile('./webapp/dist/index.html','utf-8', (err, data) => {
        if (err){
          reject(err);
        }else{
          resolve(data);
        }
      });
  }))
  ctx.type = 'html';
  var html = fs.createReadStream('./webapp/dist/index.html');
  console.log(htmlFile)
  const keywords = '登录'
  const description = '描述'
  var seo = `<title>测试</title>
  <meta name="keywords" content="${keywords}">
  <meta name="description" content="${description}">
  `
  htmlFile = htmlFile.replace(/<title>([\S\s\t]*?)<\/title>/,seo)
  ctx.body = htmlFile

};

router.get('/webapp/*', redirect);

// app.use(rewrite(/^\/dist\/third/, '/dist/index.html'));

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
