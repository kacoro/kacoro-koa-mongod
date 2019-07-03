# 12 MongoDB Compass Community 可视化工具操作Mongodb数据库、实现增删改查

```
//es5中类和静态方法
function Person(name,age){
    //构造函数里面的属性和方法
    this.name = name;
    this.age = age;
    this.run = function(){
        console.log(`${this.name}--${this.age}`)
    }
}
 //原型链上的属性和方法
Person.prototype.sex = "男"
Person.prototype.work = function(){
    console.log(`${this.name}--${this.age}--${this.sex}`);
}

//静态方法
Person.setName = function(){
    console.log("静态方法");
}

var p = new Person('zhangsan','20');
p.run();
p.work();
Person.setName(); //执行静态方法

//继承 原型链加对象冒充组合实现
/*
对象冒充继承：没法继承原型链上的属性和方法
原型链，可以继承构造函数里面以及原型链上面的属性和方法，实例化子类没法给父类传参
*/
function Web(name,age){
    Person.call(this,name,age); //对象冒充实现继承
}

Web.prototype = new Person();  // 原型链继承
var w = new Web('李四',20)  
w.run()     //需要用对象冒充继承，否则无法传参。
w.work()    //需要用原型链，否则无法调用父类原型链上的方法  Web.prototype = new Person(); 


```
# ES6的类和继承与静态方法
```
//es6中类和静态方法
class Person{
    constructor(name,age){ /* 类的构造函数，实例化的时候执行，new的时候执行 */
        this._name = name;
        this._age = age;
    }
    getNanme(){
        console.log(this._name)
    }
    getInfo(){
        console.log(`姓名：${this._name} 年龄：${this._age}`)
    }
    run(){//实例方法
        console.log(this._name)
    }
    setName(name){
        this._name = name;
    }
    static work(){ //es6静态方法
        console.log(`es6静态方法`)
    }
}

var p = new Person('张三',20)

p.getNanme();
p.setName('李四');
p.getNanme();
p.run();  //调用实例方法
//es6的继承 extends
class Web extends Person{ //继承了Person extends super(name,age)
    constructor(name,age,sex){
        super(name,age) // 实例化子类的时候把子类的数据传给父类
        this.sex = sex;
    }
    print(){
        console.log(this.sex)
    }
}

var w = new Web('张三',30,'男')
w.getInfo()

//ES6的静态方法
Person.instance = '这是一个静态方法的属性'
Person.work()

console.log(Person.instance);



```



# ES6单例模式
```
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
```