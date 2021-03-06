const path = require("path")
const webpack = require('webpack');
const HtmlwebpackPlugin = require('html-webpack-plugin');
const externalPlugins = require('webpack-node-externals')
const CleanWebpackPlugin = require("clean-webpack-plugin");       // 每次运行打包时清理过期文件
const MinCssExtractPlugin = require("mini-css-extract-plugin");   // 将css代码提取为独立文件的插件
const LoadablePlugin = require('@loadable/webpack-plugin')
var APP_PATH = path.resolve(__dirname, '../client')
console.log()
const clientConfig = {
  mode: 'production',
  entry: {
    main: APP_PATH + '/main.jsx'
  },
  output: {
    path: path.resolve(__dirname, '../dist/client'), // 打包文件的输出目录
    // chunkFilename: '[name].bundle.js',
    filename: "js/[name].[hash].js",
    chunkFilename: 'js/[name].[hash].js',
    publicPath: '/'
    // publicPath:path.resolve(__dirname,'../dist/') // js引用路径或者CDN地址
  },
  module: {
    rules: [
      { test: /\.js(x?)$/, use: "babel-loader", exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/ },
      { test: /\.ts(x?)$/, use: [{ loader: "babel-loader" }, { loader: 'ts-loader' }], exclude: /node_modules(?!\/quill-image-drop-module|quill-image-resize-module)/ },
     
      {
        test: /\.[(png)|(obj)|(json)]$/,
        loader: "file-loader"
      },
      {
        test: /\.(woff|woff2|jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[hash].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff'
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        exclude: [/node_modules/],
        use: [
          // {loader: 'style-loader'}, // 当配置MinCssExtractPlugin.loader后，此项就无需配置，原因看各自作用
          { loader: MinCssExtractPlugin.loader },  // 将处理后的CSS代码提取为独立的CSS文件
          { loader: 'css-loader', options: { modules: { localIdentName: '[local]_[hash:base64:10]' } } },   // CSS加载器，使webpack可以识别css文件
          {
            loader: 'sass-loader',
            options: {      // loader 的额外参数，配置视具体 loader 而定

              sourceMap: true, // 要安装resolve-url-loader，当此配置项启用 sourceMap 才能正确加载 Sass 里的相对路径资源，类似background: url(../image/test.png)
            }
          },
        ]
      },

      { test: /\.html$/, loader: 'html-loader' }
    ]
  },
  resolve: {
    modules: [APP_PATH, 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
    alias: {
      '@app': APP_PATH
    }
  },
  plugins: [new HtmlwebpackPlugin({ // 在build目录下自动生成index.html

    template: path.resolve(__dirname, '../views/server.html'), // 指定要打包的html路径和文件名
    filename: './views/index.html', // 指定输出路径和文件名
    // chunks: ['main'], // 页面中所需要的js

  }),
  new webpack.ProvidePlugin({
    'window.Quill': 'quill'
  }),
  new MinCssExtractPlugin({
    //为抽取出的独立的CSS文件设置配置参数
    filename: "css/[name].[hash].css"
  }),
  new LoadablePlugin()],

}
const serverConfig = { // node环境打包
  target: 'node',
  entry: { // 入口配置
    index: path.resolve(__dirname, '../server/index.js')
  },
  output: { // 出口配置
    path: path.resolve(__dirname, '../dist/server'), // 打包后的文件存放的地方
    filename: "[name].js" // 打包后输出文件的文件名与入口文件名一致
    
  },
  externals: [externalPlugins()],
  module: { // 模块：栗子 解读css，图片如何转换、压缩
    rules: [
      { test: /\.js(x?)$/, use: "babel-loader", exclude: /(node_modules|bower_components)/ },
      { test: /\.ts(x?)$/, use: [{ loader: "babel-loader" }, { loader: "ts-loader" }], exclude:/(node_modules|bower_components)/ },
      {
        test: /\.[(png)|(obj)|(json)]$/,
        loader: "file-loader"
      },
      {
        test: /\.(woff|woff2|jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: 'images/[hash].[ext]',
            limit: 5000,
            mimetype: 'application/font-woff'
          }
        }
      },

      {
        test: /\.(s?)css$/,
        exclude: /node_modules/,
        use: [
          { loader: 'isomorphic-style-loader' }, // 当配置MinCssExtractPlugin.loader后，此项就无需配置，原因看各自作用
          //  {loader: MinCssExtractPlugin.loader},  // 将处理后的CSS代码提取为独立的CSS文件
          { loader: 'css-loader', options: { modules: { localIdentName: '[local]_[hash:base64:10]' } } },   // CSS加载器，使webpack可以识别css文件
          {
            loader: 'sass-loader',
            options: {      // loader 的额外参数，配置视具体 loader 而定
              sourceMap: true, // 要安装resolve-url-loader，当此配置项启用 sourceMap 才能正确加载 Sass 里的相对路径资源，类似background: url(../image/test.png)
            }
          },
        ]
      }
    ]
  },


  resolve: {
    modules: [APP_PATH, 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
    alias: {
      '@app': APP_PATH
    }
  }
}
module.exports = { clientConfig, serverConfig };