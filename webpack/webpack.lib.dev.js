const path = require('path')
const merge = require('webpack-merge')
const lib = require('./webpack.lib.js')
const custom = require('./webpack.custom.js')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { config, mockDir, rootDir } = require('../config')

module.exports = merge.smart(lib, {
  mode: 'development',
  entry: {
    demo: path.resolve(rootDir, './demo/index.js')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(rootDir, './demo/index.html')
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: [mockDir],
    watchContentBase: true,
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
