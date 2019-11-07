const path = require('path')
const fs = require('fs')
const merge = require('webpack-merge')
const pkg = require('../package.json')
const defaultConfig = require('./config')
const defaultEslintConfig = require('./eslint')
const defaultStylelintConfig = require('./stylelint')
const defaultCommitLintConfig = require('./commitlint')
const rootDir = process.cwd()
const customPath = path.resolve(rootDir, './rubik.config.js')
const customWebpackPath = path.resolve(rootDir, './webpack.config.js')
const customEslintPath = path.resolve(rootDir, './.eslintrc.js')
const customStylelintPath = path.resolve(rootDir, './.stylelintrc.js')
const customPkgPath = path.resolve(rootDir, './package.json')
const customCommitLintPath = path.resolve(rootDir, './commitlint.config.js')
const customConfig = fs.existsSync(customPath) ? require(customPath) : {}
const customEslintConfig = fs.existsSync(customEslintPath) ? require(customEslintPath) : {}
const customStylelintConfig = fs.existsSync(customStylelintPath) ? require(customStylelintPath) : {}
const customPkg = fs.existsSync(customPkgPath) ? require(customPkgPath) : {}
const customCommitLintConfig = fs.existsSync(customCommitLintPath) ? require(customCommitLintPath) : {}
const config = merge(defaultConfig, customConfig)
const eslintConfig = merge(defaultEslintConfig, customEslintConfig)
const stylelintConfig = merge(defaultStylelintConfig, customStylelintConfig)
const commitLintConfig = merge(defaultCommitLintConfig, customCommitLintConfig)
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
  pkg,
  rootDir,
  distDir,
  srcDir,
  pageDir,
  mockDir,
  staticDir,
  config,
  customWebpackPath,
  customPkg,
  eslintConfig,
  eslintCLIEngineConfig,
  stylelintConfig,
  commitLintConfig
}
