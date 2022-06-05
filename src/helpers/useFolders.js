const { promises } = require('fs')
const { Logger } = require('../services/Logger')
const config = require('../utils/config')

function getFolders(path) {
  return path.split('/')
}

async function appendFolders(path) {
  const { folders } = config.getConfig()
  if (!Array.isArray(folders)) {
    Logger.wrongValue(folders, Array)
  }
  for (const folder of folders) {
    try {
      await promises.mkdir(`${path}/${folder}`)
    } catch (e) {
      Logger.warning(`folder: ${folder} already exist!`)
    }
  }
}
module.exports = { getFolders, appendFolders }
