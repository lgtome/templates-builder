const assert = require('assert')
const config = require('../src/utils/config')
const sinon = require('sinon')

const DEFAULT_CONFIG = {
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

describe('Config', () => {
    it('getConfig should return all configuration', () => {
        const cfg = config.getConfig()

        assert.deepEqual(DEFAULT_CONFIG, cfg) //?
    })
    it.skip('getExternalPath should return value if argv provided', () => {
        const path = config.getExternalPath()
        assert.equal(path, '__tests__')
    })
})
