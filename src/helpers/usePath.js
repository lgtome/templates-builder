function createCorrectPath(path) {
  const find = 'node_modules'
  const PATH_RESOLVED = path.includes(find)
    ? path.slice(0, path.indexOf(find))
    : path

  return PATH_RESOLVED.slice(-1) === '/' ? PATH_RESOLVED : PATH_RESOLVED + '/'
}

function getPathByDeep(deep = 1, path = './') {
  if (deep <= 1) return path
  return getPathByDeep(--deep, (path += '../'))
}
module.exports = { createCorrectPath, getPathByDeep }
