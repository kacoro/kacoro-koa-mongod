#02学koa准备工作，es6常见语法
1、let、const

```
if(true){
    let a = 123;//与var类似，是块级作用域
}
console.log(a); //ReferenceError: a is not defined
```


```
const PI = 3.14159; //常量

PI = 3;    //TypeError: Assignment to constant variable.
```

2、模版字符串 ``

```
var name = "张三";

var age = "20";

console.log(name+'的年龄是：'+age);

console.log(`${name}的年龄是：${age}`)
```

2、属性、方法的简写
```
var name = "张三";
var app = {
    name:name,
    run:function(){
        console.log(name+'在跑步');
    }
}
console.log(app.name)
app.run()
```

```
var name = "张三";
var app = { 
    name, //属性的简写
    run(){//方法的简写
        console.log(`${name}在跑步`);
    }   
}

console.log(app.name)
app.run()
```

3、箭头函数

```
setTimeout(function(){
    console.log('执行1')
},1000)
```

```
setTimeout(()=>{ //this指向上下文
    console.log('执行2')
},1000)
```

4、回调函数

```
// 回调函数外部获取异步方法的数据
// console.log(getData()) //name is not defined

function getData(callback){
    //ajax
    setTimeout(() => {
        var name = "张三";
        callback(name);
    }, 1000);
    
}

getData(function(data){
    console.log(data);
}) //name is not defined

```

5、Promise

```
/*
/* Promise 来处理异步
resolve 成功的回调
reject 失败的回调
*/
var p = new Promise(function(resolve,reject ){//  
    setTimeout(() => {
        var name = "张三";
        if(Math.random()<0.5){
            resolve(name)
        }else{
            reject('失败')
        }
    }, 1000);
})
p.then((data)=>{
    console.log(data)
}).catch(function (err) {
    console.log(err);
})
```

```
// 另一种写法
function getData(resolve,reject){
    //ajax
    setTimeout(() => {
        var name = "张三";
        if(Math.random()<0.5){
            resolve(name)
        }else{
            reject('失败')
        }
    }, 1000);
    
}

var p = new Promise(getData);
p.then((data)=>{
    console.log(data)
}).catch(function (err) {
    console.log(err);
})
```


