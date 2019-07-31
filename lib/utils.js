const chalk = require('chalk')
const emoji = require('node-emoji')
const logPrefix = chalk.bgYellow.red(emoji.emojify(' :heart: Rubik: '))
module.exports = {
  log: {
    info (text) {
      console.log(`${logPrefix}${chalk.green(text)}`)
    },
    error (text) {
      console.log(`${logPrefix}${chalk.red(text)}`)
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
  },
  isYarn () {
    return process.env.npm_execpath.indexOf('yarn') !== -1
  }
}
