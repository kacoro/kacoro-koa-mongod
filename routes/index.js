const router = require('koa-router')()
DB = require('../module/db'),
passport = require('koa-passport')

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

router.post('/login',passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/login'
}), async (ctx)=> {
  return passport.authenticate('local',
    function(err, user, info, status) {
      ctx.body = {user, err, info, status}
      return ctx.login(user)
    })(ctx)
})

module.exports = router.routes()
