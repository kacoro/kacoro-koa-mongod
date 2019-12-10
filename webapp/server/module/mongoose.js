//DB库
const mongoose = require('mongoose');
import {database} from "../config"

const DB_URL = `mongodb://${database.username}:${encodeURIComponent(database.password)}@${database.host}/${database.name}`;
mongoose.connect(DB_URL,{useNewUrlParser: true,useUnifiedTopology: true})
mongoose.connection.on('connected', function () {  /** * 连接成功 */ 
    console.log('Mongoose connection open to ' + DB_URL);
}); 
mongoose.set('useFindAndModify', false)
mongoose.connection.on('error', function (err) { /** * 连接异常 */

    console.log('Mongoose connection error: ' + err);
}); 

mongoose.connection.on('disconnected', function () {/** * 连接断开 */

    console.log('Mongoose connection disconnected');
});

export default mongoose
