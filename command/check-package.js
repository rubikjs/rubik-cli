'use strict'

const TakeVersionCommand = require('../lib/take-version-command')
const { spawn } = require('child_process')
const path = require('path')
const { rootDir } = require('../config')
const { log } = require('../lib/utils')

class CheckPackageCommand extends TakeVersionCommand {
  constructor (rawArgv) {
    super(rawArgv)
  }

  async run () {
    const child = spawn('node', [path.resolve(__dirname, '../script/check-package.js')], {
      cwd: rootDir
    })
    child.stdout.on('data', function (data) {
      log.info(data.toString())
    })
  }

  get description () {
    return 'Check the package.json file is changed from pre version.'
  }
}

module.exports = CheckPackageCommand
