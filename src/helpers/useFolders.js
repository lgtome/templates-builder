const { promises } = require('fs')
const { getConfig } = require('../utils/config')

function getFolders(path) {
    return path.split('/')
}
async function appendFolders(path) {
    const { folders } = getConfig()
    for (const folder of folders) {
        await promises.mkdir(`${path}/${folder}`)
    }
}
module.exports = { getFolders, appendFolders }
