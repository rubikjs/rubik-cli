'use strict'

// const path = require('path')
// const rimraf = require('rimraf')
const coffee = require('coffee')
jest.setTimeout(30000)
describe('commands', () => {
  const main = require.resolve('../../bin/main.js')
  const cwd = __dirname
  describe('stylelint', () => {
    it('should get error', done => {
      coffee.fork(main, ['stylelint'], {
        cwd
      })
        .debug()
        .expect('code', 1)
        .end(done)
    })
  })
})
