function generateHash(complexity, counter = 0, string = '') {
    if (complexity === counter) return string.replace(/\./g, '').substring(1)
    else
        return generateHash(
            complexity,
            ++counter,
            (string += Math.random().toString(36))
        )
}

// function generateHash(complexity) {
//     const complexityRatio = 4
//     const step = complexity % complexityRatio
//     let result = ''
//     if (step === 0) {
//         for (let i = 0; i < complexity / 2; i++) {
//             result += Math.random().toString(36)
//         }
//     }
//     if (complexity / complexityRatio > 1) {
//         for (let i = 0; i < step * (complexity / complexityRatio); i++) {
//             result += Math.random().toString(36)
//         }
//     }
//     result = result.replace(/\./g, '').substring(1)
//     return result ? result : Math.random().toString(36).substring(2)
// }

console.log(generateHash(4))

module.exports = { generateHash }
