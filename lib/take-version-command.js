'use strict'
const { pkg } = require('../config')
const { log } = require('../lib/utils')
const Command = require('common-bin')
const shell = require('shelljs')
const semver = require('semver')

class TakeVersionCommand extends Command {
  constructor (rawArgv) {
    super(rawArgv)
    log.info(`v${pkg.version}`)
    process.on('exit', this.fetchLatestVersion.bind(this))
  }

  fetchLatestVersion () {
    const stdout = shell.exec(`npm info ${pkg.name} version`, { silent: true }).stdout
    const latest = stdout.replace(/\s$/, '')
    if (semver.lt(pkg.version, latest)) {
      log.info(`There is a latest version v${latest} now, you can run 'yarn upgrade rubik-cli@latest' to update.`)
    }
  }
}

module.exports = TakeVersionCommand
