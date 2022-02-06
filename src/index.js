const { resolve, join } = require('path')
const fs = require('fs')
const { appendItems } = require('./helpers/useFiles')
const createCorrectPath = require('./helpers/usePath')
const { getFolders } = require('./helpers/useFolders')
const PATH_EXTERNAL = process.argv.slice(2)[0] || 's'
const PATH_ABSOLUTE = resolve(__dirname)
const executePath = resolve(createCorrectPath(PATH_ABSOLUTE), PATH_EXTERNAL)
console.log(executePath, 'path')
// console.log(process, process.argv, 'args')
async function build(config) {
    console.log(config)
    let tempPath = createCorrectPath(PATH_ABSOLUTE)
    for (const current of getFolders(PATH_EXTERNAL)) {
        tempPath = resolve(tempPath, current)
        try {
            await fs.promises.mkdir(tempPath)
            console.log(`File ${current} was created`)
            if (tempPath === executePath) {
                console.log('fine!')
                appendItems(tempPath, current)
            }
        } catch (err) {
            console.log(err, '!!!!!')
            console.log(`File ${current} already exists`)
        }
    }
}
// build()

module.exports = { build }
