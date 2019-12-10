// 用户增删改查

const router = require('koa-router')(),
DB = require('../../module/db');

router.prefix('/news')
router.post('/add',  async (ctx) => {
    const {content,sort} = ctx.request.body
    let data = await DB.insert('news',Object.assign(ctx.request.body,{content,sort:parseInt(sort),addTime:new Date()}))
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
    const {id,title,content,note,sort,keywords,description,status,cate_id,cate_name,thumbnails} = ctx.request.body
   
   
    let data = await DB.update('news',{_id:DB.getObjectID(id)},{
        title,content,note,status,cate_id,keywords,description,cate_name,thumbnails,sort:parseInt(sort),updateTime:new Date()
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
    let data = await DB.remove('news',{_id:DB.getObjectID(id)})
    // console.log(data)
    ctx.body = data.result
})


module.exports = router.routes()
