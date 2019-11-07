import Koa from 'koa';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';
import session from 'koa-session';
import compress from 'koa-compress';
import convert from 'koa-convert';
import cors from 'koa2-cors';

const app = new Koa();
app.keys = ['newest secret key', 'older secret key'];
// app.use(convert(session(app)));

app.use(session({
  key:"SESSIONID",
  // cookie: {secure: false, maxAge:86400000},
  //store: RedisStore(redisConf.session)
}, app))
app.use(compress());
app.use(bodyParser());
app.use(cors());
app.use(json());
app.use(logger());
app.use(require('koa-static')('./static'))
require('module-alias/register')

import passport from './module/passport'

//passport
app.use(passport.initialize())
app.use(passport.session())

export default app;
