const {
  ReactTemplatesCollection,
} = require('./Frameworks/ReactTemplateService')
const { VueTemplatesCollection } = require('./Frameworks/VueTemplateService')

class TemplateCollection {
  constructor() {
    this.templates = {
      react: new ReactTemplatesCollection(),
      vue: new VueTemplatesCollection(),
    }
  }
}

module.exports = { TemplateCollection }
