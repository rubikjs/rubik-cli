const fs = require('fs')
const path = require('path')
const buildConfig = require('./build')

let srcRoot = path.join(process.cwd(), './src')
let pageRoot = path.join(srcRoot, './page')

let pages = fs.readdirSync(pageRoot)

function isIncludePage(pageName){
  if(!buildConfig.includePage || !buildConfig.includePage.length){
    return true
  }
  return buildConfig.includePage.includes(pageName)
}

function getValidPages(){
  return pages.filter((v) => {
    if(!isIncludePage(v)){
      return false
    }
    let stat = fs.statSync(path.join(pageRoot, v))
    return stat.isDirectory()
  })
}

pages = getValidPages()

module.exports = pages
