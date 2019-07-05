const merge = require('webpack-merge')
const webpack = require('webpack')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const common = require('./webpack.common.js')
const buildConfig = require('./build')
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
    new CleanWebpackPlugin(buildConfig.outputName, {
      root: process.cwd()
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"production"'
      }
    }),
    new MiniCssExtractPlugin({
      filename: `${buildConfig.staticName}/[name].css`,
      chunkFilename: isNoHash ? `${buildConfig.staticName}/[name].css` : `${buildConfig.staticName}/[name].[chunkhash:${buildConfig.hashLength}].css`
    })
  ],
  output: {
    publicPath: isCDN ? buildConfig.cdnPublicPath : buildConfig.publicPath,
    filename: isNoHash ? `${buildConfig.staticName}/[name].js` : `${buildConfig.staticName}/[name].[contenthash:${buildConfig.hashLength}].js`,
    chunkFilename: isNoHash ? `${buildConfig.staticName}/[name].bundle.js` : `${buildConfig.staticName}/[name].[chunkhash:${buildConfig.hashLength}].bundle.js`,
    path: path.resolve(__dirname, `../${buildConfig.outputName}`)
  }
})
