const router = require('koa-router')()
DB = require('../module/db')

router.get('/', async (ctx) => {
  let result = await DB.find('news',{},{limit:4});
  let title = "首页"
  await ctx.render('default/index',{title,list:result})
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
