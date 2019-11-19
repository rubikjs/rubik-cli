const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const { config, distDir } = require('../config')

module.exports = merge.smart(common, {
  output: {
    publicPath: config.publicPath,
    filename: '[name].js',
    libraryTarget: 'umd',
    path: distDir
  }
})
