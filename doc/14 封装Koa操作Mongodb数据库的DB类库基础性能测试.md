# 14 封装 Koa操作Mongodb数据库的DB类库基础  性能测试（1）

1. node-mogodb-native 驱动，封装一个更小、更快、更灵活的DB模块。
2. koa操作Mongodb数据库

官方文档：http://mongodb.github.io/node-mongodb-native/
使用文档：http://mongodb.github.io/node-mongodb-native/3.2/quick-start/quick-start/
```
yarn add mongodb assert

```

```
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myproject';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});
```