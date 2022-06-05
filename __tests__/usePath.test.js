const assert = require('assert')
const usePath = require('../src/helpers/usePath')

describe('Use path test suite', () => {
  it('usePath should return path if found value not included', () => {
    const path = './my/test/'
    const result = usePath(path)

    assert.equal(result, path)
  })
  it('usePath should return correct path if last element not /', () => {
    const path = './my/test'
    const result = usePath(path)

    assert.equal(result, path + '/')
  })
  it('usePath should return correct path if it is a node modules directory', () => {
    const path = './my/test/'
    const pathToNodeModules = path + 'node_modules'
    const result = usePath(pathToNodeModules)

    assert.equal(result, path)
  })
})
