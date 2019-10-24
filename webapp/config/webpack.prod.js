const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
console.log('webpack')
const devWebpackConfig = merge(baseWebpackConfig.clientConfig, {
  mode: 'production', // 开发环境
})
module.exports = devWebpackConfig