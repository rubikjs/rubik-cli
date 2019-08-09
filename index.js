const config = require('./config')
const path = require('path')
const Command = require('common-bin')

class MainCommand extends Command {
  constructor (rawArgv) {
    super(rawArgv)
    this.usage = 'Usage: rubik <command> [options]'
    // load entire command directory
    this.load(path.join(__dirname, 'command'))
    this.yargs.alias('V', 'version')
    this.loadPlugins()
  }

  loadPlugins () {
    const plugins = config.config.plugins
    if (!Array.isArray(plugins)) {
      return
    }
    plugins.map((p) => {
      this.add(p.name, require(`rubik-cli-plugin-${p.name}`)(Command, p.options))
    })
  }
}

module.exports = MainCommand
