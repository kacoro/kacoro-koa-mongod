import mongoose from '../module/mongoose'
// const mongoose = require('mongoose')

const Schema = mongoose.Schema
var NewsCateSchema = new Schema({
    name: {type: String}, //名称 
    keywords: {type: String}, //关键字 
    description : { type: String}, //描述 
    content:{type: String}, //内容
    note:{type: String},    //概述
    cover:{type: String},
    sort:{type:Number,default:255},
    addTime: { type:Date, default:Date.now },
    updateTime: { type:Date, default:Date.now },
    pid:{type: String}, //父级id
    status:{type:String,default:''}
})
export default mongoose.model('news_cate',NewsCateSchema);
