const { stylelint } = require('../lib/utils')
const pluginName = 'StylelintWebpackPlugin'
let errorOutput = ''
async function lint (compilation, callback) {
  const result = await stylelint({
    fix: true
  })
  if (result && result.errored) {
    errorOutput = result.output
  } else {
    errorOutput = ''
  }
  callback()
}
class StylelintWebpackPlugin {
  apply (compiler) {
    compiler.hooks.run.tapAsync(pluginName, (compilation, callback) => {
      return lint(compilation, callback)
    })
    compiler.hooks.watchRun.tapAsync(pluginName, (compilation, callback) => {
      return lint(compilation, callback)
    })
    compiler.hooks.afterCompile.tapAsync(pluginName, (compilation, next) => {
      if (errorOutput) {
        compilation.errors.push(new Error(errorOutput))
      }
      next()
    })
  }
}

module.exports = StylelintWebpackPlugin
