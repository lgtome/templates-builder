const { promises } = require('fs')
function getFolders(path) {
    return path.split('/')
}
async function appendFolders(path, lastElement, config = {}) {
    // console.log(config, 'useFolders')
    const { folders } = config
    for (const folder of folders) {
        console.log(path)
        await promises.mkdir(`${path}/${folder}`)
    }
}
module.exports = { getFolders, appendFolders }
