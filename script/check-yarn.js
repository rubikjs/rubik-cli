const { log, isYarn } = require('../lib/utils')
const shell = require('shelljs')
if (!isYarn()) {
  log.error('Please use yarn for installing.')
  shell.exit(1)
}
shell.exit(0)
