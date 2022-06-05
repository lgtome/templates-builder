const fs = require('fs')
const config = require('../utils/config')
const { resolve } = require('path')
const { getCorrectTransformType } = require('./useTransform')
const { applyMiddlewares } = require('../middlewares/applyMiddlewares')
const { TemplateBuilder } = require('../services/TemplateBuilder')

const { Logger } = require('../services/Logger')

async function appendItems(path, lastElement, middlewares = []) {
  if (!Array.isArray(middlewares)) {
    Logger.wrongValue('middlewares', Array)
    return process.exit(1)
  }
  const Builder = new TemplateBuilder()
  const { transformType, extension } = config.getConfig()
  const transform = getCorrectTransformType(transformType)
  const files = constructFiles(transform(lastElement))
  const transformedFiles = applyMiddlewares(files)(...middlewares)

  for (const { file, type, relation } of transformedFiles) {
    const elementPath = resolve(path, file)
    await fs.promises
      .writeFile(elementPath, ``)
      .then(() => {
        fs.promises.appendFile(
          elementPath,
          Builder.build({ file, extension, type, relation })
        )
      })
      .catch(Logger.warning)
  }
}

function constructFiles(filename) {
  const { extension, reExport, fileNameSeparator = '.' } = config.getConfig()
  const fileTypes = config.getFileTypes()
  const acceptedTypes = fileTypes
  return acceptedTypes.flatMap((type) => {
    if (type === 'index') {
      return reExport
        ? [
            {
              file: `${type}${fileNameSeparator}${extension}`,
              type: config.getUniqueVars().index,
              relation: filename,
            },
            {
              file: `${filename}.${extension}`,
              type: config.getUniqueVars().main,
            },
          ]
        : { file: `${type}${fileNameSeparator}${extension}`, type }
    }
    return {
      file: `${filename}${fileNameSeparator}${type}${fileNameSeparator}${extension}`,
      type,
    }
  })
}

module.exports = { appendItems }
