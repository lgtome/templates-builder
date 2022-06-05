const { Logger } = require('../services/Logger')

function applyMiddlewares(...args) {
    return (...middlewares) => {
        if (middlewares.length <= 0) {
            Logger.message(
                'middlewares',
                'not provided, returns default args...'
            )
            return args.flat(1)
        }
        return middlewares.flatMap((middleware) => middleware(...args))
    }
}

module.exports = { applyMiddlewares }
