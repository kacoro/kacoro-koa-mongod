import Koa from 'koa'
import React from 'react'
import { renderToString } from 'react-dom/server'
import views from 'koa-views'
import path from 'path'
const router = require('koa-router')();
import App from './src/views/App'

const clientRoute = require('./server/middlewares/clientRoute').default;
const app = new Koa();

// 将dist文件夹设置为静态路径
app.use(require('koa-static')('./dist'))
// 将ejs设置为我们的模板引擎
app.use(views(path.resolve('./dist'), { map: { html: 'ejs' } }))

// app.use(async ctx => {
//   console.log(ctx)
//   var str = renderToString(<App></App>)
//   await ctx.render('index', {
//     root: str
//   })
// })

app.use(clientRoute);
// router.get('*',(ctx,next)=>{
//   let str = renderToString(<App></App>)
//   ctx.render('index', {
//     root: str
//   })
// });
// router.get('/*',(ctx,next)=>{
//   let str = renderToString(<App></App>)
//   ctx.render('index', {
//     root: str
//   })
// });

// app.use(router.routes());
// app.use(router.allowedMethods());

const port = '5200';
// app.set('port', port);

app.listen(port, () => {
  console.log('listen on: http://127.0.0.1:' + port);
});