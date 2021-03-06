# Template builder for React and Vue

<a href="https://codeclimate.com/github/lgtome/templates-builder/test_coverage"><img src="https://api.codeclimate.com/v1/badges/7a7ed6968bf515eb6e80/test_coverage" /></a>
[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg)](https://wallabyjs.com/oss/)
![npm bundle size](https://img.shields.io/github/repo-size/lgtome/templates-builder)
![Build Status](https://img.shields.io/github/workflow/status/lgtome/templates-builder/Main)

### [Templates Builder], is a package which generate file and folder structure from templates via config file and argv

### This package also have a VSCode extension: [TB extension](https://marketplace.visualstudio.com/items?itemName=lgtome.tb-config), see more: [Extension](#extension)

## Table of Contents

- [Get Started](#get-started)
- [Usage](#usage)
- [Config](#config)
- [Available Template Variables](#vars)
- [Templates](#templates)
- [Middlewares](#middlewares)
- [Preview](#preview)
- [VSCode Extension](#extension)
- [Future Goals](#goals)
- [Contribution](#contribution)
- [License](#license)

## <a name="get-started"></a>Get started

Install **templates-builder** with npm:

```sh
npm install --save templates-builder
```

or using yarn:

```sh
yarn add templates-builder
```

## <a name="usage"></a>Usage

Extended description and usage of this, see: [Config](#config)

Use **default** preset or use **config** like:

```json
{
  "adjustVars": ["index", "props", "styles", "stories"],
  "entry": "src",
  "transformType": "kebab",
  "extension": "js",
  "framework": "vue",
  "folders": ["components", "services", "helpers", "graphql", "__tests__"],
  "fileNameSeparator": ".",
  "reExport": true,
  "templates": "path/to/your/templates"
}
```

### Quick guide

**Provide** your path includes your `entry` in the config, or default entry value, if no entry, is an `src`, and execute like this:

```sh
tb enter/your/path/...
```

or use package.json scripts:

```json
...
{
    "scripts":{
        ...
        "generate:template": "tb ..."
        ...
    }
}
...
```

## <a name="config"></a> Config

### Sample config filename:

- `tb.config.json`
- `tb.config.js`
- `.tbconfigrc`

### Config Options:

| Config option         | Require |           Available types           |  Defaults   |                                                                                           Meaning |
| :-------------------- | :-----: | :---------------------------------: | :---------: | ------------------------------------------------------------------------------------------------: |
| **entry**             | `false` |              `String`               |    `src`    |                                             Absolute directory from which the files are generated |
| **adjustVars**        | `false` |           `Array<String>`           | `['index']` |                                                                   Sub-files, like props or styles |
| **transformType**     | `false` | `kebab or snake or pascal or camel` |   `camel`   |                                                                          Names transform strategy |
| **extension**         | `false` |             `js or ts`              |    `js`     |                                                                                   Files extension |
| **framework**         | `true`  |           `react or vue`            |   `react`   |                                                                        Framework based generation |
| **folders**           | `false` |              `String`               |    `[]`     |                                                 Additional folders, which will be on the endpoint |
| **templates**         | `false` |              `String`               |    `{}`     |                             Path to the templates files, json format, see [Templates](#templates) |
| **fileNameSeparator** | `false` |           `. or - or _ `            |     `.`     |                                                                       Filename separator strategy |
| **reExport**          | `false` |              `Boolean`              |   `true`    |                                              Creates index file, which re-export fn from the main |
| **middlewares**       | `false` |          `Array<Function>`          |    `[]`     | Array of middlewares which would be executed on transform files, **Available only in `.js` file** |

## <a name="templates"></a>Templates

Your config file with your own templates to every file, or exactly for only one.

### Template filename and extension:

- `*.js`

### Accepted exports:

- `export const ...`

- `export {...}`

- `export default {...}`

### Allowed variables:

- `$FILENAME$` - filename

- `$EXTENSION$` - file extension

- `$relation$` - relation to the main file, used only in `index` template

### Example:

If you set to the config `adjustVars`, for example, `index` and `style` you can provide the same vars to the template, like this:

```js
const index = `some template`
const style = 'styles template'

export default { style, index }
```

Also you can pass variables, like this:

```js
export const props = '$FILENAME$ is a props file with $EXTENSION$ extension'
export const index = `$relation$ relation to main file`
```

## <a name="middlewares"></a>Middlewares

_**Available only in `tb.config.js` file**_

Middlewares conception available via config file. You can use custom framework agnostic middlewares.

### Examples path from the root repository - `examples/middlewares`

Currently middlewares accepting all transformed files and config object with methods to manipulate config (without modifying)

#### Usage

_**All types available in `examples/middlewares` directory**_

Middlewares can be used only via config file. Set a property `middlewares` which allow `Array<Middleware>`, so for example:

```js
const Middleware = (config) => (files) => files
module.exports = () => ({
  ...,
  middlewares: [Middleware, Middleware, Middleware],
  ...
})
```

## <a name="preview"></a>Preview

- Files with or without folders
- Each file have a template, also u can provide variables: `$filename$`
- _Result may vary because config may vary_

  <img src="https://i.imgur.com/ZRfzCf0.png"></img>
  <img src="https://i.imgur.com/cyVRkps.png"></img>

## <a name="extension"></a>VSCode Extension

#### This package have a **VSCode** extension to autocomplete your config file, generate templates folder from current config and create it from scratch..

### Usage and Installation

#### Installation

**Easiest way** - use `tb-ext` from the shell.

**First Way** - follow this link and click install: [tb-config](https://marketplace.visualstudio.com/items?itemName=lgtome.tb-config)

**Second Way** - search via VSCode extension store, extension name: `tb-cfg`

**Third Way** - manually install: `ext install lgtome.tb-config`

#### Usage

Full autocomplete for config file by default.
Commands (use ctrl\cmd + shift + p):

- `Templates Builder: Create config` - create config file with default structure

- `Templates Builder: Create template file from config`- generate templates folder from config

## <a name="contribution"></a>Contributing

In an active search for contributors and I will be glad to support the package.

**Follow this flow:**

- Fork this repository
- `git clone` your fork
- `npm install` or `yarn install` make your changes
- Update `CHANGELOG.md` commit and make a pull request

#### Currently working on

- Tests
- Support folder file structure

## <a name="license"></a>License

[MIT-licensed](./LICENSE).

[web workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[templates builder]: https://www.npmjs.com/package/templates-builder
