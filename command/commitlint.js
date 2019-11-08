'use strict'

const BaseCommand = require('../lib/base-command')
const { commitLintConfig } = require('../config')
const { format } = require('@commitlint/format')
const load = require('@commitlint/load')
const lint = require('@commitlint/lint')
const read = require('@commitlint/read')

class CommitLintCommand extends BaseCommand {
  constructor (rawArgv) {
    super(rawArgv)
  }

  async run () {
    const { rules, parserPreset } = await load(commitLintConfig)
    const [commit] = await read({ edit: true })
    const result = await lint(commit, rules, parserPreset ? { parserOpts: parserPreset.parserOpts } : {})
    const formatMessage = format({
      results: [result]
    }, {
      helpUrl: 'https://github.com/conventional-changelog/commitlint/#what-is-commitlint'
    })
    console.log(formatMessage)
    if (!result.valid) {
      process.exit(1)
    }
  }

  get description () {
    return 'Commit lint.'
  }
}

module.exports = CommitLintCommand
