const { changeExtensionTransform } = require('../helpers/useTransform')
const { Logger } = require('../services/Logger')
const config = require('../utils/config')

function VueMiddleware(files) {
  const { framework } = config.getConfig()
  const { index } = config.getUniqueVars()

  if (framework !== 'vue') {
    return files
  }

  if (!Array.isArray(files)) {
    Logger.wrongValue('files', Array)
    return files
  }

  return files.map((fileObject) => {
    if (fileObject.type === index) {
      return fileObject
    }
    return {
      ...fileObject,
      file: changeExtensionTransform(fileObject.file, 'vue'),
    }
  })
}

module.exports = { VueMiddleware }
