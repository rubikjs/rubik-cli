const { stylelint, isValidStylelintFile, debug } = require('../lib/utils')
const { rootDir } = require('../config')
const pluginName = 'StylelintWebpackPlugin'
class StylelintWebpackPlugin {
  constructor () {
    this.errorOutput = ''
    this.startTime = Date.now()
    this.prevTimestamps = {}
    this.isFirstRun = true
    this.lastErrorFiles = []
  }

  apply (compiler) {
    compiler.hooks.watchRun.tapAsync(pluginName, (compilation, callback) => {
      return this.lint(compilation, callback)
    })
    compiler.hooks.afterCompile.tapAsync(pluginName, (compilation, next) => {
      if (this.errorOutput) {
        compilation.errors.push(new Error(this.errorOutput))
      }
      next()
    })
  }

  async lint (compilation, callback) {
    const lintOpt = {
      fix: true
    }
    if (!this.isFirstRun) {
      lintOpt.files = this.getLintFiles(compilation)
      lintOpt.globbyOptions = {
        cwd: rootDir
      }
    }
    this.prevTimestamps = compilation.fileTimestamps
    const result = await stylelint(lintOpt)
    if (result && result.errored) {
      this.errorOutput = result.output
    } else {
      this.errorOutput = ''
    }
    if (result.results) {
      this.updateLastErrorFiles(result.results)
    }
    if (this.isFirstRun) {
      this.isFirstRun = false
    }
    callback()
  }

  getLintFiles (compilation) {
    const changeFiles = this.getValidChangedFiles(compilation)
    const files = this.lastErrorFiles.concat(changeFiles.filter(x => !this.lastErrorFiles.includes(x)))
    debug('lintFiles', files)
    return files
  }

  updateLastErrorFiles (results) {
    const errorFiles = results.filter(x => x.errored).map(x => x.source)
    const successFiles = results.filter(x => !x.errored).map(x => x.source)
    this.lastErrorFiles = this.lastErrorFiles.concat(errorFiles.filter(x => !this.lastErrorFiles.includes(x)))
    this.lastErrorFiles = this.lastErrorFiles.filter(x => !successFiles.includes(x))
  }

  getValidChangedFiles (compilation) {
    const files = []
    if (!compilation.fileTimestamps.size) {
      return files
    }
    for (const [filename, timestamp] of compilation.fileTimestamps.entries()) {
      if (isValidStylelintFile(filename) && this.hasFileChanged(filename, timestamp)) {
        files.push(filename)
      }
    }
    return files
  }

  hasFileChanged (filename, timestamp) {
    const prevTimestamp = this.prevTimestamps.get(filename)
    return (prevTimestamp || this.startTime) < (timestamp || Infinity)
  }
}

module.exports = StylelintWebpackPlugin
