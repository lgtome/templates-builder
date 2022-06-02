# Template builder for React

[![Wallaby.js](https://img.shields.io/badge/wallaby.js-powered-blue.svg?style=for-the-badge&logo=github)](https://wallabyjs.com/oss/)
![NPM version](https://img.shields.io/npm/v/templates-builder?style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/templates-builder?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/NaaYaa-oops/templates-builder?style=for-the-badge)

[//]: # '![Build Status](https://img.shields.io/travis/NaaYaa-oops/templates-builder)'

### [Package] which generate templates via config file and argv

## Table of Contents

-   [Get Started](#get-started)
-   [Usage](#usage)
-   [Config](#config)
-   [Available Template Variables](#vars)
-   [Preview](#preview)
-   [Future Goals](#goals)
-   [Contribution](#contribution)
-   [License](#license)

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
    "adjustVars": "['index', 'props', 'styles', 'stories']",
    "entry": "src",
    "transformType": "kebab",
    "extension": "js",
    "framework": "vue",
    "folders": "['components', 'services', 'helpers', 'graphql', '__tests__']",
    "templatesFolder": false,
    "fileNameSeparator": ".",
    "reExport": true,
    "templates": {}
}
```

### Quick guide

**Provide** your path includes your `entry` in the config, or default entry value, if no entry, is an `src`, and execute like this:

```sh
yarn tb enter/your/path/...
```

or use package.json scripts:

```json
...
{
    "scripts":{
        ...
        "generate:template": "yarn tb ..."
        ...
    }
}
...
```

## <a name="config"></a> Config

| Config option         | Requirements |           Available types           | Defaults |                                               Meaning |
| :-------------------- | :----------: | :---------------------------------: | :------: | ----------------------------------------------------: |
| **entry**             |   `false`    |              `String`               |  `src`   | Absolute directory from which the files are generated |
| **adjustVars**        |   `false`    |           `Array<String>`           |  `None`  |                       Sub-files, like props or styles |
| **transformType**     |   `false`    | `kebab or snake or pascal or camel` | `camel`  |                              Names transform strategy |
| **extension**         |   `false`    |             `js or ts`              |   `js`   |                                       Files extension |
| **framework**         |    `true`    |           `react or vue`            |  `None`  |                            Framework based generation |
| **folders**           |   `false`    |              `String`               |  `None`  |     Additional folders, which will be on the endpoint |
| **templates**         |   `false`    |              `String`               |  `None`  |              Path to the templates files, json format |
| **fileNameSeparator** |   `false`    |           `. or - or _ `            |   `.`    |                           Filename separator strategy |
| **reExport**          |   `false`    |              `Boolean`              |  `None`  |  Creates index file, which re-export fn from the main |

## <a name="preview"></a>Preview

-   Files with or without folders
-   Each file have a template, also u can provide variables: `$filename$`
-   _Result may vary because config may vary_

    ![alt text](./src/assets/image.png)

## <a name="contribution"></a>Contributing

In an active search for contributors and I will be glad to support the package.

**Follow this flow:**

-   Fork
-   `git clone`
-   `npm install` or `yarn install` make your changes
-   Update `CHANGELOG.md` commit and make a pull request

#### Currently working on

-   Tests
-   Support folder file structure

## <a name="license"></a>License

[MIT-licensed](./LICENSE).

[web workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[package]: https://www.npmjs.com/package/templates-builder
