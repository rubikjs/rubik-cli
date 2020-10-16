const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const emoji = require('node-emoji')
const stylelint = require('stylelint')
const { config, srcDir, mockDir, pageDir, stylelintConfig, staticDir, pkg } = require('../config')
const { CLI_NAME } = require('../config/cli')
const logPrefix = chalk.red(emoji.emojify(` :heart: ${CLI_NAME}: `))
const debug = require('debug')(CLI_NAME)
const shell = require('shelljs')
const semver = require('semver')
const ip = require('ip')
let latestVersion = null
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

function getLatestVersion () {
  if (latestVersion !== null) { // has fetched
    return latestVersion
  }
  latestVersion = fetchLatestVersion()
  return latestVersion
}

function hasNewVersion () {
  const latest = getLatestVersion()
  if (!latest) {
    return false
  }
  return semver.lt(pkg.version, latest)
}

function isAbsolutePublicPath () {
  return /^\//.test(config.publicPath)
}

function getDevPublicPath () {
  return isAbsolutePublicPath() ? config.publicPath : '/'
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
  setModeEnv (mode = '') {
    process.env.MODE = mode
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
  getLatestVersion,
  hasNewVersion,
  getPageEntry (name) {
    const pagePath = path.join(pageDir, name)
    const jsx = path.join(pagePath, 'index.jsx')
    if (fs.existsSync(jsx)) {
      return jsx
    }
    return path.join(pagePath, 'index.js')
  },
  stylelint (options) {
    return stylelint.lint(Object.assign({
      config: stylelintConfig,
      globbyOptions: {
        cwd: srcDir
      },
      files: '**/*.{scss,sass,css,less,html,vue}',
      fix: false,
      formatter: 'unix'
    }, options)).then((resultObject) => {
      return resultObject
    }).catch(() => { })
  },
  isValidStylelintFile (fileName) {
    if (!/\.(scss|sass|css|less|html|vue)$/i.test(fileName)) {
      return false
    }
    if (fileName.indexOf(srcDir) === -1) {
      return false
    }
    if (fileName.indexOf(staticDir) === 0) {
      return false
    }
    return true
  },
  createDevMessage (port = config.port) {
    const messages = ['Application is running at']
    const path = `:${port}${getDevPublicPath()}`
    const isLocalHost = config.host === '0.0.0.0' || config.host === 'localhost'
    if (isLocalHost) {
      messages.push(`    Local: http://localhost${path}`)
      messages.push(`    Network: http://${ip.address()}${path}`)
    } else {
      messages.push(`    Network: http://${config.host}${path}`)
    }
    if (hasNewVersion()) {
      messages.push(`    ${chalk.red(emoji.get('heart'))} Tips: The version ${chalk.red('v' + getLatestVersion())} is available now.`)
    }
    return [messages.join('\n')]
  },
  isAbsolutePublicPath,
  getDevPublicPath
}
