const { promises } = require('fs')
const { Logger } = require('../services/Logger')
const { getConfig } = require('../utils/config')

function getFolders(path) {
    return path.split('/')
}
async function appendFolders(path) {
    const { folders } = getConfig()
    for (const folder of folders) {
        try {
            await promises.mkdir(`${path}/${folder}`)
        } catch {
            Logger.warning(`folder: ${folder} already exist!`)
        }
    }
}
module.exports = { getFolders, appendFolders }
