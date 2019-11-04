const webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const OptimizeCssAssetsWebpackPlugin = require( "optimize-css-assets-webpack-plugin" )
const serverWebpackConfig = merge(baseWebpackConfig.serverConfig, {
  mode: 'production', // 生产环境
  
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