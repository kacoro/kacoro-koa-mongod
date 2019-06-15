# 04 Koa路由 get传值 动态路由

1、路由
一个Uri 和一个特定的http方法（GET、POST等）组成，涉及到应用如何响应客户端对某个网站节点的访问。
根据不同的URL加载不同的页面实现不同的功能。

使用koa-router路由模块来实现

```
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
```

2、get传值

```

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

```

3、动态路由

```
router.get('/news/:id',async(ctx)=>{
    console.log(ctx.params) //http://localhost:3001/news/123 { id: '123' }
    ctx.body="新闻详情";
})

router.get('/news/:cid/:id',async(ctx)=>{
    console.log(ctx.params) http://localhost:3001/news/123/123 { cid: '123', id: '123' }
    ctx.body="新闻详情";
})

```