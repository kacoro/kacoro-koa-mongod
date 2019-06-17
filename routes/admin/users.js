// 用户增删改查

const router = require('koa-router')()

router.prefix('/users')
router.get('/',  async (ctx) => {
  await ctx.render('admin/users/index')
})
router.get('/add', async (ctx) => {
  await ctx.render('admin/users/add')
})

router.get('/edit', async (ctx) => {
  await ctx.render('admin/users/edit')
})

router.get('/delete',  async (ctx) => {
  ctx.body = 'this is a users response!'
})


module.exports = router.routes()
