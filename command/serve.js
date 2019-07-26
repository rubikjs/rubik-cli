'use strict'

const TakeVersionCommand = require('../lib/take-version-command')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const { checkDir } = require('../lib/check-dir')
const { setDevMode, setNoHashMode } = require('../lib/utils')

class ServeCommand extends TakeVersionCommand {
  constructor (rawArgv) {
    super(rawArgv)
    this.options = {
      lib: {
        type: 'boolean',
        default: false,
        description: 'whether library mode'
      }
    }
  }

  async run ({ argv }) {
    setDevMode()
    let webpackConfig = ''
    if (argv.lib) {
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
