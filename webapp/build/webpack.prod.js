const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')

const devWebpackConfig = merge(baseWebpackConfig.clientConfig, {
  mode: 'production', // 生产环境
  optimization :{
    // minimizer: [
    //   new UglifyJsPlugin({
    //     uglifyOptions: {
    //       compress: false
    //     }
    //   })
    // ],
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
                    name: 'vendor',
                    priority: 10,
                    enforce: true
        },
        commons: {
          chunks: 'initial',
          minChunks: 2, maxInitialRequests: 5,
          minSize: 0
        }
      }
    },
    runtimeChunk: true
  }
})
module.exports = devWebpackConfig