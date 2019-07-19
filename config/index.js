const path = require('path')
const fs = require('fs')
const defaultConfig = require('./default')
const rootDir = process.cwd()
const customPath = path.resolve(rootDir, './rubik.config.js')
const customWebpackPath = path.resolve(rootDir, './rubik.webpack.js')
const customConfig = fs.existsSync(customPath) ? require(customPath) : {}
const config = Object.assign(defaultConfig, customConfig)
const srcDir = path.resolve(rootDir, './src')
const mockDir = path.resolve(rootDir, './mock')
const pageDir = path.resolve(srcDir, './page')
const staticDir = path.resolve(srcDir, './static')
const distDir = path.resolve(rootDir, config.output)

module.exports = {
  rootDir,
  distDir,
  srcDir,
  pageDir,
  mockDir,
  staticDir,
  config,
  customWebpackPath
}
