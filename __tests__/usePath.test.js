const assert = require('assert')
const { createCorrectPath, getPathByDeep } = require('../src/helpers/usePath')

describe('Use path test suite', () => {
  it('usePath should return path if found value not included', () => {
    const path = './my/test/'
    const result = createCorrectPath(path)

    assert.equal(result, path)
  })
  it('usePath should return correct path if last element not /', () => {
    const path = './my/test'
    const result = createCorrectPath(path)

    assert.equal(result, path + '/')
  })
  it('usePath should return correct path if it is a node modules directory', () => {
    const path = './my/test/'
    const pathToNodeModules = path + 'node_modules'
    const result = createCorrectPath(pathToNodeModules)

    assert.equal(result, path)
  })
  it('default deep should equal current directory', () => {
    const result = getPathByDeep()

    assert.equal(result, './')
  })
  it('custom deep should returns correct value', () => {
    const deep = 2
    const result = getPathByDeep(deep)

    assert.equal(result, './../')
  })
})
