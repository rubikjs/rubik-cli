const { Command, BaseCommand, utils } = require('../api')
describe('Api class', () => {
  it('Command class is defined', () => {
    expect(Command).toBeDefined()
  })
  it('BaseCommand class is defined', () => {
    expect(BaseCommand).toBeDefined()
  })
})

describe('Api utils', () => {
  const { checkDir } = utils
  it('checkDir method is defined', () => {
    expect(checkDir).toBeDefined()
  })
})
