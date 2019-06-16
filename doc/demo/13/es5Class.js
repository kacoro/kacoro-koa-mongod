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