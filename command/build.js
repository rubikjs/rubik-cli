'use strict'

const Command = require('common-bin')
const Webpack = require('webpack')
const { checkDir } = require('../lib/check-dir')

class BuildCommand extends Command {
  constructor (rawArgv) {
    super(rawArgv)
  }
  async run () {
    if (!checkDir()) {
      return
    }
    const webpackConfig = require('../webpack/webpack.prod')
    const compiler = Webpack(webpackConfig)
    compiler.run()
  }

  get description () {
    return 'Build'
  }
}

module.exports = BuildCommand
