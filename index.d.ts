export interface FileObject {
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

export interface ConfigMethods {
  /**
   * @returns adjustVars from config
   */
  getFileTypes: () => Config['adjustVars']
  /**
   * @returns framework unique symbol
   */
  getCurrentFramework: () => symbol
  /**
   * @returns whole config
   */
  getConfig: () => Config
  /**
   * @returns path to entry
   */
  getExternalPath: () => string
  /**
   * @returns unique variables inner config
   */
  getUniqueVars: () => { [key: string]: symbol }
  /**
   * @returns unique frameworks inner config
   */
  getFrameworks: () => { [key: string]: symbol }
  /**
   * @returns all keys from config
   */
  getInitialConfigKeys: () => Array<string>
}
export interface Config {
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
