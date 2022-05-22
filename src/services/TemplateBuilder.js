const {
    getUniqueVars,
    getFrameworks,
    getCurrentFramework,
} = require('../utils/config')
const {
    removeSeparatorsTransform,
    cutExtensionTransform,
} = require('../helpers/useTransform')
const { TemplateCollection } = require('../templates/TemplatesCollection')
const { Logger } = require('./Logger')
class BuildTemplate extends TemplateCollection {
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
        return this.#getTemplateByFramework()(type)({ ...templateVars })
    }

    #getTemplateByType(framework) {
        return (type) => {
            switch (type) {
                case getUniqueVars().index:
                    return this.templates[framework].index
                case getUniqueVars().main:
                    return this.templates[framework].main
                default:
                    return this.templates[framework].rest
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
const builder = new BuildTemplate()
module.exports = { builder }
