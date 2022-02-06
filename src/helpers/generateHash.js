function generateHash(complexity, counter = 0, string = '') {
    if (complexity === counter) return string.replace(/\./g, '').substring(1)
    else
        return generateHash(
            complexity,
            ++counter,
            (string += Math.random().toString(36))
        )
}

module.exports = { generateHash }
