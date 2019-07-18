const path = require('path')
const fs = require('fs')
const defaultConfig = require('./default')
const rootDir = process.cwd()
const customPath = path.join(rootDir, './rubik.config.js')
let customConfig = {}
if (fs.existsSync(customPath)) {
  customConfig = require(customPath)
}
const config = Object.assign(defaultConfig, customConfig)
const srcDir = path.join(rootDir, './src')
const mockDir = path.join(rootDir, './mock')
const pageDir = path.join(srcDir, './page')
const staticDir = path.join(srcDir, './static')
const distDir = path.join(rootDir, config.output)

module.exports = {
  rootDir,
  distDir,
  srcDir,
  pageDir,
  mockDir,
  staticDir,
  config
}
