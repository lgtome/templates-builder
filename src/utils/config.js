const InitializeConfig = () => {
  const key = 'cfg'
  const EXTERNAL_PATH = process.argv.slice(2)[0]

  const UNIQUE_VARS = {
    main: Symbol('main'),
    index: Symbol('index'),
  }
  const FRAMEWORKS = {
    vue: Symbol('vue'),
    react: Symbol('react'),
    angular: Symbol('angular'),
  }

  if (!EXTERNAL_PATH) {
    process.exit(0)
  }
  const initialConfig = {
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

  const config = new Map().set(key, initialConfig)
  return {
    modifyConfig: (options) => {
      config.set(key, { ...config.get(key), ...options })
      return config.get(key)
    },
    getFileTypes: () => {
      const cfg = config.get(key)
      return cfg['adjustVars']
    },
    getCurrentFramework: () => {
      const framework = config.get(key)['framework']
      return FRAMEWORKS[framework]
    },
    getConfig: () => config.get(key),
    getExternalPath: () => EXTERNAL_PATH,
    getUniqueVars: () => UNIQUE_VARS,
    getFrameworks: () => FRAMEWORKS,
    getInitialConfigKeys: () => Object.keys(initialConfig),
  }
}

const config = InitializeConfig()

module.exports = config
