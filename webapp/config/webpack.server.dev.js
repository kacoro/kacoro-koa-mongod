const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')

const serverWebpackConfig = merge(baseWebpackConfig.serverConfig, {
  mode: 'development', // 生产环境
})
module.exports = serverWebpackConfig