function generateHash(complexity, precision = 4, string = '') {
    if (complexity === 0) return string.replace(/\./g, '')
    else
        return generateHash(
            --complexity,
            precision,
            (string += Math.random()
                .toFixed(precision)
                .toString(36)
                .substring(1))
        )
}

module.exports = { generateHash }
