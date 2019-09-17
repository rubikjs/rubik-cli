'use strict'
const { pkg } = require('../config')
const { log } = require('../lib/utils')
const Command = require('common-bin')
const shell = require('shelljs')
const semver = require('semver')
const chalk = require('chalk')

class RubikCommand extends Command {
  constructor (rawArgv) {
    super(rawArgv)
    log.info(`v${pkg.version}`)
    this.fetchLatestVersion()
    this.detectMode()
  }

  fetchLatestVersion () {
    const stdout = shell.exec(`npm info ${pkg.name} version`, { silent: true }).stdout
    const latest = stdout.replace(/\s$/, '')
    if (semver.lt(pkg.version, latest)) {
      log.info(`There is a new update version ${chalk.red('v' + latest)} now.`)
    }
  }

  detectMode () {

  }
}

module.exports = RubikCommand
