'use strict'

const Command = require('common-bin')
const { srcDir, eslintCLIEngineConfig } = require('../config')
const { CLIEngine } = require('eslint')
const formatter = require('eslint-formatter-friendly')

class LintCommand extends Command {
  constructor (rawArgv) {
    super(rawArgv)
  }

  async run () {
    const cli = new CLIEngine({
      ...eslintCLIEngineConfig,
      ignorePattern: ['static/**/*.*'],
      cwd: srcDir
    })
    const report = cli.executeOnFiles([srcDir])
    CLIEngine.outputFixes(report)
    const errorReport = CLIEngine.getErrorResults(report.results)
    console.log(formatter(errorReport))
    if (errorReport.length) {
      process.exit(1)
    }
  }

  get description () {
    return 'Eslint.'
  }
}

module.exports = LintCommand
