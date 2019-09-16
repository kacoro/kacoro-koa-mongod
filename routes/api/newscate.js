// 新闻分类增删改查

const router = require('koa-router')(),
DB = require('../../module/db');
const {quillRender} = require('../../module/common')

router.prefix('/newscate')

router.post('/',  async (ctx) => {
  const {content} = ctx.request.body
  const delta= await quillRender(content)
  let data = await DB.insert('news',Object.assign(ctx.request.body,{content:delta,addTime:new Date()}))
  ctx.body = data.result
  // try{
  //     if(data.result.ok){
  //         ctx.redirect('/admin/news')
  //     }else{
  
  //     }
  // }catch(err){
  //     ctx.redirect('/admin/news/add')
  // }
})
router.post('/add',  async (ctx) => {
    const {content} = ctx.request.body
    const delta= await quillRender(content)
    let data = await DB.insert('news_cate',Object.assign(ctx.request.body,{content:delta,addTime:new Date()}))
    ctx.body = data.result
    // try{
    //     if(data.result.ok){
    //         ctx.redirect('/admin/news')
    //     }else{
    
    //     }
    // }catch(err){
    //     ctx.redirect('/admin/news/add')
    // }
})

router.post('/edit', async (ctx) => {
    // console.log(ctx.request.body)
    const {id,name,content,note,status,sort} = ctx.request.body
    const delta= await quillRender(content)
    let data = await DB.update('news_cate',{_id:DB.getObjectID(id)},{
      name,content:delta,note,status,sort
    })
    ctx.body = data.result
   
    // try{
    //     if(data.result.ok){
          
    //     }else{

    //     }
    // }catch(err){
    //     ctx.body = data.result
    // }
})

router.post('/delete',  async (ctx) => {
    const {id} = ctx.request.body;
    console.log(id)
    let data = await DB.remove('news_cate',{_id:DB.getObjectID(id)})
    // console.log(data)
    ctx.body = data.result
})


module.exports = router.routes()
