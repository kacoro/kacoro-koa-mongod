import mongoose from '../module/mongoose'
// const mongoose = require('mongoose')

const Schema = mongoose.Schema
var CommentSchema = new Schema({ 
    content:{type: String,default:''}, //内容
    replyId:{type: String,default:''}, //回复Id
    articleId:{type: String}, //文章id
    
    note:{type: String,default:''},    //概述
    
    //用户信息
    userId:{type:String,default:''},
    nickname : { type: String,default:'' }, //用户账号 
    email:{type:String,default:''}, // 邮件
    website:{type:String,default:''}, //网站

    status:{type:String,default:'on'},
    addTime: { type:Date, default:Date.now },
    updateTime: { type:Date, default:Date.now }

})
export default mongoose.model('Comment',CommentSchema);
