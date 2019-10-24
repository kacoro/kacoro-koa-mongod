//DB库
const mongoose = require('mongoose')
config = require('../../config')

const DB_URL = `mongodb://${config.dbUsername}:${encodeURIComponent(config.dbPassword)}@${config.dbhost}/${config.dbName}`;
mongoose.connect(DB_URL,{useNewUrlParser: true,useUnifiedTopology: true})
mongoose.connection.on('connected', function () {  /** * 连接成功 */ 
    console.log('Mongoose connection open to ' + DB_URL);
}); 

mongoose.connection.on('error', function (err) { /** * 连接异常 */

    console.log('Mongoose connection error: ' + err);
}); 

mongoose.connection.on('disconnected', function () {/** * 连接断开 */

    console.log('Mongoose connection disconnected');
});

module.exports = mongoose
