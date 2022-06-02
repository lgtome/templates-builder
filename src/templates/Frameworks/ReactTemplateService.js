const {
    ReactTemplatesByExtension,
} = require('../../utils/templates/ReactTemplates')
const { getPathByDeep } = require('../../helpers/getPathByDeep')
class ReactTemplatesCollection {
    main({ filename, extension }) {
        return `
import React${ReactTemplatesByExtension(extension).main.import} from 'react'

export const ${filename}${
            ReactTemplatesByExtension(extension).main.props
        } = () => {
   return (
      <div></div>
    )
 }
  `
    }
    /**
     * @todo add deep
     * @param {number} deep is equal number
     * @argument deep should be ...
     */
    index({ relation, deep = 1 }) {
        return `export { ${relation} } from '${getPathByDeep(deep)}${relation}'`
    }

    rest() {
        return `export {}`
    }
}

module.exports = { ReactTemplatesCollection }
