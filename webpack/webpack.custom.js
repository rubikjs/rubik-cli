const fs = require('fs')
const { customWebpackPath } = require('../config')
module.exports = fs.existsSync(customWebpackPath) ? require(customWebpackPath) : {}
