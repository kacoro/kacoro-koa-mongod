const path = require("path")
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const externalPlugins = require('webpack-node-externals')
var APP_PATH = path.resolve(__dirname, '../src')
const clientConfig  = {
    mode:'production',
    entry:{
        main:path.resolve(__dirname, '../src/main.jsx')
    },
    output:{
        path:path.resolve(__dirname,'../dist'),
        chunkFilename: '[name].bundle.js',
        filename:"[name].bundle.js",
        // publicPath:'/dist/'
    },
    module:{
        rules: [
            { test: /\.js(x?)$/, use: "babel-loader", exclude: /node_modules/ },
            { test: /\.ts(x?)$/, use:[{loader:'babel-loader'},{loader:"ts-loader"}] , exclude: /node_modules/ },
            {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            },
            {
              test: /\.[(png)|(obj)|(json)]$/,
              loader: "file-loader"
            },
            {
              test: /\.(woff|woff2|jpg|png)$/,
              use: {
                  loader: 'url-loader',
                  options: {
                      name: 'imanges/[hash].[ext]',
                      limit: 5000,
                      mimetype: 'application/font-woff'
                  }
              }
            }
          ]
    },
    resolve: {
        modules: [APP_PATH, 'node_modules'],
        extensions: ['*', '.js', '.jsx','.ts','.tsx'],
        alias:{
          '@app': APP_PATH
        }
      },
    plugins:[new HtmlwebpackPlugin({ // 在build目录下自动生成index.html
        title: '', // 指定其title
        template: 'ejs-compiled-loader!' + path.resolve(__dirname, '../src/index.html'), // 指定要打包的html路径和文件名
        filename: 'index.html', // 指定输出路径和文件名
        // chunks: ['main'], // 页面中所需要的js
        inject:'body',
        minify: {
          collapseWhitespace: true // 压缩选项
        },
        root:false
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
}
const serverConfig = { // node环境打包
  target: 'node',
  entry: { // 入口配置
    index: path.resolve(__dirname, '../index.js')
  },
  output: { // 出口配置
    path: path.resolve(__dirname, '../dist'), // 打包后的文件存放的地方
    filename: "[name].js" // 打包后输出文件的文件名与入口文件名一致
  },
  externals: [externalPlugins()],
  module: { // 模块：栗子 解读css，图片如何转换、压缩
    rules:[
      { test: /\.js(x?)$/, use: "babel-loader", exclude: /node_modules/ }
    ]
  },
  resolve: {
    modules: [APP_PATH, 'node_modules'],
    extensions: ['*', '.js', '.jsx','.ts','.tsx'],
    alias:{
      '@app': APP_PATH
    }
  }
}
module.exports = {clientConfig, serverConfig};