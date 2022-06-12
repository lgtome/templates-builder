import { MiddlewareFunction } from './middleware.types'

const SampleMiddleware: MiddlewareFunction = (config) => (files) => {
  const { framework } = config.getConfig()
  if (framework !== 'react') {
    return files
  }
  return files.map((file) => {
    return {
      ...file,
      file: file.file.replace(/[.js]+$/, '') + 'tsx',
    }
  })
}
