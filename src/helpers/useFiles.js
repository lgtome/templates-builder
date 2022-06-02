const fs = require('fs')
const {
    initializedConfig,
    getUniqueVars,
    getConfig,
} = require('../utils/config')
const { resolve } = require('path')
const {
    kebabCaseTransform,
    pascalCaseTransform,
    snakeCaseTransform,
    camelCaseTransform,
} = require('./useTransform')
const { applyMiddlewares } = require('../middlewares/applyMiddlewares')
const { TemplateBuilder } = require('../services/TemplateBuilder')

const { Logger } = require('../services/Logger')

async function appendItems(path, lastElement, middlewares = []) {
    if (!Array.isArray(middlewares)) {
        Logger.wrongValue('middlewares', Array)
        return process.exit(1)
    }
    const Builder = new TemplateBuilder()
    const { transformType, extension } = getConfig()
    const transform = getCorrectTransformType(transformType)
    const files = transformFilenames(transform(lastElement))
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

function getCorrectTransformType(type) {
    switch (type) {
        case 'kebab':
            return kebabCaseTransform
        case 'snake':
            return snakeCaseTransform
        case 'pascal':
            return pascalCaseTransform
        default:
            return camelCaseTransform
    }
}

function transformFilenames(filename) {
    const { extension, reExport, fileNameSeparator = '.' } = getConfig()
    const fileTypes = initializedConfig.getFileTypes()
    const acceptedTypes = fileTypes
    return acceptedTypes.flatMap((type) => {
        if (type === 'index') {
            return reExport
                ? [
                      {
                          file: `${type}${fileNameSeparator}${extension}`,
                          type: getUniqueVars().index,
                          relation: filename,
                      },
                      {
                          file: `${filename}.${extension}`,
                          type: getUniqueVars().main,
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
