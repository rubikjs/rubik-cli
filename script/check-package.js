const { config } = require('../config')
const shell = require('shelljs')
const { log, isYarn, debug } = require('../lib/utils')
if (!config.reInstallOnPkgChange) {
  shell.exit(0)
}
if (!shell.which('git')) {
  log.error('Sorry, this script requires git.')
  shell.exit(1)
}
const stdout = shell.exec('git diff-tree -r --name-only --no-commit-id HEAD HEAD@{1}', { silent: true }).stdout
const currentBranch = shell.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout.replace(/\s$/, '')
const notReInstallOnPkgChangeFeatures = config.notReInstallOnPkgChangeFeatures
if (Array.isArray(notReInstallOnPkgChangeFeatures) && notReInstallOnPkgChangeFeatures.includes(currentBranch)) {
  log.info(`Current branch ${currentBranch} does not need check.`)
  shell.exit(0)
}
const targetFiles = ['package.json']
const changedFiles = stdout.split('\n')
debug('changedFiles', changedFiles)
const noTargetChange = targetFiles.every((file) => {
  return changedFiles.indexOf(file) === -1
})
if (noTargetChange) {
  log.info('The package.json file is not change.')
  shell.exit(0)
}
log.info('The package.json file has been changed, it will auto reinstall now.')
debug('isYarn', isYarn())
shell.exec(isYarn() ? 'yarn' : 'npm i')
shell.exit(0)
