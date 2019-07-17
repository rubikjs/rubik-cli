const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ip = require('ip')
const buildConfig = require('../config')
const pages = require('../lib/pages')
const { mockDir, distDir } = require('../lib/directory')
let host = buildConfig.host === '0.0.0.0' ? ip.address() : buildConfig.host

function createDevHistoryApiFallback () {
  if(!pages || !pages.length){
    return true
  }
  let reg = new RegExp('^' + buildConfig.publicPath + '(' + pages.join('|') + ')(\\/|$)')
  return {
    rewrites: [
      {
        from: reg,
        to(context) {
          return `${buildConfig.publicPath}${context.match[1]}.html`;
        }
      }
    ]
  }
}

let config = merge(common, {
  mode: 'development',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${host}:${buildConfig.port}${buildConfig.publicPath}`],
      }
    })
  ],
  devtool: 'inline-source-map',
  output: {
    publicPath: buildConfig.publicPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: distDir
  },
  devServer: {
    contentBase: [mockDir, distDir],
    hot: true,
    host: buildConfig.host,
    port: buildConfig.port,
    clientLogLevel: 'error',
    historyApiFallback: createDevHistoryApiFallback(),
    quiet: true,
    before: require(mockDir),
    publicPath: buildConfig.publicPath,
    disableHostCheck: true
  }
})

module.exports = config
