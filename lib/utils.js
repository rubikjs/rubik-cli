const { pkg } = require('../config')
const chalk = require('chalk')
module.exports = {
  log: {
    info (text) {
      console.log(chalk.green(`[${pkg.name}]${text}`))
    },
    error (text) {
      console.log(chalk.red(`[${pkg.name}]${text}`))
    }
  },
  setNoHashMode () {
    process.env.NO_HASH_ENV = 'true'
  },
  setDevMode () {
    process.env.NODE_ENV = 'development'
  },
  setProdMode () {
    process.env.NODE_ENV = 'production'
  }
}
