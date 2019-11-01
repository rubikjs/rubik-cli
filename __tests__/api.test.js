const { Command, RubikCommand, utils } = require('../api')
describe('Api class', () => {
  it('Command class is defined', () => {
    expect(Command).toBeDefined()
  })
  it('RubikCommand class is defined', () => {
    expect(RubikCommand).toBeDefined()
  })
})

describe('Api utils', () => {
  const { checkDir } = utils
  it('checkDir method is defined', () => {
    expect(checkDir).toBeDefined()
  })
})
