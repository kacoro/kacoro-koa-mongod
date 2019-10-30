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
})
module.exports = devWebpackConfig