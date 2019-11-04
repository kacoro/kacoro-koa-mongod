import News from '../models/news'
import bcrypt from 'bcrypt'
const config = require('../config')
// const findUserInfo = () => {
//     const _sql = 'select * from user';
//     return query(_sql, []);
// };
export const getNews = async (ctx, next) => {
  let totle = await News.countDocuments();//表总记录数
  //koa-bodyparser解析前端参数

  let reqParam = ctx.query;
  let page = Number(reqParam.page) || 1;//当前第几页
  let size = Number(reqParam.size) || 10;//每页显示的记录条数

  //显示符合前端分页请求的列表查询
  var condition = {}; //条件 
  var sort = { 'createTime': -1 }; //排序（按登录时间倒序） 
  var skip = (page - 1) * size; //跳过数 
  let result = await News.find(condition).skip(skip).limit(size).sort(sort)
  
  //是否还有更多
  let hasMore = totle - (page - 1) * size > size ? true : false;
  let num = Math.ceil(totle / size)
  
  ctx.body = {
    data:{  list: result, page, size, hasMore, totle, hasMore, num },
    msg:'成功'
  }
}

export const getNewsById = async ctx => {
    console.log("ctx12313",ctx.request,ctx.query,ctx.params)
    const {id} = ctx.params
    var condition = {_id:id}; //条件 
    const data = await News.findOne(condition)
    ctx.body = {
        data,
        msg:'成功'
    }
};
