// 用户增删改查

const router = require('koa-router')(),
DB = require('../../module/db'),
md5 = require('md5')

router.prefix('/users')
router.post('/add',  async (ctx) => {
    const {password} = ctx.request.body
    var solt = new Date()
    let data = await DB.insert('user', Object.assign(ctx.request.body,{password:md5(md5(password),solt),solt,addTime:new Date()}))
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
    var solt = new Date()
    const {id,username,age,sex,status,password,nickname,newPwd} = ctx.request.body;

    if(newPwd!=''){
        var data = await DB.update('user',{_id:DB.getObjectID(id)},{
            username,age,sex,status,password:md5(md5(newPwd),solt),solt,nickname
        })
        console.log(data.result);
        ctx.body = data.result
    }else{
        var data = await DB.update('user',{_id:DB.getObjectID(id)},{
            username,age,sex,status,nickname
        })
    }
    
    // try{
    //     if(data.result.ok){
    //         ctx.redirect('/admin/users')
    //     }else{

    //     }
    // }catch(err){
    //     ctx.redirect('/admin/users/edit?id'+id)
    // }
})

router.post('/delete',  async (ctx) => {
  ctx.body = 'this is a users response!'
})


module.exports = router.routes()
