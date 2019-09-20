const router = require('koa-router')()
const users = require('./admin/users')
const news = require('./admin/news')
const newscate = require('./admin/newscate')
const comments = require('./admin/comments')
const focus = require('./admin/focus')
//配置admin的子路由
router.prefix('/admin')

router.get('*', async(ctx, next) => {
  console.log("ctx.isAuthenticated",ctx.isAuthenticated())
  if(ctx.isAuthenticated()) {
    await next()
  } else {
    ctx.redirect('/login')
  //  ctx.status = 401
  //  ctx.body = {
  //    msg: '没有权限访问'
  //  }
 }
})
router.get('/', async (ctx)=> {
  await ctx.render('admin/index')
})

router.use(users)
router.use(newscate)
router.use(news)
router.use(focus)
router.use(comments)
module.exports = router.routes()
