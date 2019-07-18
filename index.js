const path = require('path')
const Command = require('common-bin')
const config = require('./config')

class MainCommand extends Command {
  constructor (rawArgv) {
    super(rawArgv)
    this.usage = 'Usage: rubik <command> [options]'

    // load entire command directory
    this.load(path.join(__dirname, 'command'))

    // more custom with `yargs` api, such as you can use `my-git -V`
    this.yargs.alias('V', 'version')
  }
}

module.exports = MainCommand
