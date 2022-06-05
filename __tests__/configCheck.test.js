const assert = require('assert')
const { checkConfiguration } = require('../src/helpers/configCheck')
const config = require('../src/utils/config')
const sinon = require('sinon')
const Logger = require('../src/services/Logger')

let configMock, logStub, exitStub
beforeEach(() => {
    configMock = sinon.mock(config)
    logStub = sinon.stub(console, 'log')
    exitStub = sinon.mock(process)
})
afterEach(() => {
    configMock.restore()
    logStub.restore()
    exitStub.restore()
})

describe('configCheck test suite', () => {
    const defaultConfig = {
        adjustVars: ['index', 'props', 'styles', 'stories'],
        entry: 'src',
        transformType: 'kebab',
        extension: 'js',
        framework: 'vue',
        folders: ['components', 'services', 'helpers', 'graphql', '__tests__'],
        fileNameSeparator: '.',
        reExport: true,
        templates: {},
    }
    it('adjustVars should be provided', () => {
        configMock
            .expects('getConfig')
            .withArgs()
            .returns({ ...defaultConfig, adjustVars: null })
        const expectation = exitStub.expects('exit').withArgs().returns(1)
        checkConfiguration()

        assert.equal(logStub.calledOnce, true)
        assert.ok(expectation.exactly(1))
    })
    it('entry should be provided', () => {
        configMock
            .expects('getConfig')
            .withArgs()
            .returns({ ...defaultConfig, entry: null })
        const expectation = exitStub.expects('exit').withArgs().returns(1)
        checkConfiguration()

        assert.equal(logStub.calledOnce, true)
        assert.ok(expectation.exactly(1))
    })
    it('extension should be provided', () => {
        configMock
            .expects('getConfig')
            .withArgs()
            .returns({ ...defaultConfig, extension: null })
        const expectation = exitStub.expects('exit').withArgs().returns(1)
        checkConfiguration()

        assert.equal(logStub.calledOnce, true)
        assert.ok(expectation.exactly(1))
    })
    it('If all required arguments provided exit and logs not called', () => {
        configMock
            .expects('getConfig')
            .withArgs()
            .returns({ extension: 'js', entry: 'src', adjustVars: ['index'] })
        const expectation = exitStub.expects('exit').withArgs().returns(1)
        checkConfiguration()

        assert.equal(logStub.calledOnce, false)
        assert.throws(() => expectation.verify())
    })
    it('adjustVars wrong value should cause log', () => {
        configMock
            .expects('getConfig')
            .withArgs()
            .returns({ ...defaultConfig, adjustVars: 'index' })

        checkConfiguration()

        assert.equal(logStub.calledOnce, true)
    })
    it('entry wrong value should cause log', () => {
        configMock
            .expects('getConfig')
            .withArgs()
            .returns({ ...defaultConfig, entry: ['index'] })

        checkConfiguration()

        assert.equal(logStub.calledOnce, true)
    })
    it('transformType wrong value should cause log', () => {
        configMock
            .expects('getConfig')
            .withArgs()
            .returns({ ...defaultConfig, transformType: ['kebab'] })

        checkConfiguration()

        assert.equal(logStub.calledOnce, true)
    })
    it('extension wrong value should cause log', () => {
        configMock
            .expects('getConfig')
            .withArgs()
            .returns({ ...defaultConfig, extension: ['js'] })

        checkConfiguration()

        assert.equal(logStub.calledOnce, true)
    })
    it('framework wrong value should cause log', () => {
        configMock
            .expects('getConfig')
            .withArgs()
            .returns({ ...defaultConfig, framework: ['react'] })

        checkConfiguration()

        assert.equal(logStub.calledOnce, true)
    })
    it('folders wrong value should cause log', () => {
        configMock
            .expects('getConfig')
            .withArgs()
            .returns({ ...defaultConfig, folders: 'index' })

        checkConfiguration()

        assert.equal(logStub.calledOnce, true)
    })
    it('fileNameSeparator wrong value should cause log', () => {
        configMock
            .expects('getConfig')
            .withArgs()
            .returns({ ...defaultConfig, fileNameSeparator: ['.'] })

        checkConfiguration()

        assert.equal(logStub.calledOnce, true)
    })
    it('reExport wrong value should cause log', () => {
        configMock
            .expects('getConfig')
            .withArgs()
            .returns({ ...defaultConfig, reExport: 'true' })

        checkConfiguration()

        assert.equal(logStub.calledOnce, true)
    })
    it('templates wrong value should cause log', () => {
        configMock
            .expects('getConfig')
            .withArgs()
            .returns({ ...defaultConfig, templates: Array })

        checkConfiguration()

        assert.equal(logStub.calledOnce, true)
    })
})
