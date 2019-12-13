'use strict'

const BaseCommand = require('../lib/base-command')
const { rootDir, srcDir } = require('../config')
const { stylelint } = require('../lib/utils')

class StyleLintCommand extends BaseCommand {
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
      },
      formatter: {
        type: 'string',
        default: 'unix',
        description: 'Specify the formatter "compact|json|string|unix|verbose , default is unix"'
      }
    }
  }

  async run ({ argv }) {
    const result = await stylelint({
      globbyOptions: {
        cwd: argv._.length ? rootDir : srcDir
      },
      files: argv._.length ? argv._ : '**/*.{scss,sass,css,less,html,vue}',
      fix: argv.fix,
      formatter: argv.formatter
    })
    if (!result) {
      process.exit(1)
    }
    if (result.errored) {
      if (!argv.quiet) {
        console.log(result.output)
      }
      process.exit(1)
    }
  }

  get description () {
    return 'Style lint.'
  }
}

module.exports = StyleLintCommand
