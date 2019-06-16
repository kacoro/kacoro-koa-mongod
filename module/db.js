//DB库
const MongoClient = require('mongodb').MongoClient,
     assert = require('assert'),
     config = require('../config')

class Db {
    constructor(){
        this.connect()
    }
    connect(){ //链接数据库
        // Connection URL
        console.log("数据库连接中...")
        return new Promise((resolve,reject)=>{
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
                    resolve(db)
                }
            });
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

console.log("MyDb")
var MyDb = new Db()
console.time('start')
MyDb.find('user',{}).then((data)=>{
    // console.log("查询",data)
    console.timeEnd('start')
})
console.time('start2')
MyDb.find('user',{}).then((data)=>{
    // console.log("查询",data)
    console.timeEnd('start2')
})