const path = require('path')
const configPath = path.relative(process.cwd(), path.resolve(__dirname, '../node_modules/@commitlint/config-conventional'))
module.exports = { extends: [configPath] }
