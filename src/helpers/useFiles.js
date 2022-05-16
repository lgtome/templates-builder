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
const { builder } = require('../services/TemplateBuilder')

const { Logger } = require('../services/Logger')

async function appendItems(path, lastElement, middlewares = []) {
    if (!Array.isArray(middlewares)) {
        Logger.wrongValue('middlewares', Array)
        return process.exit(1)
    }
    const { transformType, extension } = getConfig()
    const transform = getCorrectTransformType(transformType)
    const files = transformFilenames(transform(lastElement))
    const transformedFiles = applyMiddlewares(files)(...middlewares)
    console.log(files, transformedFiles)

    for (const { file, type, relation } of transformedFiles) {
        console.log(file)
        const elementPath = resolve(path, file)
        console.log(elementPath, '->', file, type)
        await fs.promises.writeFile(elementPath, ``).then(() => {
            fs.promises.appendFile(
                elementPath,
                builder.build({ file, extension, type, relation })
            )
        })
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
