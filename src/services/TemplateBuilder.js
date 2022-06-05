const {
  getUniqueVars,
  getFrameworks,
  getCurrentFramework,
  getConfig,
} = require('../utils/config')
const {
  removeSeparatorsTransform,
  cutExtensionTransform,
} = require('../helpers/useTransform')
const { TemplateCollection } = require('../templates/TemplatesCollection')
const { Logger } = require('./Logger')
class TemplateBuilder extends TemplateCollection {
  #framework = getCurrentFramework()
  #frameworks = getFrameworks()
  constructor() {
    super()
  }
  build(options = {}) {
    const { file, extension = 'js', type, relation } = options
    const cutFilename = cutExtensionTransform(file)
    const formattedFilename = removeSeparatorsTransform(cutFilename)
    const templateVars = {
      filename: formattedFilename,
      extension,
      relation,
    }

    return this.#getTemplateByFramework()(type)(templateVars)
  }

  #proceedTemplate(framework, type) {
    const { templates } = getConfig()
    if (Object.keys(templates).length <= 0) {
      return this.templates[framework].rest
    }

    return templates[type]
      ? constructTemplate(templates[type])
      : this.templates[framework].rest

    function constructTemplate(str) {
      if (typeof str !== 'string') {
        Logger.wrongValue(str, String)
        return process.exit(0)
      }

      return ({ filename, extension, relation }) => {
        const mappedTypes = {
          filename,
          extension,
          relation,
        }
        const regex = /\$(?:(\w+))\$/gm
        const symbol = /\$/gm

        return str.replace(regex, (match) => {
          const formattedMatch = match.replace(symbol, '').toLowerCase()
          const processedMatch = mappedTypes[formattedMatch] || formattedMatch
          return processedMatch
        })
      }
    }
  }

  #getTemplateByType(framework) {
    return (type) => {
      switch (type) {
        case getUniqueVars().index:
          return this.templates[framework].index
        case getUniqueVars().main:
          return this.templates[framework].main
        default:
          return this.#proceedTemplate(framework, type)
      }
    }
  }
  #getTemplateByFramework() {
    if (!this.#framework) {
      Logger.notProvided('framework')
      process.exit(1)
    }
    switch (this.#framework) {
      case this.#frameworks.vue:
        return this.#getTemplateByType('vue')
      case this.#frameworks.angular:
        return this.#getTemplateByType('angular')
      case this.#frameworks.react:
        return this.#getTemplateByType('react')
    }
  }
}

module.exports = { TemplateBuilder }
