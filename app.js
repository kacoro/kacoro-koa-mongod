var Koa = require("koa")
var Router = require("koa-router")
var app = new Koa()
var router = new Router()

//配置路由
router.get('/',async(ctx,)=>{ //ctx 上下文 context包含了 requeset 和response等信息
    ctx.body='首页'; //返回数据，原生 res.writeHead() res.end()
}).get('/news',async(ctx)=>{
    ctx.body="这是一个新闻页面";
})

//启动路由
app.use(router.routes()) // 作用
app.use(router.allowedMethods());//官方推荐使用，用在routers之后，当所有路由中间件最后调用。此时根据ctx.status设置response响应头

//中间件
app.use(async(ctx)=>{
    ctx.body = '你好 koa2.x';
})

app.listen(3001)
console.log('运行http://localhost:3001')

