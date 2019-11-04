'use strict'

const RubikCommand = require('../lib/rubik-command')
// const { srcDir, eslintCLIEngineConfig } = require('../config')
const { formatResult } = require('@commitlint/format')
const load = require('@commitlint/load')
const lint = require('@commitlint/lint')
const read = require('@commitlint/read')

const CONFIG = {
  extends: ['@commitlint/config-conventional']
}

class CommitCommand extends RubikCommand {
  constructor (rawArgv) {
    super(rawArgv)
  }

  async run () {
    Promise.all([load(CONFIG), read({ from: 'HEAD~1' })])
      .then(tasks => {
        const [{ rules, parserPreset }, [commit]] = tasks
        console.log(333, commit)
        return lint(commit, rules, parserPreset ? { parserOpts: parserPreset.parserOpts } : {})
      })
      .then(result => {
        if (!result.valid) {
          console.log(result, formatResult(result))
          throw new Error()
        }
      })
  }

  get description () {
    return 'Commit lint.'
  }
}

module.exports = CommitCommand
