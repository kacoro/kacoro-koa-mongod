const router = require('koa-router')()
DB = require('../module/db'),
passport = require('koa-passport')

router.get('/', async (ctx) => {
  let totle = await DB.count('news');//表总记录数
        //koa-bodyparser解析前端参数
        let reqParam= ctx.query;
        let page = Number(reqParam.page) || 1;//当前第几页
        let size = Number(reqParam.size) || 10;//每页显示的记录条数
        //显示符合前端分页请求的列表查询
        let options = { "limit": size,"skip": (page-1)*size};
        let result = await DB.find('news',{},options);
        //是否还有更多
        let hasMore=totle-(page-1)*size>size?true:false;
        let num = Math.ceil(totle/size)
      
    await ctx.render('default/index',{list:result,page,size,hasMore,totle,hasMore,num})
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
router.get('/logout',passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/'
}),async (ctx) => {
  ctx.logout()
  
})
router.post('/login',passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/login'
}), async (ctx)=> {
  return passport.authenticate('local',
    function(err, user, info, status) {
      // ctx.body = {user, err, info, status}
      return ctx.login(user)
    })(ctx)
})

module.exports = router.routes()
