const { Logger } = require('../services/Logger')
const config = require('../utils/config')

function applyMiddlewares(args) {
  return (...middlewares) => {
    if (middlewares.length <= 0) {
      Logger.message('middlewares', 'not provided, returns default args...')
      return args
    }
    const { modifyConfig, ...configWithoutModify } = config
    return middlewares.flat(1).reduceRight((acc, middleware) => {
      return middleware(configWithoutModify)(acc)
    }, args)
  }
}

module.exports = { applyMiddlewares }
