const fs = require('fs')
const path = require('path')
const { config, pageDir } = require('../config')

let pages = fs.readdirSync(pageDir)

function isIncludePage (pageName) {
  if (!config.includePage || !config.includePage.length) {
    return true
  }
  return config.includePage.includes(pageName)
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
