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


