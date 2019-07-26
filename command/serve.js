'use strict'

const TakeVersionCommand = require('../lib/take-version-command')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const { checkDir, checkMock } = require('../lib/check-dir')
const { setDevMode, setNoHashMode } = require('../lib/utils')

class ServeCommand extends TakeVersionCommand {
  constructor (rawArgv) {
    super(rawArgv)
    this.options = {
      lib: {
        type: 'boolean',
        default: null,
        description: 'whether library mode'
      }
    }
  }

  async run ({ argv }) {
    setDevMode()
    let webpackConfig = ''
    return
    if (argv.lib) {
      if (!checkMock()) {
        return
      }
      setNoHashMode()
      webpackConfig = require('../webpack/webpack.lib.dev')
    } else {
      if (!checkDir()) {
        return
      }
      webpackConfig = require('../webpack/webpack.app.dev')
    }
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
