const fs = require('fs')
const { log } = require('./utils')
const {srcDir, mockDir, pageDir} = require('../config')

exports.checkDir = function () {
  if (!fs.existsSync(srcDir)) {
    log.error('Need src directory.')
    return false
  }
  if (!fs.existsSync(mockDir)) {
    log.error('Need mock router.')
    return false
  }
  if (!fs.existsSync(pageDir)) {
    log.error('Need page directory in src.')
    return false
  }
  return true
}
