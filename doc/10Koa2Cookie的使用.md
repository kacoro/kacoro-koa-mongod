# 10 Koa2 Cookie的使用

1、保存用户信息
2、浏览器历史记录
3、猜你喜欢的功能
4、10天免登录
5、多个页面数据传递
6、cookie实现购物车功能


1、Koa cookies的使用
ctx.cookies.set()
ctx.cookies.get()

maxAge  过期的毫秒数
expires 过期时间date
path 路径
domain 域名
secure true 只有https才可以访问
httpOnly //默认为false,是否只是服务器可以访问
overwrite

2、无法直接设置中文
```
  //ctx.cookies.set('userinfo','张三')  //无法直接设置中文 TypeError: argument value is invalid
 
```