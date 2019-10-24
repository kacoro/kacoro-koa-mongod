// 用户增删改查

const router = require('koa-router')(),
  DB = require('../../module/db'),
  User = require('../../models/user')

router.prefix('/users')

router.get('/', async (ctx) => {

  let title = "首页"
  let totle = await User.count();//表总记录数
  //koa-bodyparser解析前端参数
  console.log(ctx.query)
  console.log(ctx)
  let reqParam = ctx.query;
  let page = Number(reqParam.page) || 1;//当前第几页
  let size = Number(reqParam.size) || 10;//每页显示的记录条数

  //显示符合前端分页请求的列表查询
  let options = { "limit": size, "skip": (page - 1) * size };
  var condition = {}; //条件 
  var sort = { 'createTime': -1 }; //排序（按登录时间倒序） 
  var skipnum = (page - 1) * size; //跳过数 
  // let result = User.find(options)
  let result = await User.find(condition).skip(skipnum).limit(size).sort(sort)
  // let result = await DB.find('user',{},options);
  //是否还有更多
  let hasMore = totle - (page - 1) * size > size ? true : false;
  let num = Math.ceil(totle / size)
  await ctx.render('admin/users/index', { title, list: result, page, size, hasMore, totle, hasMore, num })
})
router.get('/add', async (ctx) => {

  await ctx.render('admin/users/add', { currentNav: '/admin/users' })
})

router.get('/edit', async (ctx) => {
  //获取用户信息
  let id = ctx.query.id;
  let data = await DB.find('user', { _id: DB.getObjectID(id) });
  console.log(data[0])
  await ctx.render('admin/users/edit', { list: data[0], currentNav: '/admin/users' })
})

router.get('/delete', async (ctx) => {
  let id = ctx.query.id;
  let data = await DB.remove('user', { _id: DB.getObjectID(id) })
  if (data) {
    ctx.redirect('/admin/users')
  } else {
    ctx.redirect('/admin/users')
  }
})


module.exports = router.routes()
