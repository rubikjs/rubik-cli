const merge = require('webpack-merge')
const app = require('./webpack.app.js')
const custom = require('./webpack.custom.js')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const ip = require('ip')
const { config, mockDir, distDir } = require('../config')
const pages = require('../lib/pages')
const host = config.host === '0.0.0.0' ? ip.address() : config.host

function createDevHistoryApiFallback () {
  if (!pages || !pages.length) {
    return true
  }
  const reg = new RegExp('^' + config.publicPath + '(' + pages.join('|') + ')(\\/|$)')
  return {
    rewrites: [
      {
        from: reg,
        to (context) {
          return `${config.publicPath}${context.match[1]}.html`
        }
      }
    ]
  }
}

module.exports = merge.smart(app, {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: [`Your application is running here: http://${host}:${config.port}${config.publicPath}`]
      },
      onErrors: function (severity, errors) {
        if (severity !== 'error') {
          return
        }
        errors.map(v => {
          console.log(v.message)
        })
      }
    })
  ],
  devtool: 'inline-source-map',
  output: {
    publicPath: config.publicPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: distDir
  },
  devServer: {
    contentBase: [mockDir, distDir],
    hot: true,
    host: config.host,
    port: config.port,
    clientLogLevel: 'error',
    historyApiFallback: createDevHistoryApiFallback(),
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