const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const HtmlwebpackPlugin = require('html-webpack-plugin');
const path = require("path")
const devWebpackConfig = merge(baseWebpackConfig.clientConfig, {
  mode: 'development', // 开发环境
  plugins:[new HtmlwebpackPlugin({ // 在build目录下自动生成index.html
       
    template: path.resolve(__dirname, '../views/template.html'), // 指定要打包的html路径和文件名
    filename: './index.html', // 指定输出路径和文件名
    // chunks: ['main'], // 页面中所需要的js
   
  })],
  devServer:{
    contentBase: path.resolve(__dirname, '../dist'), // 配置开发服务运行时的文件根目录
    host: 'localhost', // 服务器监听的主机地址 localhost || 127.0.0.1
    compress: true, // 服务器是否启动gzip等压缩
    port: 5200, // 监听的端口号
    open: true, // 自动打开浏览器
    historyApiFallback: true, // 不跳转
    // inline: true // 实时刷新
  }
})
module.exports = devWebpackConfig