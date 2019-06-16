//es6单例m模式，
/* 
无论实例化多少次只构造一次，比如连接数据库
*/
class Db{
    static getInstance(){
        if(!Db.instance){
            Db.instance = new Db()
        }
        return Db.instance;
    }
    constructor(name,age){ /* 类的构造函数，实例化的时候执行，new的时候执行 */
        
        console.log(`实例化会出发构造函数`)
        this.connect()
    }
    connect(){
        console.log(`连接数据库`)
    }
    find(){
        console.log(`查询数据库`)
    }
}

// var myDb = new Db();

var myDb1 = Db.getInstance();
myDb1.find()
var myDb2 = Db.getInstance();
myDb2.find()