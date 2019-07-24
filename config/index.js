const path = require('path')
const fs = require('fs')
const defaultConfig = require('./default')
const defaultEslintConfig = require('../.eslintrc')
const rootDir = process.cwd()
const customPath = path.resolve(rootDir, './rubik.config.js')
const customWebpackPath = path.resolve(rootDir, './webpack.config.js')
const customEslintPath = path.resolve(rootDir, './.eslintrc.js')
const customConfig = fs.existsSync(customPath) ? require(customPath) : {}
const customEslintConfig = fs.existsSync(customEslintPath) ? require(customEslintPath) : {}
const config = Object.assign(defaultConfig, customConfig)
const eslintConfig = Object.assign(defaultEslintConfig, customEslintConfig)
const srcDir = path.resolve(rootDir, './src')
const mockDir = path.resolve(rootDir, './mock')
const pageDir = path.resolve(srcDir, './page')
const staticDir = path.resolve(srcDir, './static')
const distDir = path.resolve(rootDir, config.output)
const eslintCLIEngineConfig = {
  baseConfig: eslintConfig,
  fix: true,
  extensions: ['.js', '.jsx', '.vue']
}


module.exports = {
  rootDir,
  distDir,
  srcDir,
  pageDir,
  mockDir,
  staticDir,
  config,
  customWebpackPath,
  eslintConfig,
  eslintCLIEngineConfig
}
