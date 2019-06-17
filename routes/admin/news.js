// 用户增删改查

const router = require('koa-router')()

router.prefix('/news')
router.get('/',  async (ctx) => {
  await ctx.render('admin/news/index')
})
router.get('/add', async (ctx) => {
  await ctx.render('admin/news/add')
})

router.get('/edit', async (ctx) => {
  await ctx.render('admin/news/edit')
})

router.get('/delete',  async (ctx) => {
  ctx.body = 'this is a users response!'
})


module.exports = router.routes()
