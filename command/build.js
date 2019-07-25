'use strict'

const Command = require('common-bin')
const webpack = require('webpack')
const { checkDir } = require('../lib/check-dir')
const { setProdMode, setNoHashMode } = require('../lib/utils')

class BuildCommand extends Command {
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
    setProdMode()
    let webpackConfig = ''
    if (argv.lib) {
      setNoHashMode()
      webpackConfig = require('../webpack/webpack.lib.prod')
    } else {
      if (!checkDir()) {
        return
      }
      webpackConfig = require('../webpack/webpack.app.prod')
    }
    const compiler = webpack(webpackConfig)
    new webpack.ProgressPlugin().apply(compiler)
    compiler.run()
  }

  get description () {
    return 'Build'
  }
}

module.exports = BuildCommand
