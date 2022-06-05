const assert = require('assert')
const { applyMiddlewares } = require('../src/middlewares/applyMiddlewares')
const { VueMiddleware } = require('../src/middlewares/VueMiddleware')
const sinon = require('sinon')
const initializedConfig = require('../src/utils/config')

describe('Middlewares test suite', () => {
  let logStub, configStub
  beforeEach(() => {
    logStub = sinon.stub(console, 'log')
    configStub = sinon.mock(initializedConfig)
  })
  afterEach(async () => {
    logStub.restore()
    configStub.restore()
  })
  it('Apply middleware return arguments if middlewares not provided', () => {
    const args = ['test', 'arguments']
    const appliedMiddlewares = applyMiddlewares(args)()
    assert.deepEqual(appliedMiddlewares, args)
    assert.ok(logStub.calledOnce)
  })
  it('Apply middleware return correct arguments if Vue middleware provided', () => {
    configStub.expects('getConfig').withArgs().returns({ framework: 'vue' })
    const args = [{ type: 'test', file: 'file.js' }]
    const appliedMiddlewares = applyMiddlewares(args)(VueMiddleware)

    assert.equal(appliedMiddlewares.length, 1)
    assert.deepEqual(appliedMiddlewares[0], {
      ...args[0],
      file: 'file.vue',
    })
  })
  it('Apply middleware should return arguments if incorrect framework provided', () => {
    configStub.expects('getConfig').withArgs().returns({ framework: 'angular' })
    const args = [{ type: 'test', file: 'file.js' }]
    const appliedMiddlewares = applyMiddlewares(args)(VueMiddleware)

    assert.equal(appliedMiddlewares.length, 1)
    assert.deepEqual(appliedMiddlewares, args)
  })
  it('Vue middleware should return arguments if incorrect arguments type provided', () => {
    configStub.expects('getConfig').withArgs().returns({ framework: 'vue' })
    const args = { test: { type: 'test', file: 'file.js' } }
    const appliedMiddlewares = applyMiddlewares(args)(VueMiddleware)

    assert.equal(appliedMiddlewares.length, 1)
    assert.deepEqual(appliedMiddlewares, [args])
    assert.equal(logStub.calledOnce, 1)
  })
  it('Vue middleware should return not modified file, if index is match', () => {
    configStub.expects('getConfig').withArgs().returns({ framework: 'vue' })
    configStub.expects('getUniqueVars').withArgs().returns({ index: 'test' })
    const args = [{ type: 'test', file: 'file.js' }]
    const appliedMiddlewares = applyMiddlewares(args)(VueMiddleware)

    assert.equal(appliedMiddlewares.length, 1)
    assert.deepEqual(appliedMiddlewares, args)
  })
})
