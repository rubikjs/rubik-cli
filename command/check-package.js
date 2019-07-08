'use strict'

const Command = require('common-bin')
const Webpack = require('webpack')
const webpackConfig = require('../webpack/webpack.prod')

class CheckPackageCommand extends Command {
  async run () {
    const compiler = Webpack(webpackConfig)
    compiler.run()
  }

  get description () {
    return 'Build'
  }
}

module.exports = CheckPackageCommand
