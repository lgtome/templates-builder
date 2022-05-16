const sinon = require('sinon')
const { Logger } = require('../src/services/Logger')
const assert = require('assert')

let logStub
beforeEach(() => {
    logStub = sinon.stub(console, 'log')
})
afterEach(() => {
    logStub.restore()
})
describe('Logger', () => {
    it('console.log should work if function was called', () => {
        Logger.notProvided()
        assert.equal(logStub.calledOnce, true)
        Logger.message('test', 'test')
        assert.equal(logStub.calledTwice, true)
        Logger.wrongValue('test', 'test')
        assert.equal(logStub.calledThrice, true)
    })
    it('console.log should not called if function not used', () => {
        assert.equal(logStub.calledOnce, false)
    })
})
