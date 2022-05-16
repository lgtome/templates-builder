const { Logger } = require('../services/Logger')
const { getConfig } = require('../utils/config')

function checkConfiguration() {
    const { adjustVars, entry, extension } = getConfig()

    if (!adjustVars) {
        Logger.notProvided('adjustVars')
        return process.exit(1)
    }
    if (!entry) {
        Logger.notProvided('entry')
        return process.exit(1)
    }
    if (!extension) {
        Logger.notProvided('extension')
        return process.exit(1)
    }
}

module.exports = { checkConfiguration }
