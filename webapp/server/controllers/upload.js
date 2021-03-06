// 用户增删改查

const router = require('koa-router')(),
fs = require('fs'),
path = require('path'),
uuidv1 = require('uuid/v1'),
dayjs = require('dayjs');
import dirExists  from '../util/dir'
 const single = async ctx => {
  // 上传单个文件
  const datePath = dayjs().format('YYYY-MM-DD/HH/mm/ss/') 
  var resPath = path.resolve('./static/upload/'+datePath) 
  const mkdirStatus = await dirExists(resPath);
 
  const file = ctx.request.files.file; // 获取上传文件
  // 创建可读流
  const reader = fs.createReadStream(file.path);
  let name = uuidv1() //or file.name
  let filePath = resPath + `/${name}`;
  // 创建可写流
  const upStream = fs.createWriteStream(filePath);
  // 可读流通过管道写入可写流
  reader.pipe(upStream);
  return ctx.body = {
      msg:'上传成功',
      url:'/upload/'+datePath + name,
      name :file.name,
      type:file.type
  };   
};

const multiple = async ctx => {
  // 上传多个文件
  const files = ctx.request.files.file; // 获取上传文件
  for (let file of files) {
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    // 获取上传文件扩展名
    let filePath = path.join(__dirname, '../../public/upload/') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
  }
 return ctx.body = "上传成功！";
}

export default {
    single:single,
    multiple:multiple
  }
