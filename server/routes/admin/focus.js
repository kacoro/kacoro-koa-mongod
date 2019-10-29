// 用户增删改查

const router = require('koa-router')()

router.prefix('/focus')
router.get('/',  async (ctx) => {
  await ctx.render('.dmin/focus/index')
})
router.get('/add', async (ctx) => {
  await ctx.render('admin/focus/add')
})

router.get('/edit', async (ctx) => {
  await ctx.render('admin/focus/edit')
})

router.get('/delete',  async (ctx) => {
  ctx.body = 'this is a users response!'
})


module.exports = router.routes()
