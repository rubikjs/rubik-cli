'use strict'

const RubikCommand = require('../lib/rubik-command')
// const { srcDir, eslintCLIEngineConfig } = require('../config')
const { formatResult } = require('@commitlint/format')
const load = require('@commitlint/load')
const lint = require('@commitlint/lint')

const CONFIG = {
  extends: ['@commitlint/config-conventional']
}

class CommitCommand extends RubikCommand {
  constructor (rawArgv) {
    super(rawArgv)
  }

  async run () {
    load(CONFIG)
      .then(opts => lint('foo: bar', opts.rules, opts.parserPreset ? { parserOpts: opts.parserPreset.parserOpts } : {}))
      .then(report => {
        const results = formatResult(report)
        console.log(report, formatResult(report))
        results.forEach(v => console.log(v))
      })
  }

  get description () {
    return 'Commit lint.'
  }
}

module.exports = CommitCommand
