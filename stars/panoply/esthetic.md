---
repo: panoply/esthetic
url: 'https://github.com/panoply/esthetic'
homepage: 'https://aesthetic.js.org'
starredAt: '2022-09-11T06:51:15Z'
createdAt: '2022-02-06T15:54:25Z'
updatedAt: '2025-01-21T08:11:13Z'
language: TypeScript
license: MIT
branch: next
stars: 36
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:31.688Z'
description: Æ ~ New generation beautification support for multiple languages (pre-release)
tags:
  - aesthetic
  - beautification
  - beautifier
  - beautify
  - esthetic
  - format
  - formatter
  - formatting
  - liquid
  - liquify
  - prettier
  - prettydiff
  - shopify
  - sparser
  - typescript
---

<br>
<p align="center">
<a href="https://æsthetic.dev">
<img src="https://raw.githubusercontent.com/panoply/esthetic/next/docs/src/assets/svg/æsthetic.svg" width="270px">
</a>
</p>

<br>

### WIP ~ WORK IN PROGRESS

The new generation code beautification tool for formatting HTML, Liquid, CSS/SCSS, JavaScript, TypeScript and more! Æsthetic leverages the [Sparser](https://sparser.io/docs-html/tech-documentation.xhtml#universal-parse-model) lexing algorithm and its parse approach has been repurposed from the distributed source of the late and powerful [PrettyDiff](https://github.com/prettydiff/prettydiff/blob/master/options.md).

### Documentation

Documentation lives on **[æsthetic.js.org](https://aesthetic.js.org)**

### Features

- Fast, performant and lightweight (50kb gzip).
- Format, parse and language detection capabilities.
- Provides a granular set of beautification rules.
- Supports 10+ different front~end facing languages.
- Uniformed data structures with incremental traversal.
- Simple and painless integration within existing projects.

## Installation

Æsthetic is supports both CJS/ESM environments and also provides basic CLI support.

###### PNPM

```bash
pnpm add esthetic
```

###### YARN

```bash
yarn add esthetic
```

###### NPM

```bash
npm install esthetic --save
```

###### CDN

```bash
https://unpkg.com/esthetic
```

## Usage

Consult the [documentation](https://æsthetic.dev) for a better understanding.

###### CLI

```bash
$ esthetic <file> --flag
```

###### ESM

<!--prettier-ignore-->
```js
import esthetic from 'esthetic';

esthetic.format('...', { /* rules */ })

```

###### CJS

<!--prettier-ignore-->
```js
const esthetic = require('esthetic');

esthetic.format('...', { /* rules */ })

```

## Contributing

Looking to contribute? Æsthetic leverages [pnpm](https://pnpm.js.org/) so ensure you're using it as your package manager. Development is intended to be conducted within the [vscode](https://code.visualstudio.com/) text editor. Fork or clone the project and install dependencies.

<details>
<summary>
  Pre-requisites
</summary>
<p>

- [Git](https://git-scm.com/)
- [Node v16^](https://nodejs.org/)
- [Pnpm v7^](https://pnpm.js.org/)
- [VSCode](https://code.visualstudio.com/)

</p>
</details>

### Testing / Development

Æsthetic uses the powerful [AVA](https://github.com/avajs/ava) test runner together with a small helper utility that helps alleviate some of the complexities involved with testing tools of its criteria. It's recommended that you develop in a two pane terminal. The [dev.test.mjs](/tests/dev.test.mjs) and [dev.txt](/tests/dev.txt) files are core to testing and working on the module, they will be called when running `pnpm play`

### Commands

The following commands are available as executable scripts.

```
pnpm dev         Bundles module with ESBuild (via tsup) in watch mode
pnpm play        Starts up AVA in development mode and runs the dev.txt
pnpm build       Generates the distribution bundles
pnpm pack        Packages the module up for distribution on NPM registry
pnpm test        Runs all the tests
pnpm tests       Cherry pick test cases to run
```

> Consult the [tests](/tests/) readme for more information on `test` prefixed commands

## Acknowledgements

Æsthetic owes its existence to Sparser and PrettyDiff. This project has been adapted from these 2 brilliant tools and while largely refactored + overhauled the original parse architecture remains intact.

### [PrettyDiff](https://github.com/prettydiff/prettydiff) and [Sparser](https://github.com/unibeautify/sparser)

Æsthetic is made possible because of the [Austin Cheney](https://github.com/prettydiff) who is the original author of [Sparser](https://github.com/unibeautify/sparser) and [PrettyDiff](https://github.com/prettydiff/prettydiff). Austin is one of the great minds in JavaScript and I want to thank him for open sourcing these tools.

Both PrettyDiff and Sparser were retired in 2019 after a nearly a decade of production. Austin has since created [Shared File Systems](https://github.com/prettydiff/share-file-systems) which is a privacy first point-to-point communication tool. Please check it out and also have a read of
[wisdom](https://github.com/prettydiff/wisdom) which personally helped me become a better developer.

## Author 🥛 [Νίκος Σαβίδης](mailto:nicos@gmx.com)

Follow me on [Twitter](https://twitter.com/niksavvidis) or shoot me an [Email](mailto:n.savvidis@gmx.com).
