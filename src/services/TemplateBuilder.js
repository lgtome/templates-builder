class BuildTemplate {
    #index_template = (filename) => `
  import React,{FC} from 'react'

  export const ${filename}:FC = () => {
    return (
      <div>hey</div>
    )
  }
  `

    constructor() {}
    build(file) {
        return this.#index_template(file)
    }
}

module.exports = { BuildTemplate }
