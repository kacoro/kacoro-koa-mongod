// passport.js
const  passport = require('koa-passport'),

       LocalStrategy = require('passport-local').Strategy,
       config = require('../config.js'),
       bcrypt = require('bcrypt')
import User from '../models/user'
// 序列化ctx.login()触发
// passport.serializeUser(function(user, done) {
//   console.log('serializeUser: ', user)
//   done(null, user)
// })
// // 反序列化（请求时，session中存在"passport":{"user":"1"}触发）
// passport.deserializeUser(async function(user, done) {
//   console.log('deserializeUser: ', user)
// //   var user = {id: 1, username: 'admin', password: '123456'}
//   return done(null, user)
// })
// 提交数据(策略)
// passport.use(new LocalStrategy({
//   // usernameField: 'email',
//   // passwordField: 'passwd'
// }, async(username, password, done)=> {
//     var result = await User.findOne({username:username});
//     if (result!= null) {
//       if(bcrypt.compareSync(password,result.password)){
//             done(null, result,'登录成功',200)
//             // var  result = await DB.find('user',{username:username});
//         }else{
//           return done(null, false, '密码错误',401)
//         }
//       }else{
//         return done(null, false, '未知用户',400)
//       }
//     }
// ))

//


const JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

passport.use(new JwtStrategy(opts,async (jwt_payload,done)=>{
    //jwt_payload 返回的是登录时返回的数据 即payload
    console.log('验证')
      const user=await User.findOne(jwt_payload.id);
      if(user){
          done(null,user);
      }else{
          done(null,false);
      }
  }))


export default passport