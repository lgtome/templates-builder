const { Logger } = require('../services/Logger')
const externalConfig = require('../utils/config')

function checkConfiguration() {
  const config = externalConfig.getConfig()
  const {
    adjustVars,
    entry,
    extension,
    transformType,
    framework,
    fileNameSeparator,
    folders,
    reExport,
    templates,
    middlewares,
  } = config

  if (!adjustVars) {
    Logger.notProvided('adjustVars')
    return process.exit(1)
  }
  if (!entry) {
    Logger.notProvided('entry')
    return process.exit(1)
  }
  if (!extension) {
    Logger.notProvided('extension')
    return process.exit(1)
  }
  if (!Array.isArray(adjustVars)) {
    Logger.wrongValue(adjustVars, Array)
  }
  if (typeof entry !== 'string') {
    Logger.wrongValue(entry, String)
  }
  if (typeof transformType !== 'string') {
    Logger.wrongValue(transformType, String)
  }
  if (typeof extension !== 'string') {
    Logger.wrongValue(extension, String)
  }
  if (typeof framework !== 'string') {
    Logger.wrongValue(framework, String)
  }
  if (!Array.isArray(folders)) {
    Logger.wrongValue(folders, Array)
  }
  if (typeof fileNameSeparator !== 'string') {
    Logger.wrongValue(fileNameSeparator, String)
  }
  if (typeof reExport !== 'boolean') {
    Logger.wrongValue(reExport, Boolean)
  }
  if (typeof templates !== 'object') {
    Logger.wrongValue(templates, Object)
  }
  if (!Array.isArray(middlewares)) {
    Logger.wrongValue(middlewares, Array)
  }
  const configKeys = Object.keys(config)
  const initialConfigKeys = externalConfig.getInitialConfigKeys()
  const diff = configKeys.filter((key) => !initialConfigKeys.includes(key))
  for (let key of diff) {
    Logger.message(key, 'not available')
  }
}

module.exports = { checkConfiguration }
