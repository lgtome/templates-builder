const { existsSync } = require('fs')
function TemplateParser(filePath) {
    if (filePath) {
        const templates = existsSync(filePath) && require(filePath)
        console.log('|||', templates, '|||')
    }
}

module.exports = { TemplateParser }
