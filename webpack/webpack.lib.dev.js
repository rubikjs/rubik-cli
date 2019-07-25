const path = require('path')
const merge = require('webpack-merge')
const lib = require('./webpack.lib.js')
const custom = require('./webpack.custom.js')
const webpack = require('webpack')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ip = require('ip')
const { config, mockDir, distDir, rootDir } = require('../config')
const host = config.host === '0.0.0.0' ? ip.address() : config.host


module.exports = merge.smart(lib, {
  mode: 'development',
  entry: {
    'demo': path.resolve(rootDir, './demo/index.js')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, "./demo/index.html")
    }),
    new webpack.HotModuleReplacementPlugin(),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${host}:${config.port}`]
      },
      onErrors: function (severity, errors) {
        if (severity !== 'error') {
          return
        }
        errors.map(v => {
          console.log(v.message)
        })
        // process.exit(1)
      }
    })
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: [mockDir, distDir],
    hot: true,
    host: config.host,
    port: config.port,
    clientLogLevel: 'error',
    quiet: true,
    before: require(mockDir),
    publicPath: config.publicPath,
    disableHostCheck: true,
    overlay: {
      warnings: false,
      errors: true
    }
  }
}, custom)
