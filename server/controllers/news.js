
const User = require('../models/user')
const list = async (ctx, next) => {
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
  await ctx.render('admin/users/index', { title, list: result, page, size, hasMore, totle, hasMore, num })
}

module.exports = {
    list: list,
}