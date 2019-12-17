import Comment from '../models/comment'
import bcrypt from 'bcrypt'
const config = require('../config')
// const findUserInfo = () => {
//     const _sql = 'select * from user';
//     return query(_sql, []);
// };
export const getComment = async (ctx, next) => {
 
  //koa-bodyparser解析前端参数

  let query = ctx.query;
  const {} = ctx.query
  let page = Number(query.page) || 1;//当前第几页
  let size = Number(query.size) || 10;//每页显示的记录条数
  let catename = query.catename || '';
  var condition = {status:'on'}; //条件 
  //显示符合前端分页请求的列表查询
  if(catename){
     console.log(catename)
     condition = Object.assign(condition,{cate_name:catename})
  }
 
  var sort = { 'addTime': -1 }; //排序（按登录时间倒序） 
  var skip = (page - 1) * size; //跳过数 
  const query1 = Comment.find(condition)
  let result = await query1.skip(skip).limit(size).sort(sort)
  let total = await Comment.countDocuments(condition).exec();//表总记录数

  //是否还有更多
  let hasMore = total - (page - 1) * size > size ? true : false;
  let num = Math.ceil(total / size)
  
  ctx.body = {
    data:{  list: result,pagination:{page, size, hasMore, total,  num }},
    msg:'成功'
  }
}
export const getCommentById = async ctx => {
  const {id} = ctx.params
  var condition = {_id:id}; //条件 
  console.log(id)
  const data = await Comment.findOne(condition)

  ctx.body = {
      data:{data},
      msg:'成功'
  }
};

export const addCommentByArticleId = async ctx => {
  console.log("user",ctx.state.user)
  const {id} = ctx.params
  const user = ctx.state.user 
  const {content,replyId} = ctx.request.body
  const {_id,nickname,website,email,avatar} = ctx.state.user._doc
  console.log("website",website)
  var condition = {status:'on',articleId:ctx.params.id,content,replyId,userId:user._id,nickname,website,email,avatar}; //条件 
  let comment=  new Comment(condition)
  var res = await comment.save()
  let {userId,...data} = res._doc
  ctx.body = {
      data:data,
      msg:'成功'
  }
};

export const getCommentByArticleId = async ctx => {
    const {id} = ctx.params
    var condition = {status:'on',articleId:id}; //条件 
   
    const data = await Comment.find(condition)
  
    ctx.body = {
        data:{data},
        msg:'成功'
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
  const query1 = Comment.find(condition)
  try{
    let result = await query1.skip(skip).limit(size).sort(sort)
   
    let total = await Comment.countDocuments(condition).exec();//表总记录数
  
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
    const data = await Comment.findOne(Object.assign({}, condition, { _id: id }))
   
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
      const data = await Comment.findByIdAndUpdate(id, condition)
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
  
  const { addTime, _id, updateTime, title, content, ...other } = ctx.request.body
  if (content == "" || title == "") {
    ctx.status = 422
  } else {
    try {
      let comment = new Comment(ctx.request.body)
      await comment.save()
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
     await Comment.remove({ _id: id })
    ctx.body = { msg: "删除成功！" };
  } catch (error) {
    ctx.status = 500
    ctx.statusText = error.name
  }
};
export default {get,post,put,getById,remove};