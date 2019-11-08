const path = require('path')
const Command = require('common-bin')
const config = require('./config')
const { CLI_NAME } = require('./config/cli')
const api = require('./api')

class MainCommand extends Command {
  constructor (rawArgv) {
    super(rawArgv)
    this.usage = `Usage: ${CLI_NAME} <command> [options]`
    // load entire command directory
    this.load(path.join(__dirname, 'command'))
    this.yargs.alias('V', 'version').scriptName(CLI_NAME)
    this.loadPlugins()
  }

  loadPlugins () {
    const plugins = config.config.plugins
    if (!Array.isArray(plugins)) {
      return
    }
    plugins.map((p) => {
      this.add(p.name, require(`${CLI_NAME}-cli-plugin-${p.name}`)(api, p.options))
    })
  }
}

module.exports = MainCommand
