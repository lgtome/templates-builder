const {
    extensionRegex,
    lowercaseRegex,
    uppercaseRegex,
} = require('../utils/constants')

function kebabCaseTransform(filename = '') {
    return filename.replace(
        uppercaseRegex,
        (element, index) => (index ? '-' : '') + element.toLowerCase()
    )
}

function snakeCaseTransform(filename = '') {
    return filename.replace(
        uppercaseRegex,
        (element, index) => (index ? '_' : '') + element.toLowerCase()
    )
}

function pascalCaseTransform(filename = '') {
    return filename.replace(lowercaseRegex, (element, index) =>
        element.toUpperCase()
    )
}

function camelCaseTransform(filename = '') {
    return filename.replace(uppercaseRegex, (element, index) =>
        index === 0 ? element.toLowerCase() : element
    )
}

function removeSeparatorsTransform(str) {
    const symbolsRegex = /[\-\.\_]/gi
    const symbolsRegexGlobal = /[\w\s\d\S\W\D]/gi
    let separatorIndex = 0
    return str.replace(symbolsRegexGlobal, (word, i) => {
        if (word.match(symbolsRegex)) {
            separatorIndex = i + 1
            return ''
        }
        if (separatorIndex === i) return word.toUpperCase()
        return word
    })
}

function cutExtensionTransform(str) {
    return str.replace(extensionRegex, '')
}

function changeExtensionTransform(str, extension) {
    return str.replace(extensionRegex, () => {
        return `.${extension}`
    })
}

module.exports = {
    kebabCaseTransform,
    pascalCaseTransform,
    snakeCaseTransform,
    camelCaseTransform,
    removeSeparatorsTransform,
    cutExtensionTransform,
    changeExtensionTransform,
}
