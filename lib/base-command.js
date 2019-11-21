'use strict'
const { pkg } = require('../config')
const { log } = require('../lib/utils')
const Command = require('common-bin')

class BaseCommand extends Command {
  constructor (rawArgv) {
    super(rawArgv)
    const argv = this.yargs.parse(rawArgv)
    if (!argv.ignoreVersion) {
      this.showVersion()
    }
  }

  showVersion () {
    log.info(`v${pkg.version}`)
  }
}

module.exports = BaseCommand
