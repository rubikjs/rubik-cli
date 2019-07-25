'use strict'

const Command = require('common-bin')
const webpack = require('webpack')
const { checkDir } = require('../lib/check-dir')
const { setProdMode } = require('../lib/utils')

class BuildCommand extends Command {
  constructor (rawArgv) {
    super(rawArgv)
  }
  async run () {
    if (!checkDir()) {
      return
    }
    setProdMode()
    const webpackConfig = require('../webpack/webpack.prod')
    const compiler = webpack(webpackConfig)
    new webpack.ProgressPlugin().apply(compiler)
    compiler.run()
  }

  get description () {
    return 'Build'
  }
}

module.exports = BuildCommand
