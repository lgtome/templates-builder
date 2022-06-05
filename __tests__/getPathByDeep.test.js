const assert = require('assert')
const { getPathByDeep } = require('../src/helpers/getPathByDeep')

describe('getPathByDeep test suite', () => {
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
