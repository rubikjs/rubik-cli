const fs = require('fs')
const chalk = require('chalk')
const emoji = require('node-emoji')
const { srcDir, mockDir, pageDir } = require('../config')
const logPrefix = chalk.bgYellow.red(emoji.emojify(' :heart: Rubik: '))

const log = {
  info (text) {
    console.log(`${logPrefix}${chalk.green(text)}`)
  },
  error (text) {
    console.log(`${logPrefix}${chalk.red(text)}`)
  }
}

function checkMock () {
  if (!fs.existsSync(mockDir)) {
    log.error('Need mock router.')
    return false
  }
  return true
}

module.exports = {
  log,
  setNoHashMode () {
    process.env.NO_HASH_ENV = 'true'
  },
  setDevMode () {
    process.env.NODE_ENV = 'development'
  },
  setProdMode () {
    process.env.NODE_ENV = 'production'
  },
  isYarn () {
    return process.env.npm_execpath.indexOf('yarn') !== -1
  },
  checkDir () {
    if (!fs.existsSync(srcDir)) {
      log.error('Need src directory.')
      return false
    }
    if (!fs.existsSync(pageDir)) {
      log.error('Need page directory in src.')
      return false
    }
    if (!checkMock()) {
      return false
    }
    return true
  },
  checkMock
}
