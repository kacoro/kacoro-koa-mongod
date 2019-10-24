// 用户增删改查

const router = require('koa-router')(),
DB = require('../../module/db');
const {quillRender} = require('../../module/common')

router.prefix('/comments')
router.post('/add',  async (ctx) => {
    const {content,sort} = ctx.request.body
    // const delta= await quillRender(content)
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
    const {id,name,email,website,content,replyId,status} = ctx.request.body
   
    // const delta= await quillRender(content)
   
    let data = await DB.update('comments',{_id:DB.getObjectID(id)},{
        name,email,content,website,replyId,status,updateTime:new Date()
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
    let data = await DB.remove('comments',{_id:DB.getObjectID(id)})
    // console.log(data)
    ctx.body = data.result
})


module.exports = router.routes()
