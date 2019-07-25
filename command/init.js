'use strict'

const Command = require('common-bin')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const shell = require('shelljs')
const { rootDir } = require('../config')
const { log } = require('../lib/utils')
const rep = {
  pure: 'fancyboynet/rubik-pure-scaffold',
  vue: 'fancyboynet/rubik-vue-scaffold',
  react: 'fancyboynet/rubik-react-scaffold',
  library: 'fancyboynet/rubik-library-scaffold'
}

class NewPageCommand extends Command {
  async run () {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'type',
          message: 'Choose the type.',
          choices: [
            'pure',
            'vue',
            'react',
            'library'
          ]
        }
      ])
      .then(answers => {
        this.download(answers.type)
      })
  }

  get description () {
    return 'Init the scaffold.'
  }

  download (type) {
    const url = rep[type]
    download(url, rootDir, {}, (err) => {
      if (err) {
        log.error(err.message)
        return
      }
      log.info('Download completed.')
      this.toInstallPkg()
    })
  }

  toInstallPkg () {
    inquirer
      .prompt([
        {
          type: 'confirm',
          name: 'toInstall',
          message: 'Do you want to run \'yarn install\' now?',
          default: true
        }
      ])
      .then(answers => {
        if (answers.toInstall) {
          shell.exec('yarn')
        }
      })
  }
}

module.exports = NewPageCommand
