const mongoose = require('../module/mongoose.js')
// const mongoose = require('mongoose')

const Schema = mongoose.Schema
var UserSchema = new Schema({ username : { type: String }, //用户账号 
    username: {type: String}, //密码 
    age: {type: Number}, //年龄 
    logindate : { type: Date}, //最近登录时间 
    status:{type: Number},
    password:{type: String},
    nickname:{type: String},
    createTime : { type:Date, default:Date.now }
})
module.exports = mongoose.model('User',UserSchema);
