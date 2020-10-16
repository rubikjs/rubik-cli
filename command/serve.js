'use strict'

const BaseCommand = require('../lib/base-command')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')
const { setDevEnv, setNoHashEnv, checkDir, checkMock, createDevMessage, setModeEnv } = require('../lib/utils')

class ServeCommand extends BaseCommand {
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
    setModeEnv(argv.mode)
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
    // 自动分配有效的端口
    const basePort = webpackConfig.devServer.port
    portfinder.basePort = basePort
    const validPort = await portfinder.getPortPromise()
    webpackConfig.devServer.port = validPort

    const compiler = webpack(webpackConfig)
    new webpack.ProgressPlugin().apply(compiler)
    new webpack.DefinePlugin({
      'process.env.MODE': JSON.stringify(argv.mode)
    }).apply(compiler)
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: createDevMessage(validPort)
      }
    }).apply(compiler)
    const server = new WebpackDevServer(compiler, webpackConfig.devServer)
    server.listen(webpackConfig.devServer.port, webpackConfig.devServer.host)
  }

  get description () {
    return 'Start a http server.'
  }
}

module.exports = ServeCommand
