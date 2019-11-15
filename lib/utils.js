const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const emoji = require('node-emoji')
const { srcDir, mockDir, pageDir } = require('../config')
const { CLI_NAME } = require('../config/cli')
const logPrefix = chalk.bgYellow.red(emoji.emojify(` :heart: ${CLI_NAME}: `))
const debug = require('debug')(CLI_NAME)
const shell = require('shelljs')
const { pkg } = require('../config')

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

function fetchLatestVersion () {
  const stdout = shell.exec(`npm view ${pkg.name} version`, { silent: true }).stdout
  const latest = stdout.replace(/\s$/, '')
  debug('latest version', latest)
  return latest
}

module.exports = {
  log,
  setNoHashEnv () {
    process.env.NO_HASH_ENV = 'true'
  },
  setDevEnv () {
    process.env.NODE_ENV = 'development'
  },
  setProdEnv () {
    process.env.NODE_ENV = 'production'
  },
  isYarn () {
    return process.env.npm_execpath && process.env.npm_execpath.indexOf('yarn') !== -1
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
    return checkMock()
  },
  checkMock,
  debug,
  fetchLatestVersion,
  getPageEntry (name) {
    const pagePath = path.join(pageDir, name)
    const jsx = path.join(pagePath, 'index.jsx')
    if (fs.existsSync(jsx)) {
      return jsx
    }
    return path.join(pagePath, 'index.js')
  }
}
