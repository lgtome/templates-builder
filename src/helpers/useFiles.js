const fs = require('fs')
const { FILES_EXTENSIONS } = require('../utils/templates')
const { resolve } = require('path')
const { BuildTemplate } = require('../services/TemplateBuilder')
const { kebabCaseTransform } = require('./useTransform')
const builder = new BuildTemplate()

async function appendItems(path, lastElement) {
    const files = transformFilenames(kebabCaseTransform(lastElement))
    for (const currentFile of files) {
        const element = resolve(path, currentFile)
        await fs.promises.writeFile(element, ``).then(() => {
            console.log(lastElement, currentFile)
            fs.promises.appendFile(element, builder.build(lastElement))
        })
    }
}

function transformFilenames(filename) {
    return FILES_EXTENSIONS.map((extension) => {
        if (extension.includes('index')) return extension
        return filename + extension
    })
}

module.exports = { appendItems }
