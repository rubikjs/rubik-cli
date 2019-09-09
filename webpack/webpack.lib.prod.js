const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const lib = require('./webpack.lib.js')
const custom = require('./webpack.custom.js')
const { customPkg, srcDir } = require('../config')
module.exports = merge.smart(lib, {
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
        }
      }),
      new webpack.BannerPlugin(`${customPkg.name} v${customPkg.version}`),
      new OptimizeCssAssetsPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new FriendlyErrorsWebpackPlugin({
      onErrors: function (severity, errors) {
        if (severity !== 'error') {
          return
        }
        errors.map(v => {
          console.log(v.message)
        })
      }
    })
  ]
}, custom)
