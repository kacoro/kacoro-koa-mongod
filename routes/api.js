const router = require('koa-router')()
const users = require('./api/users')
const news = require('./api/news')
const newscate = require('./api/newscate')
const focus = require('./api/focus')

//配置admin的子路由
router.prefix('/api')

router.post('/', async (ctx)=> {
  ctx.body="访问了api"
})
router.post('/login', async (ctx)=> {
  ctx.body="登录成功"
})
router.use(users)
router.use(news)
router.use(newscate)
router.use(focus)
module.exports = router.routes()
