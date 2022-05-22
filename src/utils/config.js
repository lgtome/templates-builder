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
        adjustVars: ['index', 'props', 'styles', 'stories'],
        entry: 'src',
        transformType: 'kebab',
        extension: 'js',
        framework: 'vue',
        folders: ['components', 'services', 'helpers', 'graphql', '__tests__'],
        templatesFolder: false,
        fileNameSeparator: '.',
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

const initializedConfig = InitializeConfig()

module.exports = { ...initializedConfig, initializedConfig }
