const assert = require('assert')
const useFolders = require('../src/helpers/useFolders')
const config = require('../src/utils/config')
const sinon = require('sinon')
const mockFs = require('mock-fs')
const path = require('path')
const fs = require('fs')

let mockConfig, logStub
const availableFolders = ['random', 'folder', 'test', 'folders']
beforeEach(() => {
    logStub = sinon.stub(console, 'log')
    mockConfig = sinon.mock(config)
    mockFs({
        testDirectory: {
            testFolder: {},
            wrongFolder: {
                wrongSubFolder: 'index.js',
            },
        },
    })
})

afterEach(() => {
    mockConfig.restore()
    mockFs.restore()
    logStub.restore()
})
describe('useFolders test suite', () => {
    it('useFolder should return splitted by / value', () => {
        const path = 'my/path'
        const splittedPath = useFolders.getFolders(path)

        assert.deepEqual(splittedPath, ['my', 'path'])
    })
    it('Append appendFolders should create folders from config folders array', async () => {
        mockConfig
            .expects('getConfig')
            .withArgs()
            .returns({ folders: availableFolders })
        const entryPath = path.resolve(
            process.cwd(),
            'testDirectory',
            'testFolder'
        )
        await useFolders.appendFolders(entryPath)
        const foldersList = fs.readdirSync(entryPath)
        assert.deepEqual(foldersList.sort(), availableFolders.sort())
    })
    it('Append appendFolders should print error to console', async () => {
        mockConfig
            .expects('getConfig')
            .withArgs()
            .returns({ folders: 'wrongValue' })
        const entryPath = path.resolve(
            process.cwd(),
            'testDirectory',
            'testFolder'
        )
        await useFolders.appendFolders(entryPath)

        assert.equal(logStub.calledOnce, true)
    })
    it('Append appendFolders should print error to console if wrong path provided', async () => {
        mockConfig
            .expects('getConfig')
            .withArgs()
            .returns({ folders: ['wrongSubFolder'] })
        const entryPath = path.resolve(
            process.cwd(),
            'testDirectory',
            'wrongFolder123'
        )
        try {
            await useFolders.appendFolders(entryPath)
        } catch {}

        assert.equal(logStub.calledOnce, true)
    })
})
