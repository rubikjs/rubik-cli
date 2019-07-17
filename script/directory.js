const fs = require('fs')
const path = require('path')
const { log } = require('./utils')
const shell = require('shelljs')
const buildConfig = require('../config')
const rootDir = process.cwd()
const distDir = path.join(rootDir, buildConfig.output)
const srcDir = path.join(rootDir, './src')

if (!fs.existsSync(srcDir)) {
  log.error('Need src directory.')
  shell.exit(1)
}

const mockDir = path.join(rootDir, './mock')

if (!fs.existsSync(mockDir)) {
  log.error('Need mock router.')
  shell.exit(1)
}

const pageDir = path.join(srcDir, './page')

if (!fs.existsSync(pageDir)) {
  log.error('Need page directory in src.')
  shell.exit(1)
}

const staticDir = path.join(srcDir, './static')

module.exports = {
  rootDir,
  distDir,
  srcDir,
  pageDir,
  mockDir,
  staticDir
}
