---
repo: brody4hire/prettier-plugin-x
url: 'https://github.com/brody4hire/prettier-plugin-x'
homepage: null
starredAt: '2021-03-15T20:28:54Z'
createdAt: '2019-11-19T00:08:50Z'
updatedAt: '2023-07-14T18:17:16Z'
language: JavaScript
license: NOASSERTION
branch: main
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:58.322Z'
description: null
tags: []
---

# prettier-plugin-x

[![LICENSE](https://img.shields.io/npm/l/prettier-plugin-x?color=green&style=flat-square)](./LICENSE.md)
[![npm package](https://img.shields.io/npm/v/prettier-plugin-x?color=blue&style=flat-square)](https://www.npmjs.com/package/prettier-plugin-x)

Use [`prettier x-formatter`](https://github.com/brodybits/prettier-x-formatter) -
a code formatter with enhanced estree printer options from
**[prettierX](https://github.com/brodybits/prettierx)**, all in a
**[Prettier plugin](https://prettier.io/docs/en/plugins.html)**.

Supported parsers:

- **[Babel](https://babeljs.io/)**
- **[Microsoft TypeScript](https://github.com/Microsoft/TypeScript)**

Requires explicit configuration of parser. Recommended configuation helpers:

- [`prettier-config-x`](https://github.com/brodybits/prettier-config-x)
- [`prettier-config-x-standard`](https://github.com/brodybits/prettier-config-x-standard)

Recommended alternative: [`prettier-plugin-x-babel`](https://github.com/brodybits/prettier-plugin-x-babel),
with fixed use of **[Babel](https://babeljs.io/)** parser for ES languages JavaScript, Flow, and TypeScript.

Includes options from **[prettierX](https://github.com/brodybits/prettierx)** for
improved consistency with **["Standard JS"](https://standardjs.com/)** formatting,
for example:

```js
function * a () {}

console.log(typeof a)
```

with the following `.prettierrc` configuration:

```js
{
  semi: false,
  generatorStarSpacing: true,
  spaceBeforeFunctionParen: true
}
```

Note that for the non-Babel `x-typescript` parser this plugin uses the TypeScript parser that is bundled with stock Prettier.

## Installation

with Yarn (recommended):

```console
yarn add --dev prettier-plugin-x
```

or with npm:

```console
npm install --save-dev prettier-plugin-x
```

## Sample usage

```console
prettier --config ./sample-prettierx-prettierrc --parser=x-babel --check sample.js
```

with `babel-ts` parser:

```console
prettier --config ./sample-prettierx-prettierrc --parser=x-babel-ts --check sample.js
```

or with the TypeScript parser:

```console
prettier --config ./sample-prettierx-prettierrc --parser=x-typescript --check sample.js
```

with `babel-flow` parser:

```console
prettier --config ./sample-prettierx-prettierrc --parser=x-babel-flow --check sample.js
```

## Thanks and credits

- Thanks to **[`@prettier/plugin-php`](https://github.com/prettier/plugin-php)**
  for an easy-to-understand Prettier plugin,
  which helped with the initial structure of this Prettier plugin.
