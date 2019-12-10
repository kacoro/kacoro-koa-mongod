import mongoose from '../module/mongoose'
// const mongoose = require('mongoose')

const Schema = mongoose.Schema
var NewsSchema = new Schema({
    title: {type: String,required:[true ,'请输入标题'] }, //标题 
    keywords: {type: String}, //关键字 
    description : { type: String}, //描述 
    cate_id:{type: Schema.Types.ObjectId,required: true }, //分类id
    cate_name : { type:String}, //分类名称
    content:{type: String,required:[true ,'请输入内容']}, //内容
    note:{type: String},    //概述
    cover:{type: String},   //封面
    sort:{type:Number,default:0},
    addTime: { type:Date, default:Date.now },
    updateTime: { type:Date, default:Date.now },
    status:{type:String,default:''},
    userId:Schema.Types.ObjectId //用户id 记录是谁创建的
})
export default mongoose.model('News',NewsSchema);
