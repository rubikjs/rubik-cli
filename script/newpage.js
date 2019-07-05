const fs = require('fs')
const path = require('path')
const { log } = require('./utils')
const shell = require('shelljs')

let srcRoot = path.join(process.cwd(), './src')
let pageRoot = path.join(srcRoot, './page')
let page = process.argv.slice(2)[0]
if (!page) {
  log.error('请输入页面名称 $ npm run new pageName')
  shell.exit(1)
}
let dir = path.join(pageRoot, page)
if (fs.existsSync(dir)) {
  log.error(`已存在页面${page}`)
  shell.exit(1)
}
let html = `<!doctype html>
<html>
<head>
  <title>Hello</title>
</head>
<body>
</body>
</html>
  `
fs.mkdirSync(dir)
fs.writeFileSync(path.join(dir, 'index.js'), '')
fs.writeFileSync(path.join(dir, 'index.html'), html)
log.info(`成功创建页面${page}，请重启服务查看`)
