const router = require('koa-router')()
const users = require('./admin/users')
const news = require('./admin/news')
const newscate = require('./admin/newscate')
const focus = require('./admin/focus')
//配置admin的子路由
router.prefix('/admin')

router.get('/', function (ctx, next) {
  ctx.body = '后台管理'
})

router.use(users)
router.use(newscate)
router.use(news)
router.use(focus)
module.exports = router.routes()
