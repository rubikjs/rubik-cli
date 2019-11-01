'use strict'

const RubikCommand = require('../lib/rubik-command')
// const { srcDir, eslintCLIEngineConfig } = require('../config')
const bootstrap = require('commitizen/dist/cli/git-cz').bootstrap
const path = require('path')

class CommitCommand extends RubikCommand {
  constructor (rawArgv) {
    super(rawArgv)
  }

  async run () {
    // https://github.com/commitizen/cz-cli/issues/667
    Object.assign(process.env, {
      CZ_TYPE: ' ',
      CZ_SCOPE: ' ',
      CZ_SUBJECT: ' ',
      CZ_BODY: ' ',
      CZ_ISSUES: ' ',
      CZ_MAX_HEADER_WIDTH: 100,
      CZ_MAX_LINE_WIDTH: 100
    })
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
