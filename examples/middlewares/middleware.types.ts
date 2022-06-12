interface FileObject {
  /**
   * @param {string} file - filename with extension
   */
  file: string
  /**
   * @property {string, Symbol} extension - filename with extension
   */
  type: string | Symbol
  /**
   * @property {string} relation - relation to index file
   */
  relation?: string
}

export type MiddlewareFunction = (
  config: ConfigMethods
) => (files: FileObject[]) => FileObject[]
interface ConfigMethods {
  getFileTypes: () => Config['adjustVars']
  getCurrentFramework: () => symbol
  getConfig: () => Config
  getExternalPath: () => string
  getUniqueVars: () => { [key: string]: symbol }
  getFrameworks: () => { [key: string]: symbol }
  getInitialConfigKeys: () => Array<string>
}
interface Config {
  adjustVars: Array<string>
  entry: string
  transformType: string
  extension: string
  framework: 'react' | 'vue'
  fileNameSeparator: '.' | '-' | '_'
  folders: Array<string>
  reExport: boolean
  templates: string
  middlewares: Array<MiddlewareFunction>
}
