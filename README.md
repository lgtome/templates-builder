# Template builder for React

![NPM version](https://img.shields.io/npm/v/templates-builder?style=for-the-badge)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/templates-builder?style=for-the-badge)
![GitHub last commit](https://img.shields.io/github/last-commit/NaaYaa-oops/templates-builder?style=for-the-badge)

[//]: # '![Build Status](https://img.shields.io/travis/NaaYaa-oops/templates-builder)'

### [Package] which generate templates via config file and argv

## Getting Started

Install **templates-builder** with npm:

```sh
npm install --save templates-builder
```

or using yarn:

```sh
yarn add templates-builder
```

### Usage:

Use **default** preset or use **config** like:

```json
{
    "entry": "src",
    "extension": "js",
    "templatesFolder": "./templates/tb.js",
    "includedFolders": [
        {
            "components": "index"
        }
    ],
    "transformType": "kebab",
    "fileTypes": ["props", "story", "helpers", "services", "index", "types"],
    "folders": ["components", "hooks", "common"],
    "reExport": true
}
```

**Also** with config or nor you need to provide path in argv, like:

```sh
yarn tb enter/your/path/...
```

**tb** - custom script with executable file.

### Result of execute script:

-   Files with or without folders
-   Each file have a template, also u can provide variables: `$filename$`
-   _Result may vary because config may vary_

    ![alt text](./src/assets/image.png)

### Contributing

In an active search for contributors and I will be glad to support the package.

**Follow this flow:**

-   Fork
-   `git clone`
-   `npm install` or `yarn install` make your changes
-   To compile project use `npm run compile` or `yarn run compile`
-   Update `CHANGELOG.md` commit and make a pull request

### Currently working on:

-   Support not only React
-   Sub directories gen
-   Root directories gen

### License

[MIT-licensed](./LICENSE).

[web workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[package]: https://www.npmjs.com/package/templates-builder
