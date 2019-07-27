'use strict'

const TakeVersionCommand = require('../lib/take-version-command')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const shell = require('shelljs')
const { rootDir } = require('../config')
const { log } = require('../lib/utils')
const rep = {
  pure: 'rubikjs/rubik-pure-scaffold',
  vue: 'rubikjs/rubik-vue-scaffold',
  react: 'rubikjs/rubik-react-scaffold',
  library: 'rubikjs/rubik-library-scaffold'
}

class InitCommand extends TakeVersionCommand {
  constructor (rawArgv) {
    super(rawArgv)
  }

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
          type: 'list',
          name: 'type',
          message: 'Choose the package management type to install the dependencies',
          choices: [
            'npm',
            'yarn',
            'cancel(install manually)'
          ],
          default: 'yarn'
        }
      ])
      .then(answers => {
        switch (answers.type) {
          case 'yarn':
            shell.exec('yarn')
            break
          case 'npm':
            shell.exec('npm i')
            break
          default:
            break
        }
      })
  }
}

module.exports = InitCommand
