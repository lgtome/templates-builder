const { getPathByDeep } = require('../../helpers/getPathByDeep')

class VueTemplatesCollection {
  main({ filename }) {
    return `
<template>
  <div>
        Pass code here...
  </div>
</template>

<script>

export default {
  name: '${filename}'
}

</script>

<style>
</style>
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

module.exports = { VueTemplatesCollection }
