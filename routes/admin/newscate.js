// 用户增删改查

const router = require('koa-router')()

router.prefix('/newscate')
router.get('/',  async (ctx) => {
  await ctx.render('admin/newscate/index')
})
router.get('/add', async (ctx) => {
  await ctx.render('admin/newscate/add')
})

router.get('/edit', async (ctx) => {
  await ctx.render('admin/newscate/edit')
})

router.get('/delete',  async (ctx) => {
  ctx.body = 'this is a users response!'
})


module.exports = router.routes()
