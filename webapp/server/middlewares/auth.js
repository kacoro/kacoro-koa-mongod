
const config = require('../config')
import User from '../models/user'
const jwt = require('jsonwebtoken'); //token 认证
//自定义的jwt验证
const auth = async (ctx,next)=>{
    if(ctx.header.authorization){
      const raw = String(ctx.header.authorization).split(' ').pop()
      console.log(raw)
      if(raw){
        try{
          const {_id} = jwt.verify(raw,config.secretKey);
          const user = await User.findById(_id)
          ctx.user = user._doc
        }catch(err){ // 有可能会失效
          console.log(err)
        }
       
      }
     
    }
    await next()
}
export default auth;