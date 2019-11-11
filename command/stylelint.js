'use strict'

const BaseCommand = require('../lib/base-command')
const { rootDir, srcDir, stylelintConfig } = require('../config')
const stylelint = require('stylelint')
const stylelintFormatter = require('stylelint-formatter-pretty')

class StyleLintCommand extends BaseCommand {
  constructor (rawArgv) {
    super(rawArgv)
    this.options = {
      fix: {
        type: 'boolean',
        default: false,
        description: 'Automatically fix problems'
      }
    }
  }

  async run ({ argv }) {
    const result = await stylelint.lint({
      config: stylelintConfig,
      globbyOptions: {
        cwd: argv._.length ? rootDir : srcDir
      },
      files: argv._.length ? argv._ : '**/*.{scss,sass,css,less,html,vue}',
      ignorePattern: 'static',
      fix: argv.fix,
      formatter: stylelintFormatter
    }).then((resultObject) => {
      return resultObject
    }).catch((err) => {
      console.error(err.stack)
      process.exit(1)
    })
    if (result.errored) {
      process.exit(1)
    }
  }

  get description () {
    return 'Style lint.'
  }
}

module.exports = StyleLintCommand
