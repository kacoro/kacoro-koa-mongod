const Koa = require("koa"),
     router = require("koa-router")(),//引用并实例化
     views = require("koa-views"),
     bodyparser = require("koa-bodyparser"),
     static = require("koa-static"),
     render = require('koa-art-template'),
     path = require('path'),
     session = require('koa-session'),
     MongoClient = require('mongodb').MongoClient,
     assert = require('assert'),
     config = require('./config')
const app = new Koa()
render(app,{
    root:path.join(__dirname,'views'), //视图的位置
    extname:'.html', //后缀名
    debug:process.env.NODE_ENV !== 'production' //是否开启调试模式
})

// app.use(static('static')) //静态资源托管
app.keys = ['newest secret key', 'older secret key']; //Error: .keys required for signed cookies
app.use(static(__dirname+'/static')) //静态资源托管
app.use(bodyparser())
app.use(session({
    keys:'koa:sess',
    signed: true,
    maxAge:86400000, //cookies过期时间
    rolling:false, //每次访问都强制设置cookie，这将重置cookie过期时间 默认false
    renew:true //是否当快过期时重新设置
},app))


//配置路由
router.get('/',async(ctx)=>{ //ctx 上下文 context包含了 requeset 和response等信息
    let userinfo = '张三'
    ctx.cookies.set('userinfo',Buffer.from(userinfo).toString('base64'),{  //无法直接存中文 TypeError: argument value is invalid
        maxAge:3600*1000,
        httpOnly:false //fasle客户端可以访问，
    })
   
    let title = "你好ejs"
    await ctx.render('index',{title})
})


/* 获取get传值
koa2中get传值通过reques接收，但是接受的方法有两种：query和querystring
query：返回的是格式化好的参数对象。
querystring：返回的是请求字符串
*/

//匹配到路由以后继续向下匹配路由


//匹配到news路由以后继续向下匹配路由
router.get('/news',async(ctx)=>{
    var userinfo = ctx.cookies.get('userinfo');
    if(userinfo){
        userinfo = Buffer.from(ctx.cookies.get('userinfo'),'base64').toString();
    }
    
    // ctx.body="新闻";
    let arr = ['1111','222','3333']
    let content = '<h2>这是一段html</h2>'
    let num = 14
    let username = ctx.session.username
    await ctx.render('news',{title:"新闻",list:arr,content,num,userinfo,
        username
    })
})

router.get('/login',async(ctx)=>{
    //接受数据
    await ctx.render('login',{title:"登录"})
})

//接受post
router.post('/login',async(ctx)=>{
    // ctx.body=ctx.request.body //获取表单数据
    //    console.log(ctx.session.username)
    ctx.session.username = "李四"
    ctx.body="登录成功"
})

// 匹配路由之前打印日期
app.use(async(ctx,next)=>{ //可以匹配任何路由
    console.log("执行顺序1：",new Date()) 
    await next(); //路由匹配完成以后继续向下匹配
    console.log('执行顺序5')
})


// 匹配路由之前打印日期
app.use(async(ctx,next)=>{ //可以匹配任何路由
    ctx.state.siteTitle= 'kacoro'
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
app.use(async (ctx,next)=>{ //可以匹配任何路由
    console.log(new Date())
    await next(); //路由匹配完成以后继续向下匹配
})
//写一个中间件配置公共信息
app.use(async (ctx,next)=>{ //可以匹配任何路由
    console.log(new Date())
    await next(); //路由匹配完成以后继续向下匹配
})
app.use(async(ctx,next)=>{ //可以匹配任何路由
    console.log('执行顺序2')
    next()
    console.log('执行顺序4')
    if(ctx.status==404){
        ctx.body = "这是一个 404 页面"
    }else{  
        console.log(ctx.url)
    }
    // await next(); //路由匹配完成以后继续向下匹配
})

// Connection URL
const url = `mongodb://${config.dbUsername}:${encodeURIComponent(config.dbPassword)}@${config.dbhost}/${config.dbName}`;

// Database Name
const dbName = config.dbName;

// Create a new MongoClient
const client = new MongoClient(url,{ useNewUrlParser: true });

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);

  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});

app.listen(3001)
console.log('运行http://localhost:3001')

