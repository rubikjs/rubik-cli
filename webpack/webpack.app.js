const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const { config, pageDir, staticDir } = require('../config')
const pages = require('../lib/pages')
const { getPageEntry } = require('../lib/utils')

const isDevMode = process.env.NODE_ENV === 'development'
const hasStaticRoot = fs.existsSync(staticDir)
const entry = {}
const plugins = []

if (config.vendor.length) {
  entry.vendor = config.vendor
}

// 遍历pages目录
pages.map((v) => {
  entry[v] = getPageEntry(v)
  plugins.push(new HtmlWebpackPlugin({
    chunks: ['runtime', 'vendor', v],
    filename: isDevMode ? `${v}.html` : `${config.templateName ? config.templateName + '/' : ''}${v}.html`,
    template: path.join(pageDir, `${v}/index.${config.pageTemplateExtension}`),
    minify: isDevMode ? false : {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: true,
      minifyJS: true
    },
    templateParameters: {
      MODE: process.env.MODE
    }
  }))
})
if (hasStaticRoot) {
  plugins.push(new CopyWebpackPlugin([
    {
      from: staticDir,
      to: `${config.staticName}`,
      ignore: ['*.html']
    },
    {
      from: staticDir,
      to: `${config.templateName}`,
      ignore: ['!*.html']
    }
  ]))
}

module.exports = merge(common, {
  entry: entry,
  plugins: plugins
})
