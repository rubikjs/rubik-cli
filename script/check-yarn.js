const pkg = require('../package.json')
if (process.env.npm_execpath.indexOf('yarn') === -1) {
  console.error(`[${pkg.name}]Please use yarn for installing.`)
  process.exit(1)
}
process.exit(0)
