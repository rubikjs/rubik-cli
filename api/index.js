const Command = require('common-bin')
const TakeVersionCommand = require('../lib/take-version-command')
const utils = require('../lib/utils')
const config = require('../config')

module.exports = {
  Command,
  TakeVersionCommand,
  utils,
  config
}
