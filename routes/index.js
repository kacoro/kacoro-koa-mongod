const router = require('koa-router')()
DB = require('../module/db'),
passport = require('koa-passport')

router.get('/', async (ctx) => {
  let totle = await DB.count('news',{status:'on',cate_name:{$nin:["私密日志","政治","技术"]}});//表总记录数
        //koa-bodyparser解析前端参数
        let reqParam= ctx.query;
        let page = Number(reqParam.page) || 1;//当前第几页
        let size = Number(reqParam.size) || 9;//每页显示的记录条数
        //显示符合前端分页请求的列表查询
        let options = { "limit": size,"skip": (page-1)*size};
        let result = await DB.find('news',{status:'on',cate_name:{$nin:["私密日志","政治","技术"]}},options);
        //是否还有更多
        let hasMore=totle-(page-1)*size>size?true:false;
        let num = Math.ceil(totle/size)
      
    await ctx.render('default/index',{list:result,page,size,hasMore,totle,hasMore,num})
})


router.get('/news', async (ctx) => {
 
        //koa-bodyparser解析前端参数
        let filters = {status:'on'}
        let reqParam= ctx.query;
        let page = Number(reqParam.page) || 1;//当前第几页
        let size = Number(reqParam.size) || 9;//每页显示的记录条数
        var cate_name = reqParam.cate_name || '';
        //显示符合前端分页请求的列表查询
        let options = { "limit": size,"skip": (page-1)*size};
        if(cate_name){
          filters = Object.assign(filters,{"cate_name":cate_name})
        }
        let totle = await DB.count('news',filters);//表总记录数
        let result = await DB.find('news',filters,options);
        //是否还有更多
        let hasMore=totle-(page-1)*size>size?true:false;
        let num = Math.ceil(totle/size)
    await ctx.render('default/news/index',{list:result,page,size,hasMore,totle,hasMore,num,cate_name})
 
})

router.get('/news/detail', async (ctx) => {
  let filters = {status:'on'}
  const {id} = ctx.query
  
  var options = Object.assign(filters,{_id:DB.getObjectID(id)})
  var result = await DB.findOne('news',options);
  console.log(result.thumbnail)
  if(result.thumbnails)
  result.thumbnails = JSON.parse(result.thumbnails)
  let prevOps = Object.assign(filters,{"cate_name":result.cate_name,addTime:{ '$gt': result.addTime}})
  let nextOps = Object.assign(filters,{"cate_name":result.cate_name,addTime:{ '$lt': result.addTime }})
  // var prev = await DB.findOne('news',{cate_name:result.cate_name,status:'on',addTime:{ '$gt': result.addTime }});
  var prev = await DB.find('news',{cate_name:result.cate_name,status:'on',addTime:{ '$gt': result.addTime }},{limit:1},{addTime:1});
  var next = await DB.find('news',{cate_name:result.cate_name,status:'on',addTime:{ '$lt': result.addTime }},{limit:1},{addTime:-1});
  var prevId = null,
      nextId = null
  if(prev[0]){
    prevId = prev[0]._id
  }
  if(next[0]){
    nextId = next[0]._id
  }
  await ctx.render('default/news/detail',{...result,prevId,nextId})

})

router.get('/about', async (ctx) => {
  await ctx.render('default/about')
})

router.get('/login', async (ctx) => {
  await ctx.render('default/login')
})
router.get('/logout',async (ctx) => {
  ctx.logout()
  ctx.redirect('/')
  // if (!ctx.isAuthenticated()) {
  //   ctx.body = {
  //     code:0
  //   }
  // } else {
  //   ctx.body = {
  //     code:-1
  //   }
  // }
})
router.post('/login',passport.authenticate('local', {
  successRedirect: '/admin',
  failureRedirect: '/login'
}), async (ctx)=> {
  return passport.authenticate('local',
    function(err, user, info, status) {
      console.log("user",user)
      // ctx.body = {user, err, info, status}
      return ctx.login(user)
    })(ctx)
})

module.exports = router.routes()
