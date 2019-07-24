const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const isDevMode = process.env.NODE_ENV === 'development'

module.exports = {
  resolve: { alias: { vue: 'vue/dist/vue.esm.js' } },
  module: {
    rules: [
      {
        test: /\.scss/,
        use: [
          isDevMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
          {
            loader: 'sass-resources-loader',
            options: {
              // Provide path to the file with resources
              resources: path.resolve(__dirname, './src/style/mixins.scss')
            }
          }
        ]
      }
    ]
  }
}
