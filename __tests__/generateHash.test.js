const { generateHash } = require('../src/helpers/generateHash')
const assert = require('assert')
describe('generateHash test suite', () => {
  it('hash with complexity 1 should returns correct hash value with default precision', () => {
    const hash = generateHash(1)

    assert.equal(hash.length, 4)
  })
  it('hash with complexity 4 should returns correct hash value with default precision', () => {
    const hash = generateHash(4)

    assert.equal(hash.length, 16)
  })

  it('hash with complexity 1 should returns correct hash value with custom precision', () => {
    const hash = generateHash(1, 2)

    assert.equal(hash.length, 2)
  })
  it('hash with complexity 4 should returns correct hash value with custom precision', () => {
    const hash = generateHash(6, 2)

    assert.equal(hash.length, 12)
  })
})
