const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const { config, pageDir, staticDir } = require('../config')
const pages = require('../lib/pages')
const isDevMode = process.env.NODE_ENV === 'development'
const hasStaticRoot = fs.existsSync(staticDir)
const entry = {}
const plugins = []

if (config.vendor.length) {
  entry['vendor'] = config.vendor
}

// 遍历pages目录
pages.map((v) => {
  entry[v] = path.join(pageDir, `${v}/index.js`)
  plugins.push(new HtmlWebpackPlugin({
    publicPath: true,
    chunks: ['runtime', 'vendor', v],
    filename: isDevMode ? `${v}.html` : `${config.templateName ? config.templateName + '/' : ''}${v}.html`,
    template: path.join(pageDir, `${v}/index.html`),
    minify: isDevMode ? false : {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  }))
})
plugins.push(new VueLoaderPlugin())
if (hasStaticRoot) {
  plugins.push(new CopyWebpackPlugin([{ from: staticDir, to: `${config.staticName}` }]))
}

module.exports = merge.smart(common, {
  entry: entry,
  plugins: plugins
})
