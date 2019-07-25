'use strict'

const Command = require('common-bin')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const { checkDir } = require('../lib/check-dir')
const { setDevMode } = require('../lib/utils')

class ServeCommand extends Command {
  constructor (rawArgv) {
    super(rawArgv)
  }
  async run () {
    if (!checkDir()) {
      return
    }
    setDevMode()
    const webpackConfig = require('../webpack/webpack.dev')
    const compiler = webpack(webpackConfig)
    new webpack.ProgressPlugin().apply(compiler)
    const server = new WebpackDevServer(compiler, webpackConfig.devServer)
    server.listen(webpackConfig.devServer.port, webpackConfig.devServer.host)
  }

  get description () {
    return 'Start a http server.'
  }
}

module.exports = ServeCommand
