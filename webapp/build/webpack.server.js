const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const OptimizeCssAssetsWebpackPlugin = require( "optimize-css-assets-webpack-plugin" )
const serverWebpackConfig = merge(baseWebpackConfig.serverConfig, {
  mode: 'production', // 生产环境
  
})
module.exports = serverWebpackConfig