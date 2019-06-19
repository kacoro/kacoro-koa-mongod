// 用户增删改查

const router = require('koa-router')(),
DB = require('../../module/db')

router.prefix('/news')
router.post('/add',  async (ctx) => {
    let data = await DB.insert('news',Object.assign(ctx.request.body,{addTime:new Date()}))
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
    const {id,title,content,note,status} = ctx.request.body
    let data = await DB.update('news',{_id:DB.getObjectID(id)},{
        title,content,note,status
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
  ctx.body = 'this is a news response!'
})


module.exports = router.routes()
