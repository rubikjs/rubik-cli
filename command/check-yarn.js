'use strict'

const Command = require('common-bin')
const Webpack = require('webpack')
const webpackConfig = require('../webpack/webpack.prod')

class CheckYarnCommand extends Command {
  async run () {
    const compiler = Webpack(webpackConfig)
    compiler.run()
  }

  get description () {
    return 'Build'
  }
}

module.exports = CheckYarnCommand
