'use strict'
const { pkg } = require('../config')
const { log, fetchLatestVersion } = require('../lib/utils')
const Command = require('common-bin')
const semver = require('semver')
const chalk = require('chalk')

class BaseCommand extends Command {
  constructor (rawArgv) {
    super(rawArgv)
    const argv = this.yargs.parse(rawArgv)
    if (!argv.ignoreVersion) {
      this.fetchLatestVersion()
    }
  }

  fetchLatestVersion () {
    log.info(`v${pkg.version}`)
    const latest = fetchLatestVersion()
    if (!latest) {
      log.error('Can not get the latest version.')
      return
    }
    if (semver.lt(pkg.version, latest)) {
      log.info(`There is a new update version ${chalk.red('v' + latest)} now.`)
    }
  }
}

module.exports = BaseCommand
