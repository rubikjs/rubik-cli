'use strict'

const BaseCommand = require('../lib/base-command')
const { srcDir, stylelintConfig } = require('../config')
const stylelint = require('stylelint')
const stylelintFormatter = require('stylelint-formatter-pretty')

class StyleLintCommand extends BaseCommand {
  constructor (rawArgv) {
    super(rawArgv)
  }

  async run ({ argv }) {
    stylelint.lint({
      config: stylelintConfig,
      globbyOptions: {
        cwd: srcDir
      },
      files: (argv._ && argv._.length) ? argv._ : '**/*.{scss,sass,css,less,html,vue}',
      ignorePattern: 'static',
      fix: argv.fix,
      formatter: stylelintFormatter
    }).then((resultObject) => {
      console.log(resultObject.output)
      if (resultObject.errored) {
        process.exit(1)
      }
    }).catch((err) => {
      console.error(err.stack)
      process.exit(1)
    })
  }

  get description () {
    return 'Style lint.'
  }
}

module.exports = StyleLintCommand
