const path = require("path")
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const externalPlugins = require('webpack-node-externals')
const CleanWebpackPlugin = require( "clean-webpack-plugin" );       // 每次运行打包时清理过期文件
const MinCssExtractPlugin = require( "mini-css-extract-plugin" );   // 将css代码提取为独立文件的插件
const LoadablePlugin = require('@loadable/webpack-plugin')
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
            },
            {
              test: /\.(s?)css$/,
              exclude: /node_modules/,
              use: [
                // {loader: 'style-loader'}, // 当配置MinCssExtractPlugin.loader后，此项就无需配置，原因看各自作用
                 {loader: MinCssExtractPlugin.loader},  // 将处理后的CSS代码提取为独立的CSS文件
                {loader:'css-loader', options: { modules: {localIdentName: '[local]_[hash:base64:10]' }} },   // CSS加载器，使webpack可以识别css文件
                {loader: 'sass-loader',
                options: {      // loader 的额外参数，配置视具体 loader 而定
                
                  sourceMap: true, // 要安装resolve-url-loader，当此配置项启用 sourceMap 才能正确加载 Sass 里的相对路径资源，类似background: url(../image/test.png)
                 }}, 
              ]
            },
            { test: /\.html$/, loader: 'html-loader' }
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
        
        template: path.resolve(__dirname, '../views/server.html'), // 指定要打包的html路径和文件名
        filename: './views/index.html', // 指定输出路径和文件名
        // chunks: ['main'], // 页面中所需要的js
       
      }),
      new MinCssExtractPlugin( {
        //为抽取出的独立的CSS文件设置配置参数
        filename: "[name].css"
    } ),
    new LoadablePlugin()],
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
      { test: /\.js(x?)$/, use: "babel-loader", exclude: /node_modules/ },
      { test: /\.ts(x?)$/, use:[{loader:'babel-loader'},{loader:"ts-loader"}] , exclude: /node_modules/ },
      {
        test: /\.(s?)css$/,
        exclude: /node_modules/,
        use: [
          {loader: 'isomorphic-style-loader'}, // 当配置MinCssExtractPlugin.loader后，此项就无需配置，原因看各自作用
          //  {loader: MinCssExtractPlugin.loader},  // 将处理后的CSS代码提取为独立的CSS文件
          {loader:'css-loader', options: { modules: {localIdentName: '[local]_[hash:base64:10]' }} },   // CSS加载器，使webpack可以识别css文件
          {loader: 'sass-loader',
          options: {      // loader 的额外参数，配置视具体 loader 而定
          
            sourceMap: true, // 要安装resolve-url-loader，当此配置项启用 sourceMap 才能正确加载 Sass 里的相对路径资源，类似background: url(../image/test.png)
           }}, 
        ]
      }
    ]
  },
  plugins: [new LoadablePlugin()],
  resolve: {
    modules: [APP_PATH, 'node_modules'],
    extensions: ['*', '.js', '.jsx','.ts','.tsx'],
    alias:{
      '@app': APP_PATH
    }
  }
}
module.exports = {clientConfig, serverConfig};