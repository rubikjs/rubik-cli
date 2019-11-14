const utils = require('../lib/utils')
describe('utils', () => {
  const { fetchLatestVersion } = utils
  describe('fetchLatestVersion', () => {
    it('return the correct version', () => {
      expect(fetchLatestVersion()).toBeTruthy()
    })
  })
})
