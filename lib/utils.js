const pkg = require('../package.json')
const chalk = require('chalk')
module.exports = {
  log: {
    info (text) {
      console.log(chalk.green(`[${pkg.name}]${text}`))
    },
    error (text) {
      console.log(chalk.red(`[${pkg.name}]${text}`))
    }
  }
}
