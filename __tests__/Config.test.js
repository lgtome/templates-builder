const assert = require('assert')
const config = require('../src/utils/config')
const {
    getConfig,
    getExternalPath,
    getFileTypes,
    getUniqueVars,
    initializedConfig,
    modifyConfig,
} = config
const sinon = require('sinon')

const DEFAULT_CONFIG = {
    adjustVars: ['index', 'props', 'styles', 'stories'],
    entry: 'src',
    transformType: 'kebab',
    extension: 'js',
    framework: 'vue',
    folders: ['components', 'services', 'helpers', 'graphql', '__tests__'],
    templatesFolder: false,
    fileNameSeparator: '.',
    reExport: true,
}

describe('Config', () => {
    it('getConfig should return all configuration', () => {
        const config = getConfig()

        assert.deepEqual(DEFAULT_CONFIG, config)
    })
    it.skip('getExternalPath should return value if argv provided', () => {
        const path = config.getExternalPath()
        assert.equal(path, '__tests__')
    })
})
