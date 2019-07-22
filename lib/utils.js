const pkg = require('../package.json')
const chalk = require('chalk')
const { config } = require('../config')
function isDevMode () {
  return process.env.NODE_ENV === 'development'
}
module.exports = {
  log: {
    info (text) {
      console.log(chalk.green(`[${pkg.name}]${text}`))
    },
    error (text) {
      console.log(chalk.red(`[${pkg.name}]${text}`))
    }
  },
  isDevMode,
  needEslint () {
    return isDevMode() && config.openStandardJs
  }
}
