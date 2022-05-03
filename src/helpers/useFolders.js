const { promises } = require('fs')

function getFolders(path) {
    return path.split('/')
}
async function appendFolders(path, lastElement, config = {}) {
    const { folders } = config
    for (const folder of folders) {
        await promises.mkdir(`${path}/${folder}`)
    }
}
module.exports = { getFolders, appendFolders }
