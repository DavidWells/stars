---
repo: paulmelnikow/chainsmoker
url: 'https://github.com/paulmelnikow/chainsmoker'
homepage: ''
starredAt: '2019-08-27T06:47:08Z'
createdAt: '2017-12-07T02:57:11Z'
updatedAt: '2022-12-09T22:17:11Z'
language: TypeScript
license: MIT
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:27.294Z'
description: 'Elegant, generically typed, boolean micromatch for lists of file paths'
tags:
  - filematch
  - keyed-paths
  - micromatch
  - minimatch
  - path-matching
  - typescript
---

# chainsmoker

[![version](https://img.shields.io/npm/v/chainsmoker.svg?style=flat-square)][npm]
[![license](https://img.shields.io/npm/l/chainsmoker.svg?style=flat-square)][npm]
[![types](https://img.shields.io/npm/types/chainsmoker.svg?style=flat-square)][npm]
[![build](https://img.shields.io/circleci/project/github/paulmelnikow/chainsmoker.svg?style=flat-square)][build]
[![code style](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)][prettier]

[npm]: https://npmjs.com/chainsmoker/
[build]: https://circleci.com/gh/paulmelnikow/chainsmoker/tree/master
[prettier]: https://prettier.io/
[lerna]: https://lernajs.io/

Elegant, generically typed, boolean [micromatch][] for lists of file paths in
TypeScript.

- Works with CommonJS and ES Modules, too.
- Safer and more concise than using `.filter()` and `.length`.
- Designed for concise syntax in [dangerfiles][danger] but not tied to them in
  any way.

I'm pleased to say as of [Danger.js 7.1][danger], this helper is vendored into
Danger and accessible as `danger.fileMatch`.

[micromatch]: https://github.com/micromatch/micromatch
[danger]: http://danger.systems/js/

## Usage

```js
const { danger, fail, message, warn } = require('danger')
const chainsmoker = require('chainsmoker')

// In this example, these are all arrays of relative paths.
const fileMatch = chainsmoker({
  created: danger.git.created_files,
  modified: danger.git.modified_files,
  updated: danger.git.modified_files.concat(danger.git.created_files),
  deleted: danger.git.deleted_files,
})

const documentation = fileMatch(
  '**/*.md',
  'lib/all-badge-examples.js',
  'frontend/components/usage.js'
)
const packageJson = fileMatch('package.json')
const packageLock = fileMatch('package-lock.json')
const helpers = fileMatch('lib/**/*.js', '!**.spec.js')
const helperTests = fileMatch('lib/**/*.spec.js')

// This is `true` whenever there are matches in the corresponding path array.
if (documentation.updated) {
  message('We :heart: our [documentarians](http://www.writethedocs.org/)!')
}

if (packageJson.modified && !packageLock.modified) {
  warn('This PR modified package.json, but not package-lock.json')
}

if (helpers.created && !helperTests.created) {
  warn('This PR added helper modules in lib/ but not accompanying tests.')
} else if (helpers.updated && !helperTests.updated) {
  warn('This PR modified helper modules in lib/ but not accompanying tests.')
}
```

**fileMatch.getKeyedPatterns()**

Return an object containing arrays of matched files instead of the usual
boolean values.

## Installation

Requires Node 8+.

```
npm install --save-dev chainsmoker
```

## Contribute

- Issue Tracker: https://github.com/paulmelnikow/chainsmoker/issues
- Source Code: https://github.com/paulmelnikow/chainsmoker

Pull requests welcome!

## Support

If you are having issues, please let me know.

## The name :smoking:

The name was inspired by the idea of a chainable file-set object using
minimatch. It's also for Danger… maybe that was part of the inspiration.

I ended up with something simpler that doesn't rely on chaining, though I kept
the name.

## Acknowledgements

Thanks to [@orta][] for reviewing this and shipping it with Danger.

[@orta]: http://github.com/orta

## License

The project is licensed under the MIT license.
