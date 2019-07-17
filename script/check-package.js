const buildConfig = require('../config')
const shell = require('shelljs')
const { log } = require('../lib/utils')
if (!buildConfig.reInstallOnPkgChange) {
  shell.exit(0)
}
if (!shell.which('git')) {
  log.error('Sorry, this script requires git.')
  shell.exit(1)
}
const stdout = shell.exec('git diff-tree -r --name-only --no-commit-id HEAD HEAD@{1}', { silent: true }).stdout
const currentBranch = shell.exec('git rev-parse --abbrev-ref HEAD', { silent: true }).stdout.replace(/\s$/, '')
const notReInstallOnPkgChangeFeatures = buildConfig.notReInstallOnPkgChangeFeatures
if (Array.isArray(notReInstallOnPkgChangeFeatures) && notReInstallOnPkgChangeFeatures.includes(currentBranch)) {
  log.info(`Current branch ${currentBranch} does not need check.`)
  shell.exit(0)
}
const targetFiles = ['package.json']
const noTargetChange = targetFiles.every((file) => {
  return stdout.indexOf(file) === -1
})
if (noTargetChange) {
  shell.exit(0)
}
log.info('The package.json file has been changed, it will auto reinstall now.')
shell.exec('yarn')
shell.exit(0)
