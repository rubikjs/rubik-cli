'use strict'

const Command = require('common-bin')
const { spawn } = require('child_process')
const path = require('path')
const { rootDir } = require('../config')
const { log } = require('../lib/utils')

class CheckYarnCommand extends Command {
  constructor (rawArgv) {
    super(rawArgv)
  }

  async run () {
    const child = spawn('node', [path.resolve(__dirname, '../script/check-yarn.js')], {
      cwd: rootDir
    })
    child.stdout.on('data', function (data) {
      log.info(data.toString())
    })
  }

  get description () {
    return 'Check whether use the yarn for installing.'
  }
}

module.exports = CheckYarnCommand
