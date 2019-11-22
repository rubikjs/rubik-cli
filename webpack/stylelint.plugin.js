const { stylelint } = require('../lib/utils')
const pluginName = 'StylelintWebpackPlugin'
async function lint (compilation, callback) {
  const result = await stylelint({
    fix: true
  })
  callback()
  compilation.hooks.afterCompile.tapAsync(pluginName, (compilation, next) => {
    if (result && result.errored) {
      compilation.errors.push(new Error(result.output))
    }
    next()
  })
}
class StylelintWebpackPlugin {
  apply (compiler) {
    compiler.hooks.run.tapAsync(pluginName, (compilation, callback) => {
      return lint(compilation, callback)
    })
    compiler.hooks.watchRun.tapAsync(pluginName, (compilation, callback) => {
      return lint(compilation, callback)
    })
  }
}

module.exports = StylelintWebpackPlugin
