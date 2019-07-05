const package = require('../package.json')
if (process.env.npm_execpath.indexOf('yarn') === -1) {
  console.error(`[${package.name}]Please use yarn for installing.`)
  process.exit(1)
}
process.exit(0)
