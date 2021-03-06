const path = require('path')
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const lib = require('./webpack.lib.js')
const custom = require('./webpack.custom.js')
const { customPkg, srcDir } = require('../config')
module.exports = merge(lib, {
  mode: 'production',
  entry: {
    index: path.resolve(srcDir, './index.js')
  },
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: false,
        terserOptions: {
          output: {
            comments: false
          }
        },
        extractComments: false
      }),
      new webpack.BannerPlugin(`${customPkg.name} v${customPkg.version}`),
      new OptimizeCssAssetsPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    })
  ]
}, custom)
