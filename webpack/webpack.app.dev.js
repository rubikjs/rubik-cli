const merge = require('webpack-merge')
const app = require('./webpack.app.js')
const custom = require('./webpack.custom.js')
const webpack = require('webpack')
const { config, mockDir, distDir } = require('../config')
const pages = require('../lib/pages')

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
    new webpack.HotModuleReplacementPlugin()
  ],
  devtool: 'inline-source-map',
  output: {
    publicPath: config.publicPath,
    filename: '[name].js',
    chunkFilename: '[name].js',
    path: distDir
  },
  devServer: {
    contentBase: [mockDir],
    watchContentBase: true,
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
