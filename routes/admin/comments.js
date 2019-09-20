// 用户增删改查

const router = require('koa-router')(),
DB = require('../../module/db')

router.prefix('/comments')
router.get('/',  async (ctx) => {
 
  let title = "首页"
  var filters = {}
        //koa-bodyparser解析前端参数
        let reqParam= ctx.query;
        let page = Number(reqParam.page) || 1;//当前第几页
        let size = Number(reqParam.size) || 10;//每页显示的记录条数
        //显示符合前端分页请求的列表查询
     
        let options = { "limit": size,"skip": (page-1)*size};
        let totle = await DB.count('comments',filters);//表总记录数
        let result = await DB.find('comments',filters,options);
        //是否还有更多
        let hasMore=totle-(page-1)*size>size?true:false;
        let num = Math.ceil(totle/size)
        
    await ctx.render('admin/comments/index',{title,list:result,page,size,hasMore,totle,hasMore,num})
})
router.get('/add', async (ctx) => {
  let reqParam= ctx.query;
  var cate_name = reqParam.cate_name || '';
  let cate = await DB.find('comments',{},{},{sort:1});
  await ctx.render('admin/comments/add',{currentNav:'/admin/comments',cate,cate_name})
})

router.get('/edit', async (ctx) => {
  //获取用户信息
  let id = ctx.query.id;
  let data = await DB.find('comments',{_id:DB.getObjectID(id)});
  console.log(data)
  await ctx.render('admin/comments/edit',{list:data[0],currentNav:'/admin/comments'})
})

router.get('/delete',  async (ctx) => {
  let id = ctx.query.id;
    let data = await DB.remove('news',{_id:DB.getObjectID(id)})
    if(data){
        ctx.redirect('/admin/comments')
    }else{
        ctx.redirect('/admin/comments')
    }
})


module.exports = router.routes()
