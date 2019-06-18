// 用户增删改查

const router = require('koa-router')(),
DB = require('../../module/db')

router.prefix('/users')
router.post('/add',  async (ctx) => {
    let data = await DB.insert('user',ctx.request.body)
    console.log(data.result);
    ctx.body = "添加数据"
    try{
        if(data.result.ok){
            ctx.redirect('/admin/users')
        }else{
    
        }
    }catch(err){
        ctx.redirect('/admin/users/add')
    }
})

router.post('/edit', async (ctx) => {
    console.log(ctx.request.body)
    const {id,username,age,sex,status,password,nickname} = ctx.request.body
    let data = await DB.update('user',{_id:DB.getObjectID(id)},{
        username,age,sex,status,password,nickname
    })
    console.log(data.result);
    ctx.body = "更新数据"
    try{
        if(data.result.ok){
            ctx.redirect('/admin/users')
        }else{

        }
    }catch(err){
        ctx.redirect('/admin/users/edit?id'+id)
    }
})

router.post('/delete',  async (ctx) => {
  ctx.body = 'this is a users response!'
})


module.exports = router.routes()
