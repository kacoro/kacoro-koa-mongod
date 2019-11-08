import News from '../models/news'
import bcrypt from 'bcrypt'

// const findUserInfo = () => {
//     const _sql = 'select * from user';
//     return query(_sql, []);
// };
export const getNews = async (ctx, next) => {
  
  var condition = {status:'on'}; //条件 
  if(ctx.user && ctx.user.status==10000 ){
      condition = {} //管理员不需要过滤
  }
   
  
  //koa-bodyparser解析前端参数

  let query = ctx.query;
  const {} = ctx.query
  let page = Number(query.page) || 1;//当前第几页
  let size = Number(query.size) || 10;//每页显示的记录条数
  let catename = query.catename || '';
  
  //显示符合前端分页请求的列表查询
  if(catename){
     console.log(catename)
     condition = Object.assign(condition,{cate_name:catename})
  }
 
  var sort = { 'addTime': -1 }; //排序（按登录时间倒序） 
  var skip = (page - 1) * size; //跳过数 
  const query1 = News.find(condition)
  let result = await query1.skip(skip).limit(size).sort(sort)
  let total = await News.countDocuments(condition).exec();//表总记录数

  //是否还有更多
  let hasMore = total - (page - 1) * size > size ? true : false;
  let num = Math.ceil(total / size)
  
  ctx.body = {
    data:{  list: result,pagination:{page, size, hasMore, total,  num }},
    msg:'成功'
  }
}

export const getNewsById = async ctx => {

    const {id} = ctx.params
    var condition = {status:'on'}; //条件 
    if(ctx.user && ctx.user.status==10000 ){
        condition = {} //管理员不需要过滤
    }
    var sort = { 'addTime': -1 }; //排序（按登录时间倒序） 
    const data = await News.findOne(Object.assign({},condition,{_id:id}))
    const prev = await News.findOne(condition, '_id title').where('addTime').gt(data.addTime)
    const next = await News.findOne(condition, '_id title').where('addTime').lt(data.addTime).sort(sort)
    ctx.body = {
        data:{data,prev,next},
        msg:'成功'
    }
};
