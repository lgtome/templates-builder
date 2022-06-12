const assert = require('assert')
const config = require('../src/utils/config')
const sinon = require('sinon')

describe('Config', () => {
  const DEFAULT_CONFIG = {
    adjustVars: ['index'],
    entry: 'src',
    transformType: 'camel',
    extension: 'js',
    framework: 'react',
    fileNameSeparator: '.',
    folders: [],
    reExport: true,
    templates: {},
    middlewares: [],
  }
  const DEFAULT_UNIQUE_VARS = ['index', 'main']
  const FRAMEWORKS = ['react', 'vue', 'angular']
  it('getConfig should return all configuration', () => {
    const cfg = config.getConfig()

    assert.deepEqual(DEFAULT_CONFIG, cfg)
  })

  it('modifyConfig should return modified value', () => {
    const modifiedConfig = config.modifyConfig({ entry: 'notsrc' })
    assert.deepEqual(modifiedConfig, { ...DEFAULT_CONFIG, entry: 'notsrc' })
  })
  it('getFileTypes should return correct value', () => {
    const fileTypes = config.getFileTypes()
    assert.deepEqual(fileTypes, DEFAULT_CONFIG.adjustVars)
  })
  it('getFileTypes should return correct value', () => {
    const framework = config.getCurrentFramework()
    assert.deepEqual(framework.description, DEFAULT_CONFIG.framework)
  })
  it('getUniqueVars should return correct value', () => {
    const uniqueVars = config.getUniqueVars()
    const keys = Object.keys(uniqueVars)
    assert.deepEqual(keys.sort(), DEFAULT_UNIQUE_VARS.sort())
  })
  it('getInitialConfigKeys should return correct value', () => {
    const keys = config.getInitialConfigKeys()

    assert.deepEqual(keys.sort(), Object.keys(DEFAULT_CONFIG).sort())
  })
  it('getFrameworks should return correct value', () => {
    const frameworks = config.getFrameworks()
    const keys = Object.keys(frameworks)
    assert.deepEqual(keys.sort(), FRAMEWORKS.sort())
  })
})
