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
  return filename.replace(lowercaseRegex, (element) => element.toUpperCase())
}

function camelCaseTransform(filename = '') {
  return filename.replace(uppercaseRegex, (element, index) =>
    index === 0 ? element.toLowerCase() : element
  )
}

function removeSeparatorsTransform(str) {
  const symbolsRegex = /[\-\.\_]/gi
  const symbolsRegexGlobal = /[\w\s\d\S\W\D]/gi
  return str.replace(symbolsRegexGlobal, (word, i) => {
    if (word.match(symbolsRegex)) {
      return ''
    }
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

function getCorrectTransformType(type) {
  switch (type) {
    case 'kebab':
      return kebabCaseTransform
    case 'snake':
      return snakeCaseTransform
    case 'pascal':
      return pascalCaseTransform
    default:
      return camelCaseTransform
  }
}

module.exports = {
  kebabCaseTransform,
  pascalCaseTransform,
  snakeCaseTransform,
  camelCaseTransform,
  removeSeparatorsTransform,
  cutExtensionTransform,
  changeExtensionTransform,
  getCorrectTransformType,
}
