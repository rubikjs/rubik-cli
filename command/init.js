'use strict'

const Command = require('common-bin')
const inquirer = require('inquirer')
const download = require('download-git-repo')
const { rootDir } = require('../config')
const { log } = require('../lib/utils')
const rep = {
  pure: 'fancyboynet/rubik-pure-scaffold',
  vue: 'fancyboynet/rubik-vue-scaffold'
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
            {
              name: 'react',
              disabled: 'Unavailable at this time'
            }
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
    download(url, rootDir, {}, function (err) {
      if (err) {
        log.error(err.message)
      } else {
        log.info('Init complete.')
      }
    })
  }
}

module.exports = NewPageCommand
