//DB库
const MongoClient = require('mongodb').MongoClient,
     ObjectID = require('mongodb').ObjectID,
     config = require('../config')

class Db {
    static getInstance(){  //单例 多次实例化，实例不共享的问题
        if(!Db.instance){
            Db.instance = new Db()
        }
        return Db.instance
    }
    constructor(){
        this.dbClient='' //属性 放DBClient
        this.connect()
    }
    connect(){ //链接数据库
        // Connection URL
        let _that = this;
        return new Promise((resolve,reject)=>{
            if(!_that.dbClient){  //解决数据库多次连接的问题
                console.log("数据库连接中...")
                const url = `mongodb://${config.dbUsername}:${encodeURIComponent(config.dbPassword)}@${config.dbhost}/${config.dbName}`;
                 // Create a new MongoClient
                const client = new MongoClient(url,{ useNewUrlParser: true });
                client.connect(err=>{
                    if(err){
                        console.log("数据库连接失败！")
                        reject(err)
                    }else{
                        console.log("数据库连接成功！")
                        const db = client.db(config.dbName);
                        _that.dbClient = db;
                        resolve(_that.dbClient)
                    }
                });
            }else{
                console.log("数据库已实例化！")
                resolve(_that.dbClient)
            }
            
        })
    }
    count(collectionName){
        return new Promise((resolve,reject)=>{
            this.connect().then((db=>{
                var result =  db.collection(collectionName).countDocuments((err,result)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(result)
                    }
                })
                
             }))
        })
    }
    find(collectionName,json,options,sortOpitons){
        return new Promise((resolve,reject)=>{
            this.connect().then((db=>{
                var result =  db.collection(collectionName).find(json,options ||{}).sort( sortOpitons||{addTime:-1}) 
                result.toArray((err,docs)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(docs)
                    }
                })
             }))
        })
    }
    insert(collectionName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then((db=>{
                 db.collection(collectionName).insertOne(json,(err,result)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(result)
                    }
                })
             }))
        })
    }
    update(collectionName,json1,json2){
        return new Promise((resolve,reject)=>{
            this.connect().then((db=>{
                 db.collection(collectionName).updateOne(json1,{
                    $set:json2
                },(err,result)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(result)
                    }
                })
             }))
        })
    }

    remove(collectionName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then((db=>{
                 db.collection(collectionName).removeOne(json,(err,result)=>{
                    if(err){
                        reject(err)
                    }else{
                        resolve(result)
                    }
                })
             }))
        })
    }

    getObjectID(id){
        return new ObjectID(id)
    }
}

module.exports = Db.getInstance()
