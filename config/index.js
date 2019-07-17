const path = require('path')
const fs = require('fs')
const defaultConfig = require('./default')
const customPath = path.join(process.cwd(), './rubik.config.js')
let customConfig = {}
if (fs.existsSync(customPath)) {
  customConfig = require(customPath)
}
module.exports = Object.assign(defaultConfig, customConfig)
