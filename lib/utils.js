const package = require('../package.json')
const chalk = require('chalk')
module.exports = {
  log: {
    info (text) {
      console.log(chalk.green(`[${package.name}]${text}`))
    },
    error (text) {
      console.log(chalk.red(`[${package.name}]${text}`))
    }
  }
}
