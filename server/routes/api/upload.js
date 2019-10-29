// 用户增删改查

const router = require('koa-router')(),
DB = require('../../module/db'),
fs = require('fs'),
path = require('path'),
dayjs = require('dayjs');
const { uploadFile } = require('../../util/upload')
const { getStat,mkdir,dirExists } = require('../../util/dir')
router.prefix('/upload')
router.post('/',  async (ctx) => {
        // 上传单个文件
        const datePath = dayjs().format('YYYY-MM-DD/HH/') 
        var resPath = path.join(__dirname, '../../public/upload/'+datePath) 
        await dirExists(resPath);
        const file = ctx.request.files.file; // 获取上传文件
        // 创建可读流
        const reader = fs.createReadStream(file.path);
        let filePath = resPath + `/${file.name}`;
        // 创建可写流
        const upStream = fs.createWriteStream(filePath);
        // 可读流通过管道写入可写流
        reader.pipe(upStream);
        return ctx.body = {
            msg:'上传成功',
            filePath:'/upload/'+datePath + file.name,
            fileName :file.name
        };    
})


router.post('/multiple', async (ctx, next) => {
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
  });
module.exports = router.routes()
