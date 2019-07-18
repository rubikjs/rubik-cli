const merge = require('webpack-merge')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const common = require('./webpack.common.js')
const { config, distDir } = require('../config')
const isCDN = process.env.CDN_ENV === 'true'
const isNoHash = process.env.NO_HASH_ENV === 'true'

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: 'vendor',
          name: "vendor",
          chunks: "all"
        }
      }
    },
    runtimeChunk: {
      name: 'runtime'
    },
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
      new OptimizeCssAssetsPlugin()
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new MiniCssExtractPlugin({
      filename: `${config.staticName}/[name].css`,
      chunkFilename: isNoHash ? `${config.staticName}/[name].css` : `${config.staticName}/[name].[chunkhash:${config.hashLength}].css`
    })
  ],
  output: {
    publicPath: isCDN ? config.cdnPublicPath : config.publicPath,
    filename: isNoHash ? `${config.staticName}/[name].js` : `${config.staticName}/[name].[contenthash:${config.hashLength}].js`,
    chunkFilename: isNoHash ? `${config.staticName}/[name].bundle.js` : `${config.staticName}/[name].[chunkhash:${config.hashLength}].bundle.js`,
    path: distDir
  }
})
