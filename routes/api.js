const router = require('koa-router')()

router.prefix('/api')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.post('/newslist', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/focus', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.post('/userlist', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

module.exports = router.routes()
