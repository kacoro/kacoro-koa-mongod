const webpack = require('webpack');
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base')
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const clientConfig = merge(baseWebpackConfig.clientConfig, {

  mode: 'production', // 生产环境
  optimization: {
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
    runtimeChunk: true,
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        parallel: true,
        cache: true,
        uglifyOptions:{
          warnings: false,
          parse: {},
          compress: {
            drop_console: true,
            drop_debugger:true,
          },
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
       __SERVER__: false,
       __CLIENT__: true
   }),
]
if (process.env.npm_config_report) {
  clientConfig.plugins.push( new BundleAnalyzerPlugin())
}
clientConfig.plugins = clientConfig.plugins.concat(plugins);

module.exports = clientConfig