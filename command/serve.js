'use strict'

const RubikCommand = require('../lib/rubik-command')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const { setDevEnv, setNoHashEnv, checkDir, checkMock } = require('../lib/utils')

class ServeCommand extends RubikCommand {
  constructor (rawArgv) {
    super(rawArgv)
    this.options = {
      lib: {
        type: 'boolean',
        default: null,
        description: 'whether library mode'
      },
      mode: {
        type: 'String',
        default: 'development',
        description: 'define the mode type(default development)'
      }
    }
  }

  async run ({ argv }) {
    setDevEnv()
    let webpackConfig = ''
    if (argv.lib) {
      if (!checkMock()) {
        return
      }
      setNoHashEnv()
      webpackConfig = require('../webpack/webpack.lib.dev')
    } else {
      if (!checkDir()) {
        return
      }
      webpackConfig = require('../webpack/webpack.app.dev')
    }
    const compiler = webpack(webpackConfig)
    new webpack.ProgressPlugin().apply(compiler)
    new webpack.DefinePlugin({
      MODE: JSON.stringify(argv.mode)
    }).apply(compiler)
    const server = new WebpackDevServer(compiler, webpackConfig.devServer)
    server.listen(webpackConfig.devServer.port, webpackConfig.devServer.host)
  }

  get description () {
    return 'Start a http server.'
  }
}

module.exports = ServeCommand
