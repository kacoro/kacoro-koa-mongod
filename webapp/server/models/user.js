import mongoose from '../module/mongoose'
// const mongoose = require('mongoose')

const Schema = mongoose.Schema
var UserSchema = new Schema({ 
    username : { type: String }, //用户账号 
    age: {type: Number}, //年龄 
    logindate : { type: Date}, //最近登录时间 
    status:{type: Number,default:0 }, //状态：0：游客，1：普通用户，2：vip用户，3：svip用户，10000超级管理员
    password:{type: String},
    nickname:{type: String},
    website:{type: String},
    email:{type: String},
    avatar:{type: String},
    createTime : { type:Date, default:Date.now }
})
export default mongoose.model('User',UserSchema);
