const sinon = require('sinon')
const { Logger } = require('../src/services/Logger')
const assert = require('assert')

describe('Logger', () => {
    let logStub
    beforeEach(() => {
        logStub = sinon.stub(console, 'log')
    })
    afterEach(() => {
        logStub.restore()
    })

    it('[1] console.log should work if function was called', () => {
        Logger.notProvided()
        assert.equal(logStub.calledOnce, true)
        Logger.message('test', 'test')
        assert.equal(logStub.calledTwice, true)
    })
    it('[2] console.log should work if function was called', () => {
        Logger.wrongValue('test', 'test')
        assert.equal(logStub.calledOnce, true)
        Logger.warning('test')
        assert.equal(logStub.calledTwice, true)
    })
    it('console.log should not called if function not used', () => {
        assert.equal(logStub.calledOnce, false)
    })
})
