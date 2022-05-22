const { changeExtensionTransform } = require('../helpers/useTransform')
const { Logger } = require('../services/Logger')
const { getConfig, getUniqueVars } = require('../utils/config')

function VueMiddleware(files) {
    const { framework } = getConfig()
    const { index, main } = getUniqueVars()

    if (framework !== 'vue') {
        return files
    }

    if (!Array.isArray(files)) {
        Logger.wrongValue('files', Array)
        return files
    }

    return files.map((fileObject) => {
        console.log(fileObject, 'fileObject')
        if (fileObject.type === index) {
            return fileObject
        }
        return {
            ...fileObject,
            file: changeExtensionTransform(fileObject.file, 'vue'),
            type: main,
        }
    })
}

module.exports = { VueMiddleware }
