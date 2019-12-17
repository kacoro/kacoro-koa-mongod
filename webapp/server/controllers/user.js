import User from '../models/user'
import bcrypt from 'bcrypt'
const jwt = require('jsonwebtoken'); //token 认证
const config = require('../config')
// const findUserInfo = () => {
//     const _sql = 'select * from user';
//     return query(_sql, []);
// };

export const list = async (ctx, next) => {
    let title = "首页"
  let totle = await User.countDocuments();//表总记录数
  //koa-bodyparser解析前端参数

  let reqParam = ctx.query;
  let page = Number(reqParam.page) || 1;//当前第几页
  let size = Number(reqParam.size) || 10;//每页显示的记录条数

  //显示符合前端分页请求的列表查询
  var condition = {}; //条件 
  var sort = { 'createTime': -1 }; //排序（按登录时间倒序） 
  var skip = (page - 1) * size; //跳过数 
  let result = await User.find(condition).skip(skip).limit(size).sort(sort)
  
  //是否还有更多
  let hasMore = totle - (page - 1) * size > size ? true : false;
  let num = Math.ceil(totle / size)
  
  ctx.body = { title, list: result, page, size, hasMore, totle, hasMore, num }
}

export const getUser = async ctx => {
    let data = {};

    // await findUserInfo().then(result => {
    //     data = result[0];
    // });
    data = {
        userId: 1002,
        name: 'xwb007',
        gender: '男',
        age: 24
    };
    ctx.body = data;
};

export const signIn = async ctx => {
    
    const {username,password} = ctx.request.body
    var condition = {username:username}; //条件 
    const res = await User.findOne(condition)
    try {
        if(bcrypt.compareSync(password,res.password)){
            const d = await User.findByIdAndUpdate(res._id,{logindate:new Date()})
            const {_id,password,...other} = res._doc //过滤掉id和密码
            const payload = {
                _id:_id
            };
            const token = jwt.sign(payload, config.secretKey, {
                expiresIn: 3600
            });
            
            ctx.body = {data:other,msg:"登录成功",token: 'Bearer ' + token} 
            //更新登录时间
           
        }else{
            ctx.status = 401 //表示用户没有权限（令牌、用户名、密码错误）。
            ctx.body = {msg:"用户名或密码错误"};
        }
    } catch (error) {
        // ctx.status = 500 //服务器发生错误，用户将无法判断发出的请求是否成功。
        ctx.body = {msg:"服务器发生错误",error};
    }
};

export const signUp = async ctx => {
    const {username,password} = ctx.request.body
    var condition = {username:username}; //条件 
    if(username==''|| password==''){
        ctx.status = 422 //当创建一个对象时，发生一个验证错误。
        ctx.body = {msg:"用户名密码不能为空"};
    }
    try {
        const data = await User.findOne(condition)
        if(data){
            ctx.status = 422 //当创建一个对象时，发生一个验证错误。
            ctx.body = {msg:"用户已注册"};
        }else{
            let user=  new User({username,password:bcrypt.hashSync(password,config.saltRounds)})
            var result = await user.save()
            ctx.body = {id:result.id,msg:"注册成功！"};
        }
    } catch (error) {
        ctx.status = 500
        ctx.body = {msg:"服务器发生错误"};
    }
};

export const get = async (ctx, next) => {
    var condition = {status:'on'}; //条件 
    if(ctx.state.user && ctx.state.user.status==10000 ){
        condition = {} //管理员不需要过滤
    }
    //koa-bodyparser解析前端参数
  
    let query = ctx.query;
    const {} = ctx.query
    let page = Number(query.page) || 1;//当前第几页
    let size = Number(query.size) || 10;//每页显示的记录条数
   
    var sort = { 'sort': 1}; //排序（按登录时间倒序） 
    var skip = (page - 1) * size; //跳过数 
    const query1 = User.find(condition)
    try{
      let result = await query1.skip(skip).limit(size).sort(sort)
     
      let total = await User.countDocuments(condition).exec();//表总记录数
    
      //是否还有更多
      let hasMore = total - (page - 1) * size > size ? true : false;
      let num = Math.ceil(total / size)
      
      ctx.body = {
        data:result,
        pagination:{page, size, hasMore, total,  num },
        msg:'成功'
      }
    }catch(err){
      ctx.body = {msg:"服务器发生错误",err};
    }
  }

  export const getById = async (ctx, next) => {
    const { id } = ctx.params
    var condition = { status: true }; //条件 
    if (ctx.state.user && ctx.state.user.status == 10000) {
      condition = {} //管理员不需要过滤
    }
    
    try {
      const data = await User.findOne(Object.assign({}, condition, { _id: id }))
     
      ctx.body = {
        data:data,
        msg: '成功'
      }
    } catch (err) {
      ctx.body = { msg: "服务器发生错误", err };
    }
  }

  export const put = async ctx => {
    const { id } = ctx.params
    const { addTime, _id, updateTime, ...other } = ctx.request.body
    if (ctx.state.user && ctx.state.user.status == 10000) { //管理员才能修改
      const condition = { ...other, updateTime: new Date() } //管理员不需要过滤
      try {
        const data = await User.findByIdAndUpdate(id, condition)
        ctx.body = {
          data: data,
          msg: '成功'
        }
      } catch (err) {
        ctx.body = { msg: "服务器发生错误", err };
      }
    } else {
      ctx.status = 401
      ctx.body = { msg: "无权限", err };
    }
  
  };


  export const post = async ctx => {
    
    const {username, addTime, _id, updateTime, title, content, ...other } = ctx.request.body
    if (content == "" || username == "") {
      ctx.status = 422
    } else {
      try {
        let user = new User(ctx.request.body)
        await user.save()
        ctx.body = { msg: "发布成功！" };
      } catch (error) {
        ctx.status = 500
        console.log(error)
      }
    }
  }

  export const remove = async ctx => {
    const { id } = ctx.params
    const { ids } = ctx.request.body
    try {
       await User.remove({ _id: id })
      ctx.body = { msg: "删除成功！" };
    } catch (error) {
      ctx.status = 500
      ctx.statusText = error.name
    }
  };
export default {get,post,put,getById,remove};