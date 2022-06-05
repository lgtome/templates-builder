function getPathByDeep(deep = 1, path = './') {
  if (deep <= 1) return path
  return getPathByDeep(--deep, (path += '../'))
}
module.exports = { getPathByDeep }
