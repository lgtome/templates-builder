const fs = require('fs')
const { resolve, join } = require('path')
const { appendItems } = require('./helpers/useFiles')
const createCorrectPath = require('./helpers/usePath')
const { getFolders, appendFolders } = require('./helpers/useFolders')
const { EXTERNAL_PATH, INNER_CONFIG } = require('./utils/templates')
const ABSOLUTE_PATH = resolve(__dirname)

async function build(config = INNER_CONFIG) {
    const { entry } = config || {}

    const ABSOLUTE_PATH_FROM_ENTRY = entry
        ? resolve(ABSOLUTE_PATH, entry)
        : ABSOLUTE_PATH

    const executePath = resolve(
        createCorrectPath(ABSOLUTE_PATH_FROM_ENTRY),
        EXTERNAL_PATH
    )

    let tempPath = createCorrectPath(ABSOLUTE_PATH_FROM_ENTRY)

    for (const current of getFolders(EXTERNAL_PATH)) {
        tempPath = resolve(tempPath, current)

        try {
            await fs.promises.mkdir(tempPath)

            if (tempPath === executePath) {
                appendItems(tempPath, current, config)
                appendFolders(tempPath, current, config)
            }
        } catch (err) {}
    }
}

module.exports = { build }
