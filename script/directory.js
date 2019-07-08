const fs = require('fs')
const path = require('path')
const { log } = require('./utils')
const shell = require('shelljs')

const rootDir = process.cwd()

const srcDir = path.join(rootDir, './src')

if (!fs.existsSync(srcDir)) {
  log.error('Need src directory.')
  shell.exit(1)
}

const pageDir = path.join(srcDir, './page')

if (!fs.existsSync(pageDir)) {
  log.error('Need page directory.')
  shell.exit(1)
}

const mockDir = path.join(rootDir, './mock')

if (!fs.existsSync(mockDir)) {
  log.error('Need mock router.')
  shell.exit(1)
}

const staticDir = path.join(srcDir, './static')

module.exports = {
  rootDir,
  srcDir,
  pageDir,
  mockDir,
  staticDir
}
