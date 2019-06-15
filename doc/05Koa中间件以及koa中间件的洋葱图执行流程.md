# 05 Koa中间件 以及koa中间件的洋葱图执行流程

中间件就是匹配路由之前或者匹配路由完成做的一系列操作。

1、执行任何代码
2、修改请求和响应对象
3、终结请求、响应循环
4、调用堆栈的下一个中间件
通过next()向下匹配

几种中间件：
1、应用中间件

如 打印日期，判断有没有权限访问后台
```
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
```
2、路由级中间件

```
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
```