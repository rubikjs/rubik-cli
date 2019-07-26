const chalk = require('chalk')
module.exports = {
  log: {
    info (text) {
      console.log(chalk.green(`[Rubik]${text}`))
    },
    error (text) {
      console.log(chalk.red(`[Rubik]${text}`))
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
