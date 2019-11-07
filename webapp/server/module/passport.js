// passport.js
const  passport = require('koa-passport'),
       LocalStrategy = require('passport-local').Strategy,
       
       config = require('../config.js'),
       bcrypt = require('bcrypt')
import User from '../models/user'
// 序列化ctx.login()触发
passport.serializeUser(function(user, done) {
  // console.log('serializeUser: ', user)
  done(null, user)
})
// 反序列化（请求时，session中存在"passport":{"user":"1"}触发）
passport.deserializeUser(async function(user, done) {
  // console.log('deserializeUser: ', user)
//   var user = {id: 1, username: 'admin', password: '123456'}
  return done(null, user)
})
// 提交数据(策略)
passport.use(new LocalStrategy({
  // usernameField: 'email',
  // passwordField: 'passwd'
}, async(username, password, done)=> {
    var result = await User.findOne({username:username});
    if (result!= null) {
      if(bcrypt.compareSync(password,result.password)){
            done(null, result,'登录成功',200)
            // var  result = await DB.find('user',{username:username});
        }else{
          return done(null, false, '密码错误',401)
        }
      }else{
        return done(null, false, '未知用户',401)
      }
    }
))

module.exports = passport