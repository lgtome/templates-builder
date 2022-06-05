const JS = {
  main: {
    import: '',
    props: '',
  },
}

const TS = {
  main: {
    import: ',{FC}',
    props: ':FC',
  },
}

function ReactTemplatesByExtension(extension) {
  switch (extension) {
    case 'ts':
      return TS
    case 'js':
      return JS
    default:
      return JS
  }
}

module.exports = { ReactTemplatesByExtension }
