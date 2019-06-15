# 06 Koa2.x  ejs模板引擎使用 以及ejs配置全局数据

1、安装koa-views、ejs
```
yarn add koa-views ejs

```

2、引入koa-views配置中间件
```
const views = require("koa-views");
app.use((views('views',{
    //map:{html:'ejs'} //Error: ENOENT: no such file or directory, stat 'E:\project\kacoro\koa-mongod\views\index.html' 模版后缀名为html
    extension:'ejs'  //模版后缀名为ejs
    })))
```

3、在koa中使用ejs：
``` 
 router.get('/add',async(ctx)=>{
     let title = "hello koa2"
     await ctx.render('index',{title})
 })
```

4、引入模版
```
<% include public/header.ejs%>
```

5、Ejs绑定数据
<%=h%>

6、Ejs绑定html数据
<%-h%>
```
//app.js
//匹配到news路由以后继续向下匹配路由
router.get('/news',async(ctx)=>{
    console.log("执行顺序3")
    // ctx.body="新闻";
    let arr = ['1111','222','3333']
    let content = '<h2>这是一段html</h2>'
    await ctx.render('news',{title:"新闻",list:arr,content})
})

//new.ejs
<%-content%>
```

7、Ejs模版判断语句
```
<h2>条件判断</h2>
    <%if(num>24){%>
        大于24
    <%}else{%>
        小于24
    <%}%>
```

8、公共信息模块
需要再每一个路由render里面都渲染一个模块
公共数据放在state，在模版的任何地方都可以使用应该放在中间件里面
// 匹配路由之前打印日期
app.use(async(ctx,next)=>{ //可以匹配任何路由
    ctx.state.siteTitle= 'kacoro'
    await next(); //路由匹配完成以后继续向下匹配
   
})

