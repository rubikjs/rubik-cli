'use strict'

const BaseCommand = require('../lib/base-command')
const { fork } = require('child_process')
const path = require('path')
const { rootDir } = require('../config')

class CheckPackageCommand extends BaseCommand {
  constructor (rawArgv) {
    super(rawArgv)
  }

  async run ({ rawArgv }) {
    const child = fork(path.resolve(__dirname, '../script/check-package.js'), {
      cwd: rootDir,
      execArgv: rawArgv
    })
    child.on('message', function (msg) {
      console.log(JSON.stringify(msg))
    })
  }

  get description () {
    return 'Check the package.json file is changed from pre version.'
  }
}

module.exports = CheckPackageCommand
