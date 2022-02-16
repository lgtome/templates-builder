const fs = require('fs')
const { resolve, join } = require('path')
const { appendItems } = require('./helpers/useFiles')
const createCorrectPath = require('./helpers/usePath')
const { getFolders, appendFolders } = require('./helpers/useFolders')
const { EXTERNAL_PATH, INNER_CONFIG } = require('./utils/templates')
const ABSOLUTE_PATH = resolve(__dirname)
const executePath = resolve(createCorrectPath(ABSOLUTE_PATH), EXTERNAL_PATH)
console.log(executePath, 'path')

async function build(config = INNER_CONFIG) {
    console.log(config, 'CONFIG!')
    let tempPath = createCorrectPath(ABSOLUTE_PATH)
    for (const current of getFolders(EXTERNAL_PATH)) {
        tempPath = resolve(tempPath, current)
        try {
            await fs.promises.mkdir(tempPath)
            console.log(`File ${current} was created`)
            if (tempPath === executePath) {
                appendItems(tempPath, current, config)
                appendFolders(tempPath, current, config)
                console.log('Files appended!')
                console.log('Folders appended!')
            }
        } catch (err) {
            console.log(`File ${current} already exists`)
        }
    }
}

module.exports = { build }
