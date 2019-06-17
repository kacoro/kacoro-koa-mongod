const router = require('koa-router')()

router.get('/', async (ctx) => {
  await ctx.render('default/index')
})
router.get('/news', async (ctx) => {
  await ctx.render('default/index')
})
router.get('/about', async (ctx) => {
  await ctx.render('default/about')
})
router.get('/login', async (ctx) => {
  await ctx.render('default/login')
})
module.exports = router.routes()
