import Koa from 'koa'

import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import compress from 'koa-compress';
import convert from 'koa-convert';
import cors from 'koa2-cors';

import views from 'koa-views'
import path from 'path'
import router from './server/routes/index';

const clientRoute = require('./server/middlewares/clientRoute').default;
const app = new Koa();
app.use(convert(session(app)));
app.use(compress());
app.use(bodyParser());
app.use(cors());
app.use(json());
app.use(logger());

// 将dist文件夹设置为静态路径
app.use(require('koa-static')('./dist'))
// 将ejs设置为我们的模板引擎
app.use(views(path.resolve('./dist/views'), { map: { html: 'ejs' } }))

app.use(router.routes());
app.use(router.allowedMethods());
app.use(clientRoute);

const port = '5200';
// app.set('port', port);

app.listen(port, () => {
  console.log('listen on: http://127.0.0.1:' + port);
});