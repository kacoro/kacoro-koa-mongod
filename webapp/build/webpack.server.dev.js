const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const path = require("path")
const serverWebpackConfig = merge(baseWebpackConfig.serverConfig, {
  mode: 'development', // 生产环境,
  // devServer:{
  //   contentBase: path.resolve(__dirname, '../dist/server'), // 配置开发服务运行时的文件根目录
  //   host: 'localhost', // 服务器监听的主机地址 localhost || 127.0.0.1
  //   compress: true, // 服务器是否启动gzip等压缩
  //   port: 5300, // 监听的端口号
  //   open: true, // 自动打开浏览器
  //   historyApiFallback: true, // 不跳转
  //   // inline: true // 实时刷新
  // }
})
module.exports = serverWebpackConfig