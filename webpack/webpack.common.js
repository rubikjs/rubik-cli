const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const buildConfig = require('../config')
const pages = require('../script/pages')
const isDevMode = process.env.NODE_ENV !== 'production'
const isNoHash = process.env.NO_HASH_ENV === 'true'
const needEslint = isDevMode && buildConfig.openStandardJs
const { srcDir, pageDir, staticDir } = require('../script/directory')

let hasStaticRoot = fs.existsSync(staticDir)

let entry = {}
let plugins = []

if (buildConfig.vendor.length) {
  entry['vendor'] = buildConfig.vendor
}

// 遍历pages目录
pages.map((v, i) => {
  entry[v] = `${pageDir}/${v}/index.js`
  plugins.push(new HtmlWebpackPlugin({
    publicPath: true,
    chunks: ['runtime', 'vendor', v],
    filename: isDevMode ? `${v}.html` : `${buildConfig.templateName ? buildConfig.templateName + '/' : ''}${v}.html`,
    template: `${pageDir}/${v}/index.html`,
    minify: isDevMode ? false : {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  }))
})
if (hasStaticRoot) {
  plugins.push(new CopyWebpackPlugin([{from: staticDir, to: `${buildConfig.staticName}`}]))
}

module.exports = {
  entry: entry,
  plugins: plugins,
  resolve: {
    modules: [srcDir, 'node_modules'],
    extensions: ['.js', '.json'],
    alias: {
      '@': srcDir
    }
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: buildConfig.pageTemplateWithoutHtmlLoader ? srcDir : []
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf|mp4|webm|ogg|mp3|wav|flac|aac)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              context: srcDir,
              name: isDevMode ? '[path][name].[ext]' : (isNoHash ? `${buildConfig.staticName}/[path][name].[ext]` : `${buildConfig.staticName}/[name].[hash:${buildConfig.hashLength}].[ext]`)
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.js$/,
        use: [
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-object-rest-spread',
              ]
            }
          }
        ].concat(needEslint ? ['eslint-loader'] : []),
        include: [
          srcDir
        ]
      },
      {
        test: /\.css$/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('autoprefixer')()
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.scss/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}
