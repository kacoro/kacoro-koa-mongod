import mongoose from '../module/mongoose'
// const mongoose = require('mongoose')

const Schema = mongoose.Schema
var BookSchema = new Schema({ username : { type: String }, //书籍
    title: {type: String}, //标题 
    subTitle: {type: String}, //副标题 
    keywords: {type: String}, //关键字 
    description : { type: String}, //描述 
    cate_id:{type: Number,default:0 }, //分类id
    cate_name : { type:Date }, //分类名称
    content:{type: String}, //内容
    note:{type: String},    //概述
    thumbnails:{type: Array}, //
    sort:{type:Number,default:0},
    addTime: { type:Date, default:Date.now },
    updateTime: { type:Date, default:Date.now },
    status:{type:Number,default:0},

})
export default mongoose.model('News',BookSchema);
