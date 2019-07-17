const fs = require('fs')
const path = require('path')
const buildConfig = require('../config')
const { pageDir } = require('./directory')

let pages = fs.readdirSync(pageDir)

function isIncludePage (pageName) {
  if (!buildConfig.includePage || !buildConfig.includePage.length) {
    return true
  }
  return buildConfig.includePage.includes(pageName)
}

function getValidPages () {
  return pages.filter((v) => {
    if (!isIncludePage(v)) {
      return false
    }
    let stat = fs.statSync(path.join(pageDir, v))
    return stat.isDirectory()
  })
}

pages = getValidPages()

module.exports = pages
