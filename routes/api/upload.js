// 用户增删改查

const router = require('koa-router')(),
DB = require('../../module/db');
const { uploadFile } = require('../../util/upload')

router.prefix('/upload')
router.post('/',  async (ctx) => {
    
})


module.exports = router.routes()
