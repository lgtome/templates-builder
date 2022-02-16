// const FILES_EXTENSIONS = ['.props.ts', '.presets.tsx', 'index.tsx']
const FILE_TYPES = ['props', 'presets', 'index']
const INNER_CONFIG = {
    adjustVars: FILE_TYPES,
    entry: 'src',
    transform: 'camel',
    extensions: ['js', 'jsx'],
    templatesFolder: false,
}
const EXTERNAL_PATH = process.argv.slice(2)[0]
module.exports = { FILE_TYPES, EXTERNAL_PATH, INNER_CONFIG }
