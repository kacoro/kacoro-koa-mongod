import News from '../models/news'


// const findUserInfo = () => {
//     const _sql = 'select * from user';
//     return query(_sql, []);
// };
export const getNews = async (ctx, next) => {
  console.log('getnews')
  var condition = { status: true }; //条件 
  if (ctx.state.user && ctx.state.user.status == 10000) {
    condition = {} //管理员不需要过滤
  }

  //koa-bodyparser解析前端参数
  let query = ctx.query;
  const { } = ctx.query
  let page = Number(query.page) || 1;//当前第几页
  let size = Number(query.size) || 10;//每页显示的记录条数
  let catename = query.catename || '';

  //显示符合前端分页请求的列表查询
  if (catename) {
    condition = Object.assign(condition, { cate_name: catename })
  }

  var sort = { 'addTime': -1 }; //排序（按登录时间倒序） 
  var skip = (page - 1) * size; //跳过数 
  const query1 = News.find(condition)
  try {
    let result = await query1.skip(skip).limit(size).sort(sort)
    let total = await News.countDocuments(condition).exec();//表总记录数

    //是否还有更多
    let hasMore = total - (page - 1) * size > size ? true : false;
    let num = Math.ceil(total / size)

    ctx.body = {
      data: result,
      pagination: { page, size, hasMore, total, num } ,
      msg: '成功'
    }
  } catch (err) {
    ctx.body = { msg: "服务器发生错误", err };
  }
}

export const getNewsById = async ctx => {
  const { id } = ctx.params
  var condition = { status: true }; //条件 
  if (ctx.state.user && ctx.state.user.status == 10000) {
    condition = {} //管理员不需要过滤
  }
  var sort = { 'addTime': -1 }; //排序（按登录时间倒序） 
  try {
    const data = await News.findOne(Object.assign({}, condition, { _id: id }))
    const prev = await News.findOne(condition, '_id title').where('addTime').gt(data.addTime).sort( { 'addTime': 1 })
    const next = await News.findOne(condition, '_id title').where('addTime').lt(data.addTime).sort(sort)
    ctx.body = {
      data: { data, prev, next },
      msg: '成功'
    }
  } catch (err) {
    ctx.body = { msg: "服务器发生错误", err };
  }
};

export const putNewsById = async ctx => {

  const { id } = ctx.params
  console.log(id)
  const { addTime, _id, updateTime, ...other } = ctx.request.body
  if (ctx.state.user && ctx.state.user.status == 10000) { //管理员才能修改
    const condition = { ...other, updateTime: new Date() } //管理员不需要过滤
    try {
      const data = await News.findByIdAndUpdate(id, condition)
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
      let news = new News(ctx.request.body)
      await news.save()
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
    let news = await News.remove({ _id: id })
    ctx.body = { msg: "删除成功！" };
  } catch (error) {
    ctx.status = 500
    ctx.statusText = error.name
  }
};

export default {
  post: post,
  remove: remove
}