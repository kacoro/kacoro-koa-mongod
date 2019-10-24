// passport.js
const  passport = require('koa-passport'),
       LocalStrategy = require('passport-local').Strategy,
       DB = require('./db'),
       config = require('../config.js'),
       bcrypt = require('bcrypt')

// 序列化ctx.login()触发
passport.serializeUser(function(user, done) {
  // console.log('serializeUser: ', user)
  done(null, user)
})
// 反序列化（请求时，session中存在"passport":{"user":"1"}触发）
passport.deserializeUser(async function(user, done) {
//   console.log('deserializeUser: ', user)
//   var user = {id: 1, username: 'admin', password: '123456'}
  done(null, user)
})
// 提交数据(策略)
passport.use(new LocalStrategy({
  // usernameField: 'email',
  // passwordField: 'passwd'
}, async(username, password, done)=> {
    var result = await DB.findOne('user',{username:username});
    console.log("result",result)
    if (!result) { return done(null, false); }
    if(bcrypt.compareSync(password,result.password)){
        done(null, result, {msg: 'this is a test'})
        // var  result = await DB.find('user',{username:username});
    }else{
        return done(null, false);
    }
//   console.log('LocalStrategy', username, password)
 
  // done(err, user, info)
}))

module.exports = passport