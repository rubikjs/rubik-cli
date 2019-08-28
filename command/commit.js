'use strict'

const TakeVersionCommand = require('../lib/take-version-command')
// const { srcDir, eslintCLIEngineConfig } = require('../config')
const bootstrap = require('commitizen/dist/cli/git-cz').bootstrap
const path = require('path')

class CommitCommand extends TakeVersionCommand {
  constructor (rawArgv) {
    super(rawArgv)
  }

  async run () {
    bootstrap({
      cliPath: path.join(__dirname, '../node_modules/commitizen'),
      config: {
        path: 'cz-conventional-changelog'
      }
    })
  }

  get description () {
    return 'Commit with Commitizen.'
  }
}

module.exports = CommitCommand
