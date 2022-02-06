function kebabCaseTransform(filename = '') {
    const regex = /[A-Z]/g
    return filename.replace(
        regex,
        (element, index) => (index ? '-' : '') + element.toLowerCase()
    )
}

function snakeCaseTransform(filename = '') {
    const regex = /[A-Z]/g
    return filename.replace(
        regex,
        (element, index) => (index ? '_' : '') + element.toLowerCase()
    )
}

function pascalCaseTransform(filename = '') {
    const regex = /^[a-z]/g
    return filename.replace(regex, (element, index) => element.toUpperCase())
}

module.exports = { kebabCaseTransform, pascalCaseTransform, snakeCaseTransform }
