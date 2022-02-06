function createCorrectPath(path) {
    // const find = 'node_modules'
    const find = 'node_modules'
    const PATH_RESOLVED = path.includes(find)
        ? path.slice(0, path.indexOf(find))
        : path

    return PATH_RESOLVED.slice(-1) === '/' ? PATH_RESOLVED : PATH_RESOLVED + '/'
}

module.exports = createCorrectPath
