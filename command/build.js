'use strict'

const BaseCommand = require('../lib/base-command')
const webpack = require('webpack')
const { setProdEnv, setNoHashEnv, checkDir } = require('../lib/utils')

class BuildCommand extends BaseCommand {
  constructor (rawArgv) {
    super(rawArgv)
    this.options = {
      lib: {
        type: 'boolean',
        default: false,
        description: 'whether library mode'
      },
      mode: {
        type: 'String',
        default: 'production',
        description: 'define the mode type(default production)'
      }
    }
  }

  async run ({ argv }) {
    setProdEnv()
    let webpackConfig = ''
    if (argv.lib) {
      setNoHashEnv()
      webpackConfig = require('../webpack/webpack.lib.prod')
    } else {
      if (!checkDir()) {
        return
      }
      webpackConfig = require('../webpack/webpack.app.prod')
    }
    const compiler = webpack(webpackConfig)
    new webpack.ProgressPlugin().apply(compiler)
    new webpack.DefinePlugin({
      'process.env.MODE': JSON.stringify(argv.mode)
    }).apply(compiler)
    compiler.run()
  }

  get description () {
    return 'Build.'
  }
}

module.exports = BuildCommand
