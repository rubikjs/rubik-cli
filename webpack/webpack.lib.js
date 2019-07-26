const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { config, distDir } = require('../config')

module.exports = merge.smart(common, {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    })
  ],
  output: {
    publicPath: config.publicPath,
    filename: '[name].js',
    libraryTarget: 'umd',
    path: distDir
  }
})
