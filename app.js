var Koa = require("koa")

var app = new Koa()

//配置路由

//中间件
app.use(async(ctx)=>{
    ctx.body = '你好 koa2.x';
})

app.listen(3001)
console.log('运行http://localhost:3001')

