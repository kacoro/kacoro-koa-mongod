# 09Koa2 art-template高性能模板引擎的使用


```
yarn add art-template koa-art-template

const render = require('koa-art-template')

render(app,{
    root:path.join(__dirname,'views'), //试图的位置
    extname:'.html', //后缀名
    debug:process.env.NODE_ENV !== 'production' //是否开启调试模式
})

router.get('/news',async(ctx)=>{
    // ctx.body="新闻";
    let arr = ['1111','222','3333']
    let content = '<h2>这是一段html</h2>'
    let num = 14
    await ctx.render('news',{title:"新闻",list:arr,content,num})
})

//写一个中间件配置公共信息
app.use(async (ctx,next)=>{ //可以匹配任何路由
    console.log(new Date())
    await next(); //路由匹配完成以后继续向下匹配
})
```

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title><%=title%>-<%=siteTitle%></title>
</head>
<body>
       
  <% include('public/header.html')%>
  <h2>循环</h2>
    <ul>
    <%for(var i = 0;i<list.length;i++){%>
        <li><%=i%> <%=list[i]%></li>
    <%}%>
        
    </ul>
    <h2>绑定一个html模块</h2>
    <%-content%>
    <h2>条件判断</h2>
    <%if(num>24){%>
        大于24
    <%}else{%>
        小于24
    <%}%>
     
    {{include 'public/header.html'}}   
    <h2>循环</h2>  
    {{each list}}  
    <li>{{$index}} {{$value}}</li>
    
    {{/each}}
    <h2>条件判断</h2>
    {{if num>24}} 大于24 {{else }} 小于24 {{/if}}
    <h2>绑定一个html模块</h2>
     {{@ content }}
</body>
</html>
```