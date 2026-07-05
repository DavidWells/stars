---
repo: humanwhocodes/gitignore-to-minimatch
url: 'https://github.com/humanwhocodes/gitignore-to-minimatch'
homepage: null
starredAt: '2022-02-14T00:46:35Z'
createdAt: '2022-01-21T18:06:15Z'
updatedAt: '2025-02-19T21:26:52Z'
language: JavaScript
license: Apache-2.0
branch: main
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:23.583Z'
description: Utility to convert gitignore patterns into minimatch patterns
tags: []
---

# Gitignore to Minimatch Utility

by [Nicholas C. Zakas](https://humanwhocodes.com)

If you find this useful, please consider supporting my work with a [donation](https://humanwhocodes.com/donate).

## Description

A function that converts a [gitignore](https://git-scm.com/docs/gitignore#_pattern_format) pattern into a [minimatch](https://github.com/isaacs/minimatch) pattern. There are subtle differences between these two formats, and depending on the utilities you're using, you may need one or the other.

## Usage

### Node.js

Install using [npm][npm] or [yarn][yarn]:

```
npm install @humanwhocodes/gitignore-to-minimatch --save

# or

yarn add @humanwhocodes/gitignore-to-minimatch
```

Import into your Node.js project:

```js
// CommonJS
const { gitignoreToMinimatch } = require("@humanwhocodes/gitignore-to-minimatch");

// ESM
import { gitignoreToMinimatch } from "@humanwhocodes/gitignore-to-minimatch";
```

### Deno

Import into your Deno project:

```js
import { gitignoreToMinimatch } from "https://cdn.skypack.dev/@humanwhocodes/gitignore-to-minimatch?dts";
```

### Browser

It's recommended to import the minified version to save bandwidth:

```js
import { gitignoreToMinimatch } from "https://cdn.skypack.dev/@humanwhocodes/gitignore-to-minimatch?min";
```

However, you can also import the unminified version for debugging purposes:

```js
import { gitignoreToMinimatch } from "https://cdn.skypack.dev/@humanwhocodes/gitignore-to-minimatch";
```

## API

After importing, call `gitignoreToMinimatch` with a string argument, like this:

```js
const minimatchPattern = gitignoreToMinimatch("foo");
console.log(minimatchPattern);      // "**/foo"
```

## Developer Setup

1. Fork the repository
2. Clone your fork
3. Run `npm install` to setup dependencies
4. Run `npm test` to run tests

## License

Apache 2.0

[npm]: https://npmjs.com/
[yarn]: https://yarnpkg.com/
