# 12 MongoDB Compass Community 可视化工具操作Mongodb数据库、实现增删改查

官方MongoDB的可视化工具。

1、不足，无法导出数据库。

1)、通过compass可以创建索引indexes来提高查询速度。



```
# explain()查询执行时间
db.tablename.find().explain("executionStats")
```
2、可以使用Navicat Premium进行管理。

3、centos7安装MongoDB 4.06
https://repo.mongodb.org/yum/redhat/7/mongodb-org/4.0/x86_64/RPMS/mongodb-org-server-4.0.6-1.el7.x86_64.rpm

参考：
https://www.cnblogs.com/flying1819/articles/9035408.html

```
# 1.配置MongoDB的yum源
vim /etc/yum.repos.d/mongodb-org-4.06.repo

#添加以下内容：
[mongodb-org-4.0]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/$releasever/mongodb-org/4.0/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.0.asc
#这里可以修改 gpgcheck=0, 省去gpg验证

yum makecache 

2.安装MongoDB
yum -y install mongodb-org

查看mongo安装位置 :
whereis mongod

查看修改配置文件 ：
vim /etc/mongod.conf

3.启动MongoDB 

启动mongodb ：
systemctl start mongod.service

停止mongodb ：
systemctl stop mongod.service

查到mongodb的状态：
systemctl status mongod.service

5.启动Mongo shell

mongo 
查看数据库：
show dbs

6.设置mongodb远程访问：
编辑mongod.conf注释bindIp,并重启mongodb.(这句配置代表只能本机使用，所以需注释)
vim /etc/mongod.conf
重启mongodb使修改生效：
systemctl restart mongod.service

7.创建超级管理员
 db.createUser({user:"root",pwd:"youpassword",roles:[{role:"readWriteAnyDatabase",db:"admin"}]})
 db.updateUser( "root",{roles:[{ role : "root", db : "admin"  }]});

8、centos7系列关闭防火墙但是端口依然无法访问
systemctl start firewalld
firewall-cmd --zone=public --add-port=27017/tcp --permanent
重新加载配置文件：firewall-cmd --reload

 vi /etc/mongod.conf
bingIp中的127.0.0.1为0.0.0.0,
#security:的注释去掉
authorization: enabled #注意authorization前面要有两个空格

#创建一个新项目
mongo

use kacoro

#在kacoro用户中新建kacoro用户
db.createUser({ user: "kacoro", pwd: "youPassword", roles: [{ role: "dbOwner", db: "kacoro" }] })

#删除用户
db.dropUser("test");

#验证权限

#查看进程
ps -ef | grep mongo
 kill 19829

#重启失败
rm /tmp/mongodb-27017.sock
```

