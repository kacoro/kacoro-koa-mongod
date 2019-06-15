var Koa = require("koa")
var router = require("koa-router")()//引用并实例化
var app = new Koa()

//配置路由
router.get('/',async(ctx)=>{ //ctx 上下文 context包含了 requeset 和response等信息
    ctx.body='首页'; //返回数据，原生 res.writeHead() res.end()
})


/* 获取get传值
koa2中get传值通过reques接收，但是接受的方法有两种：query和querystring
query：返回的是格式化好的参数对象。
querystring：返回的是请求字符串
*/

//匹配到路由以后继续向下匹配路由
router.get('/news',async(ctx,next)=>{
    console.log(ctx.query)
    console.log(ctx.params) //http://localhost:3001/news/123 { id: '123' }
    // ctx.body="新闻详情455";
    await next()
})

//匹配到news路由以后继续向下匹配路由
router.get('/news',async(ctx)=>{
    ctx.body="新闻详情2";
})

// 匹配路由之前打印日期
app.use(async(ctx,next)=>{ //可以匹配任何路由
    console.log(new Date())
    await next(); //路由匹配完成以后继续向下匹配
})
//启动路由
app.use(router.routes()) // 作用
app.use(router.allowedMethods());//官方推荐使用，用在routers之后，当所有路由中间件最后调用。此时根据ctx.status设置response响应头


// 应用级中间间
//中间件 如果不写next()，不会下下运行
// app.use(async(ctx)=>{ //可以匹配任何路由
//     ctx.body = '这是一个中间件';
// })

// 匹配路由之前打印日期
app.use(async(ctx,next)=>{ //可以匹配任何路由
    console.log(new Date())
    await next(); //路由匹配完成以后继续向下匹配
})


app.listen(3001)
console.log('运行http://localhost:3001')

