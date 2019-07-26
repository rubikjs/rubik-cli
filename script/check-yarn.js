const { log } = require('../lib/utils')
const shell = require('shelljs')
if (process.env.npm_execpath.indexOf('yarn') === -1) {
  log.error('Please use yarn for installing.')
  shell.exit(1)
}
shell.exit(0)
