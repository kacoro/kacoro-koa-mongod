const webpack = require('webpack');
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
    contentBase: path.resolve(__dirname, '../dist/client'), // 配置开发服务运行时的文件根目录
    host: 'localhost', // 服务器监听的主机地址 localhost || 127.0.0.1
    compress: true, // 服务器是否启动gzip等压缩
    port: 5200, // 监听的端口号
    open: true, // 自动打开浏览器
    historyApiFallback: true, // 不跳转
    proxy: {
      "/api": {// '/api':匹配项
        target: 'http://127.0.0.1:5300',// 接口的域名
　　　　 // secure: false,// 如果是https接口，需要配置这个参数
        changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
// 　　　　　 pathRewrite: {// 如果接口本身没有/api需要通过pathRewrite来重写了地址
// 　　　　   "^api": "api"
//         }
      },
      "/static": {// '/api':匹配项
        target: 'http://127.0.0.1:5300',// 接口的域名
　　　　 // secure: false,// 如果是https接口，需要配置这个参数
        changeOrigin: true,// 如果接口跨域，需要进行这个参数配置
        　 pathRewrite: {// 如果接口本身没有/api需要通过pathRewrite来重写了地址
          // "^/static":""
        }
      }
    }
    // inline: true // 实时刷新
  }
})
const plugins = [
  // 删除文件 保留新文件
  new webpack.DefinePlugin({
      __SERVER__: false,
      __CLIENT__: true
  }),
]
devWebpackConfig.plugins = devWebpackConfig.plugins.concat(plugins);
module.exports = devWebpackConfig