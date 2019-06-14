var Koa = require("koa")
var router = require("koa-router")()//引用并实例化
var app = new Koa()

//配置路由
router.get('/',async(ctx)=>{ //ctx 上下文 context包含了 requeset 和response等信息
    ctx.body='首页'; //返回数据，原生 res.writeHead() res.end()
}).get('/news',async(ctx)=>{
    ctx.body="这是一个新闻页面";
})


/* 获取get传值
koa2中get传值通过reques接收，但是接受的方法有两种：query和querystring
query：返回的是格式化好的参数对象。
querystring：返回的是请求字符串
*/

router.get('/news/content',async(ctx)=>{
    console.log(ctx.query)  // http://localhost:3001/news/content?id=123&name=%E5%BC%A0%E4%B8%89 [Object: null prototype] { id: '123', name: '张三' }
    console.log(ctx.querystring) //id=123&name=%E5%BC%A0%E4%B8%89
    ctx.body="新闻详情";
    console.log(ctx.url)
    //ctx里面的request里面获得
    console.log(ctx.request)
    console.log(ctx.request.url)
    console.log(ctx.request.query)
})

router.get('/news/:id',async(ctx)=>{
    console.log(ctx.params) //http://localhost:3001/news/123 { id: '123' }
    ctx.body="新闻详情";
})

//启动路由
app.use(router.routes()) // 作用
app.use(router.allowedMethods());//官方推荐使用，用在routers之后，当所有路由中间件最后调用。此时根据ctx.status设置response响应头

//中间件
app.use(async(ctx)=>{
    ctx.body = 'page no found!';
})

app.listen(3001)
console.log('运行http://localhost:3001')

