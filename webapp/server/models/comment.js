import mongoose from '../module/mongoose'
// const mongoose = require('mongoose')

const Schema = mongoose.Schema
var CommentSchema = new Schema({ username : { type: String }, //用户账号 
    title: {type: String}, //标题 
    email:{type:String}, // 邮件
    website:{type:String}, //网站
    content:{type: String}, //内容
    replyId:{type: String}, //内容
    articleId:{type: String}, //内容
    articleName:{type: String}, //内容
    note:{type: String},    //概述
    addTime: { type:Date, default:Date.now },
    updateTime: { type:Date, default:Date.now },
    status:{type:String,default:'on'},

})
export default mongoose.model('Comment',CommentSchema);
