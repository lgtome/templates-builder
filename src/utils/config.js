// const FILES_EXTENSIONS = ['.props.ts', '.presets.tsx', 'index.tsx']
const FILE_TYPES = ['props', 'presets', 'index']
const INNER_CONFIG = {
    adjustVars: FILE_TYPES,
    entry: 'src',
    transformType: 'kebab',
    extension: 'js',
    templatesFolder: false,
    folders: ['components'],
}
const EXTERNAL_PATH = process.argv.slice(2)[0]

if (!EXTERNAL_PATH) {
    process.exit(0)
}

module.exports = { FILE_TYPES, EXTERNAL_PATH, INNER_CONFIG }
