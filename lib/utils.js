const pkg = require('../package.json')
const chalk = require('chalk')
const { config } = require('../config')
module.exports = {
  log: {
    info (text) {
      console.log(chalk.green(`[${pkg.name}]${text}`))
    },
    error (text) {
      console.log(chalk.red(`[${pkg.name}]${text}`))
    }
  },
  setDevMode () {
    process.env.NODE_ENV = 'development'
  },
  setProdMode () {
    process.env.NODE_ENV = 'production'
  }
}
