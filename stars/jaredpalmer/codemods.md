---
repo: jaredpalmer/codemods
url: 'https://github.com/jaredpalmer/codemods'
homepage: null
starredAt: '2020-06-07T01:56:18Z'
createdAt: '2020-05-30T15:14:26Z'
updatedAt: '2024-11-01T11:24:24Z'
language: JavaScript
license: NA
branch: master
stars: 45
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:50.014Z'
description: Collection of codemods for TypeScript and JavaScript codebases
tags: []
---

# Codemods

A list of useful codemods

## Getting started

Install [jscodeshift](https://github.com/facebook/jscodeshift) into your application or codebase. Find the transform you want to use, copy it down and follow instructions. Starting with a clean git branch is useful.

```sh
yarn add jscodeshift --dev
```

## Transforms

### `absolute-to-relative-imports`

Converts absolute imports to relative ones.

```diff
- import { Button } @/components/Button`
+ import { Button } from '../../correct/relative/path/components/Button'
```

Open `absolute-to-relative-imports.js` and modify the `pathMapping` variable at the top of the file before running.

```js
/**
 * Corresponds to tsconfig.json paths or webpack aliases
 * E.g. "@/app/store/AppStore" -> "./src/app/store/AppStore"
 */
const pathMapping = {
  '@/components': './src/components',
};
```

Execute the codemod on your `src` directory.

```sh
## TypeScript
./node_modules/.bin/jscodeshift -t ./transforms/absolute-to-relative-imports.js src/**.tsx src/**.ts --parser=tsx

## JavaScript
./node_modules/.bin/jscodeshift -t ./transforms/absolute-to-relative-imports.js src/**.js
```

### `use-strict`

Adds `'use strict'` to files

```diff
+ 'use strict'
function foo() {
  console.log('boop');
}
```

```sh
## TypeScript
./node_modules/.bin/jscodeshift -t ./transforms/use-strict.js src/**.tsx src/**.ts --parser=tsx

## JavaScript
./node_modules/.bin/jscodeshift -t ./transforms/use-strict.js src/**.js
```
