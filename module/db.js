//DB库
const MongoClient = require('mongodb').MongoClient,
     assert = require('assert'),
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

    find(collectionName,json){
        return new Promise((resolve,reject)=>{
            this.connect().then((db=>{
                var result =  db.collection(collectionName).find(json)
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
}

module.exports = Db.getInstance()
