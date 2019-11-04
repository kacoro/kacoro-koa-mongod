

import views from 'koa-views'
import path from 'path'
import router from './routes/index';
const app = require('./app.js').default;



// 将dist文件夹设置为静态路径
app.use(require('koa-static')('./dist'))
// 将ejs设置为我们的模板引擎
app.use(views(path.resolve('./views/'), { map: { html: 'ejs' } }))

app.use(router.routes());
app.use(router.allowedMethods());


const clientRoute = require('./middlewares/clientRoute').default;
app.use(clientRoute);
 
const port = '5200';
// app.set('port', port);

app.listen(port, () => {
  console.log('listen on: http://127.0.0.1:' + port);
});

export default app;