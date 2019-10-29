// 用户增删改查

const router = require('koa-router')(),
  DB = require('../../module/db'),
  {list,edit,remove} = require('../../controllers/user')

router.prefix('/users')

router.get('/',list)
router.get('/add', async (ctx) => {
  await ctx.render('admin/users/add', { currentNav: '/admin/users' })
})

router.get('/edit',edit)
router.get('/delete',remove )


module.exports = router.routes()
