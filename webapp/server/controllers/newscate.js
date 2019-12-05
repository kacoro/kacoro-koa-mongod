import NewsCate from '../models/newscate'

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
   
    var sort = { 'sort': -1 }; //排序（按登录时间倒序） 
    var skip = (page - 1) * size; //跳过数 
    const query1 = NewsCate.find(condition)
    try{
      let result = await query1.skip(skip).limit(size).sort(sort)
     
      let total = await NewsCate.countDocuments(condition).exec();//表总记录数
    
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
export default {get};