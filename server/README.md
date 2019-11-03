koa2 mongdb art-template的完成一个企业or个人网站,当前版本：v2.0.0

demo:http://kacoro.com/
## 环境依赖
* nginx
* nodejs v10.15.x
* yarn/npm/cnpm
* pm2

# 日志
作为一个博客已经基本完成了，下一个阶段。使用react重构。koa2需要把逻辑层从路由分离出Controller。引入redis等。并以企业站方向进行。接口采用restfull重新设计。

## 后台管理计划
1. 用户管理 (初步完成)
2. 新闻管理(初步完成)
3. 新闻分类管理(初步完成)
4. 权限管理 (初步完成)
5. 产品管理
6. 友情链接
7. 轮播图管理
8. 菜单管理
9. 系统设置

## 前台
1. 首页  (初步完成)
2. 新闻详情页(初步完成)
3. 登录页(初步完成)
4. 产品页

## 准备
手动添加 config.js 配置mongoDB数据库
```
module.exports = {
	dbhost: "localhost:27017",
	dbName:'xxx',
	dbUsername:'xxx',
	dbPassword:'xxx',
	tokenSecret:'yourtokensecret',
	saltRounds:10
}
```

## 安装yarn

[安装yarn](https://www.yarnpkg.com/zh-Hant/docs/install#windows-stable)

安装完成后用命令行执行

## 开发
```
yarn install 
yarn dev
```

## 发布 
```
npm install -g pm2
yarn install 
yarn prd
```

## 指定端口号和项目名称发布 

```
PORT=3000 yarn prd --name kacoro
```
删除项目

pm2 delete kacoro

pm2 restart kacoro


# 缓存清除

```
# 由于nginx采用了缓存所以上线后需要清除缓存
cd /data/nginx/cache/
rm -rf *
cd /data/
```