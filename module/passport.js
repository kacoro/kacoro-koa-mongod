// passport.js
const  passport = require('koa-passport'),
       LocalStrategy = require('passport-local').Strategy,
       DB = require('./db')


// 序列化ctx.login()触发
passport.serializeUser(function(user, done) {
  console.log('serializeUser: ', user)
  done(null, user)
})
// 反序列化（请求时，session中存在"passport":{"user":"1"}触发）
passport.deserializeUser(async function(user, done) {
  console.log('deserializeUser: ', user)
//   var user = {id: 1, username: 'admin', password: '123456'}
  done(null, user)
})
// 提交数据(策略)
passport.use(new LocalStrategy({
  // usernameField: 'email',
  // passwordField: 'passwd'
}, async(username, password, done)=> {
    result = await DB.find('user',{username:username,password:password});
    console.log("result",result)
    if (!result) { return done(null, false); }
  console.log('LocalStrategy', username, password)
  done(null, result, {msg: 'this is a test'})
  // done(err, user, info)
}))

module.exports = passport