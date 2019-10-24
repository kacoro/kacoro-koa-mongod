// 用户增删改查

const router = require('koa-router')(),
DB = require('../../module/db')

router.prefix('/newscate')
router.get('/',  async (ctx) => {

  let title = "首页"
  let totle = await DB.count('newscate');//表总记录数
        //koa-bodyparser解析前端参数
        let reqParam= ctx.query;
        let page = Number(reqParam.page) || 1;//当前第几页
        let size = Number(reqParam.size) || 10;//每页显示的记录条数
        //显示符合前端分页请求的列表查询
        let options = { "limit": size,"skip": (page-1)*size};
        let result = await DB.find('news_cate',{},options,{sort:1});
        console.log(result)
        //是否还有更多
        let hasMore=totle-(page-1)*size>size?true:false;
        let num = Math.ceil(totle/size)
      
    await ctx.render('admin/newscate/index',{title,list:result,page,size,hasMore,totle,hasMore,num})
})
router.get('/add', async (ctx) => {

  await ctx.render('admin/newscate/add',{currentNav:'/admin/newscate'})
})

router.get('/edit', async (ctx) => {
  //获取用户信息
  let id = ctx.query.id;
  let data = await DB.find('news_cate',{_id:DB.getObjectID(id)});
  await ctx.render('admin/newscate/edit',{list:data[0],currentNav:'/admin/newscate'})
})

router.get('/delete',  async (ctx) => {
  let id = ctx.query.id;
    let data = await DB.remove('news_cate',{_id:DB.getObjectID(id)})
    if(data){
        ctx.redirect('/admin/newscate')
    }else{
        ctx.redirect('/admin/newscate')
    }
})


module.exports = router.routes()
