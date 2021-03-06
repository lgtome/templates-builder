const fs = require('fs')
const { resolve } = require('path')
const { appendItems } = require('./helpers/useFiles')
const { createCorrectPath } = require('./helpers/usePath')
const { getFolders, appendFolders } = require('./helpers/useFolders')
const { getExternalPath, modifyConfig } = require('./utils/config')
const { checkConfiguration } = require('./helpers/useConfig')
const { VueMiddleware } = require('./middlewares/VueMiddleware')

const ABSOLUTE_PATH = resolve(process.cwd())

async function build(externalConfig) {
  const config = modifyConfig(externalConfig)

  checkConfiguration()
  const { entry, middlewares } = config

  const externalPath = getExternalPath()
  const ABSOLUTE_PATH_FROM_ENTRY = entry
    ? resolve(ABSOLUTE_PATH, entry)
    : ABSOLUTE_PATH

  const executePath = resolve(
    createCorrectPath(ABSOLUTE_PATH_FROM_ENTRY),
    externalPath
  )

  let tempPath = createCorrectPath(ABSOLUTE_PATH_FROM_ENTRY)

  for (const current of getFolders(externalPath)) {
    tempPath = resolve(tempPath, current)

    try {
      await fs.promises.mkdir(tempPath, { recursive: true })

      if (tempPath === executePath) {
        appendItems(tempPath, current, [VueMiddleware, ...middlewares])
        appendFolders(tempPath)
      }
    } catch (err) {}
  }
}

module.exports = { build }
