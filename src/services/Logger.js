class Logger {
    static notProvided(property) {
        console.log(`Config value: ${property} not provided!`)
    }
    static wrongValue(value, type) {
        console.log(
            `Incorrect type, value: _${value}_, expected ${type.name || type}`
        )
    }
    static message(value, msg) {
        console.log(`${value} ${msg}`)
    }
}

module.exports = { Logger }
