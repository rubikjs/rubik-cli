'use strict'

const RubikCommand = require('../lib/rubik-command')
const { spawn } = require('child_process')
const path = require('path')
const { rootDir } = require('../config')

class CheckPackageCommand extends RubikCommand {
  constructor (rawArgv) {
    super(rawArgv)
  }

  async run () {
    const child = spawn('node', [path.resolve(__dirname, '../script/check-package.js')], {
      cwd: rootDir
    })
    child.stdout.on('data', function (data) {
      console.log(data.toString())
    })
  }

  get description () {
    return 'Check the package.json file is changed from pre version.'
  }
}

module.exports = CheckPackageCommand
