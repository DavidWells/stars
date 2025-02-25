---
repo: Codefend/core
url: 'https://github.com/Codefend/core'
homepage: 'https://codefend.github.io/docs'
starredAt: '2023-01-13T00:48:32Z'
createdAt: '2023-01-03T17:35:58Z'
updatedAt: '2024-12-10T17:08:50Z'
language: TypeScript
license: MIT
branch: main
stars: 18
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:58.783Z'
description: >-
  Code obfuscator CLI that protects your code regardless of the programming
  language or framework.
tags:
  - angular
  - arduino
  - nuxt
  - obfuscator
  - python
  - react
  - svelte
  - uglify
  - vue
---

<p align="center">
 <img src="./public/img/logo.png">
</p>

# Codefend

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/Codefend/core/ci.yml?branch=main)
![NPM](https://img.shields.io/npm/dt/codefend)
![Bundlephobia](https://img.shields.io/bundlephobia/min/codefend)
![NPM](https://img.shields.io/node/v/codefend)
![NPM](https://img.shields.io/npm/l/codefend)

`Codefend` is a dynamic 🪩 CLI tool that obfuscates your source code, folders, and file names, compatible with any programming language or framework.
It delivers powerful obfuscation while ensuring performance maintained ⚡, so you benefit from enhanced security without compromising your application's speed or efficiency.
Additionally, Codefend offers plugins for Webpack, Rollup, and Vite.

Beyond simple obfuscation, Codefend delivers advanced features, integrating smoothly with current uglifiers or minifiers. It employs a two-layer obfuscation 🪞 process, embedding hidden code within hidden code for irreversible source code protection.

For Codefend to work properly, you need to implement a folder and files naming convention, a code naming convention, or both. Once set up, Codefend will handle obfuscation, allowing you to concentrate on development and safeguard your intellectual property ✨

- [Folder and files naming convention](https://codefend.github.io/docs/basic-usage/naming-conventions/folders-files-naming-convention)
- [Code naming convention](https://codefend.github.io/docs/basic-usage/naming-conventions/code-naming-convention)

Visit the [docs](https://codefend.github.io/docs/) for instructions, examples, and advanced settings.

## Installation

#### `Globally`

```bash
npm install -g codefend
codefend -i  //required only the first time, generates .codefendrc.json
codefend -o  //obfuscates your whole project inside a new directory: 'codefend-output'
```

#### `Dev dependency`

```bash
npm install -D codefend
```

#### `npx`

In case you want to execute it directly without installing it on your machine:

```bash
npx codefend -i  //required only the first time, generates .codefendrc.json
npx codefend -o  //obfuscates your whole project inside a new directory: 'codefend-output'
```

#### `Webpack`

If you're using Webpack, you can use [webpack-plugin-codefend](https://www.npmjs.com/package/webpack-plugin-codefend) instead of directly using the CLI, keeping in mind that not all features are propagated to the plugin and may take time to become available.

#### `Rollup/Vite`

If you're using Rollup or Vite, you can use [rollup-plugin-codefend](https://www.npmjs.com/package/rollup-plugin-codefend) instead of directly using the CLI, keeping in mind that not all features are propagated to the plugin and may take time to become available.

## Commands

```shell
Usage: codefend [options]

Defend Your Code By All Means Necessary. 💪 😎

Options:
  -i, --init       Create the config file (.codefendrc.json)
  -o, --obfuscate  Obfuscate the project
  -c, --check      Check the config file for potential warnings/errors
  -v, --version    Output the version number
  -h, --help       Display help for command
```

## Basic Usage

### `Step 1`: Naming convention

`Add prefixes to the words that you want to encrypt.`

```js
//as a starting point:  prefix the words that should be encrypted with l_
class l_Calculator {
  l_sum(l_a, l_b) {
    const l_results = l_a + l_b;
    return l_results;
  }
}

//>>>>>>==== Will Become ======<<<<<<

class Ox0 {
  Ox1(Ox2, Ox3) {
    const Ox4 = Ox2 + Ox3;
    return Ox4;
  }
}

// Or for a better organized naming convention:
/** 
 * 
1- class -> starts with c_
2- function -> starts with f_
3- parameter -> starts with p_
4- local variable -> starts with l_
*/
class c_Calculator {
  f_sum(p_a, p_b) {
    const l_results = p_a + p_b;
    return l_results;
  }
}

//>>>>>>==== Same results ======<<<<<<
class Ox0 {
  Ox1(Ox2, Ox3) {
    const Ox4 = Ox2 + Ox3;
    return Ox4;
  }
}
```

```html
<!-- Html example, can work also with Angular,React,Vue,Svelte... in the same way -->

<html>
  <head>
    <style>
      .l_red {
        color: red;
      }
    </style>
  </head>
  <body>
    <div class="l_red">l_secret</div>
    <div class="l_red">Hello World</div>
  </body>
</html>

<!-- Will Become -->

<html>
  <head>
    <style>
      .Ox1 {
        color: red;
      }
    </style>
  </head>
  <body>
    <div class="Ox1">Ox0</div>
    <div class="Ox1">Hello World</div>
  </body>
</html>
```

### `Step 2`: Run the CLI

`navigate to the root of your project and run the following commands:`

```bash
codefend -i  //required only the first time, generates .codefendrc.json

```

```bash
codefend -o  //obfuscates your whole project inside a new directory: 'codefend-output'
```

For a more detailed explanation, please refer to the [obfuscation](https://codefend.github.io/docs/basic-usage/obfuscation) section of the docs.

### `Step 3`: install dependencies, build and deploy the obfuscated project

Please refer to the [build and deployment](https://codefend.github.io/docs/distribution/build-and-deployment) and [ troubleshooting](https://codefend.github.io/docs/distribution/troubleshooting) sections of the docs.

## Configuration

Please refer to the [configuration](https://codefend.github.io/docs/references/configuration) section of the docs.

## Migration guide

Please refer to the [migration guide](https://codefend.github.io/docs/migrations/codefend-v3) section of the docs.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](./LICENSE.md)
