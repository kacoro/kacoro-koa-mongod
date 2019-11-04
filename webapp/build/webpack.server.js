const webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require( "optimize-css-assets-webpack-plugin" )
const serverWebpackConfig = merge(baseWebpackConfig.serverConfig, {
  mode: 'production', // 生产环境
  optimization:{
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        cache: true,
        uglifyOptions:{
          warnings: false,
          parse: {},
          compress: {},
          mangle: true, // Note `mangle.properties` is `false` by default.
          output: null,
          toplevel: false,
          nameCache: null,
          ie8: false,
          keep_fnames: false
        }

      }),
      
      new OptimizeCssAssetsPlugin()
    ]
  }
})
const plugins = [
  // 删除文件 保留新文件
  
  new webpack.DefinePlugin({
   
      __SERVER__: true,
      __CLIENT__: false
  }),
]
serverWebpackConfig.plugins =plugins;


module.exports = serverWebpackConfig