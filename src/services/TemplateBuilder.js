class BuildTemplate {
    #template = (filename) => `
  import React,{FC} from 'react'

  export const ${filename}:FC = () => {
    return (
      <div></div>
    )
  }
  `
    constructor(file) {}
    build(file) {
        return this.#template(file)
    }
}

module.exports = { BuildTemplate }
