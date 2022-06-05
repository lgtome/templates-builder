const assert = require('assert')
const config = require('../src/utils/config')

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
}

describe('Config', () => {
  it('getConfig should return all configuration', () => {
    const cfg = config.getConfig()

    assert.deepEqual(DEFAULT_CONFIG, cfg)
  })
  it.skip('getExternalPath should return value if argv provided', () => {
    const path = config.getExternalPath()
    assert.equal(path, '__tests__')
  })
})
