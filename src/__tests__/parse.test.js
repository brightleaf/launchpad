const path = require('path')
const parser = require('../parse')
describe('The YML Parser Module', () => {
  it('should parse a yml file', () => {
    // do stuff
    const result = parser(path.resolve(__dirname, './config.yml'))

    expect(result.service).toBe('launchpad')
    expect(result).toMatchSnapshot()
  })
})
