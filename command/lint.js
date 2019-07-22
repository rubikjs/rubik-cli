'use strict'

const Command = require('common-bin')
const { srcDir, customEslintConfig } = require('../config')
const { CLIEngine } = require("eslint")
const formatter = require("eslint-friendly-formatter")
const eslintConfig = require('../.eslintrc')

class LintCommand extends Command {
  constructor (rawArgv) {
    super(rawArgv)
  }

  async run () {
    const cli = new CLIEngine({
      baseConfig: {
        ...eslintConfig,
        ...customEslintConfig
      },
      ignorePattern: ['static/**/*.*'],
      fix: true,
      cwd: srcDir
    })
    const report = cli.executeOnFiles([srcDir])
    CLIEngine.outputFixes(report)
    const errorReport = CLIEngine.getErrorResults(report.results)
    console.log(formatter(errorReport))
  }

  get description () {
    return 'Eslint.'
  }
}

module.exports = LintCommand
