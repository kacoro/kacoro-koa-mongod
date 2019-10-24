// 用户增删改查

const router = require('koa-router')(),
DB = require('../../module/db'),
config = require('../../config.js'),
bcrypt = require('bcrypt')

router.prefix('/users')
router.post('/add',  async (ctx) => {
    const {password} = ctx.request.body
    let data = await DB.insert('user', Object.assign(ctx.request.body,{password:bcrypt.hashSync(password,config.saltRounds)}))
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
            username,age,sex,status,password:bcrypt.hashSync(newPwd,config.saltRounds),solt,nickname
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
