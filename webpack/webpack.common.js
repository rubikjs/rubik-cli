const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const StylelintPlugin = require('./stylelint.plugin')
const formatter = require('eslint-formatter-friendly')
const { config, srcDir, staticDir, rootDir, eslintCLIEngineConfig } = require(
  '../config')

const isDevMode = process.env.NODE_ENV === 'development'
const isNoHash = process.env.NO_HASH_ENV === 'true'

module.exports = {
  context: rootDir,
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new StylelintPlugin(),
    new VueLoaderPlugin()
  ],
  resolve: {
    modules: [
      path.resolve(__dirname, '../node_modules'),
      srcDir,
      'node_modules'],
    extensions: ['.js', '.jsx', '.vue', '.json']
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
              name: isDevMode ? '[path][name].[ext]' : (isNoHash
                ? `${config.staticName}/[path][name].[ext]`
                : `${config.staticName}/[name].[hash:${config.hashLength}].[ext]`)
            }
          }
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
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
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.s[ac]ss/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.(js|jsx|vue)$/,
        enforce: 'pre',
        use: [
          {
            loader: 'eslint-loader',
            options: {
              ...eslintCLIEngineConfig,
              formatter
            }
          }],
        include: [
          srcDir
        ],
        exclude: staticDir
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
                '@babel/plugin-proposal-object-rest-spread',
                ['@babel/plugin-proposal-decorators', { legacy: true }],
                ['@babel/plugin-proposal-class-properties', { loose: true }]
              ]
            }
          }
        ],
        include: [
          srcDir
        ]
      },
      {
        test: /\.vue$/,
        use: ['cache-loader', 'vue-loader'],
        include: [
          srcDir
        ]
      }
    ]
  }
}
