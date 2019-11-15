'use strict'

const BaseCommand = require('../lib/base-command')
const { rootDir, srcDir, eslintCLIEngineConfig } = require('../config')
const { CLIEngine } = require('eslint')
const formatter = require('eslint-formatter-friendly')

class LintCommand extends BaseCommand {
  constructor (rawArgv) {
    super(rawArgv)
    this.options = {
      fix: {
        type: 'boolean',
        default: false,
        description: 'Automatically fix problems'
      },
      quiet: {
        type: 'boolean',
        default: false,
        description: 'Whether not output the console verbose'
      }
    }
  }

  async run ({ argv }) {
    const cli = new CLIEngine({
      ...eslintCLIEngineConfig,
      ignorePattern: ['static/**/*.*'],
      cwd: argv._.length ? rootDir : srcDir,
      fix: argv.fix
    })
    const report = cli.executeOnFiles(argv._.length ? argv._ : [srcDir])
    CLIEngine.outputFixes(report)
    const errorReport = CLIEngine.getErrorResults(report.results)
    if (!argv.quiet) {
      console.log(formatter(errorReport))
    }
    if (errorReport.length) {
      process.exit(1)
    }
  }

  get description () {
    return 'Eslint.'
  }
}

module.exports = LintCommand
