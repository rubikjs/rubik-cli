const config = require('./config')
// const utils = require('./lib/utils')
const path = require('path')
const Command = require('common-bin')

class MainCommand extends Command {
  constructor (rawArgv) {
    super(rawArgv)
    this.usage = 'Usage: rubik <command> [options]'
    this.config = config
    // load entire command directory
    this.load(path.join(__dirname, 'command'))
    this.yargs.alias('V', 'version')
    this.addPlugins()
  }

  addPlugins () {
    const plugins = this.config.config.plugins
    plugins.map((p) => {
      require(`rubik-cli-plugin-${p.name}`)(this, p.options)
    })
  }
}

module.exports = MainCommand
