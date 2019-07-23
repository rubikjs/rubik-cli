const fs = require('fs')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { config, srcDir, pageDir, staticDir, rootDir } = require('../config')
const pages = require('../lib/pages')
const { isDevMode, needEslint } = require('../lib/utils')
const isNoHash = process.env.NO_HASH_ENV === 'true'

const hasStaticRoot = fs.existsSync(staticDir)

const entry = {}
const plugins = []

if (config.vendor.length) {
  entry['vendor'] = config.vendor
}

// 遍历pages目录
pages.map((v, i) => {
  entry[v] = path.join(pageDir, `${v}/index.js`)
  plugins.push(new HtmlWebpackPlugin({
    publicPath: true,
    chunks: ['runtime', 'vendor', v],
    filename: isDevMode() ? `${v}.html` : `${config.templateName ? config.templateName + '/' : ''}${v}.html`,
    template: path.join(pageDir, `${v}/index.html`),
    minify: isDevMode() ? false : {
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  }))
})
if (hasStaticRoot) {
  plugins.push(new CopyWebpackPlugin([{ from: staticDir, to: `${config.staticName}` }]))
}

module.exports = {
  context: rootDir,
  entry: entry,
  plugins: plugins,
  resolve: {
    modules: [path.resolve(__dirname, '../node_modules'), srcDir, 'node_modules'],
    extensions: ['.js', '.json']
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, '../node_modules'), 'node_modules']
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: 'html-loader',
        exclude: config.pageTemplateWithoutHtmlLoader ? srcDir : []
      },
      {
        test: /\.(png|jpg|jpeg|gif|woff|woff2|eot|ttf|otf|mp4|webm|ogg|mp3|wav|flac|aac)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              context: srcDir,
              name: isDevMode() ? '[path][name].[ext]' : (isNoHash ? `${config.staticName}/[path][name].[ext]` : `${config.staticName}/[name].[hash:${config.hashLength}].[ext]`)
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.(js|jsx)$/,
        use: [
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [
                '@babel/plugin-transform-runtime',
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-proposal-object-rest-spread'
              ]
            }
          }
        ].concat(needEslint() ? ['eslint-loader'] : []),
        include: [
          srcDir
        ]
      },
      {
        test: /\.css$/,
        use: [
          isDevMode() ? 'style-loader' : MiniCssExtractPlugin.loader,
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
          isDevMode() ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.scss/,
        use: [
          isDevMode() ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  }
}
