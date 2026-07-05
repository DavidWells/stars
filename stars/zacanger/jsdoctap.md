---
repo: zacanger/jsdoctap
url: 'https://github.com/zacanger/jsdoctap'
homepage: 'http://npm.im/jsdoctap'
starredAt: '2021-11-13T19:02:39Z'
createdAt: '2017-08-12T15:49:02Z'
updatedAt: '2023-01-27T23:29:01Z'
language: JavaScript
license: MIT
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:38.919Z'
description: Test runner for doctests using JSDoc examples and node-tap.
tags:
  - doctest
  - doctests
  - documentation
  - jsdoc
  - node-tap
  - tap
  - test
  - testing
  - workflow
---

# jsdoctap

Test runner for doctests using JSDoc examples and node-tap.

Based on the hard work of [@yamadapc](https://github.com/yamadapc) and [this
project](https://github.com/yamadapc/jsdoctest).

* [Examples](./examples)
* [Roadmap and known bugs](#roadmap)
* [Changes](./CHANGELOG.md)

![screenshot](/screenshot.gif?raw=true)

--------

## Installation

`npm i -D jsdoctap`

## Usage

`jsdoctap some-file.js`

I recommend adding it to your npm scripts. Example:

```json
{
  "scripts": {
    "test": "jsdoctap src/*.js"
  }
}
```

### Options

`jsdoctap` has one option: `-i` (or `--ignore`)
Example: `jsdoctap -i src/*.test.js -i src/*.config.js src/*.js`.

### Format

Tests must be under an `@example` in a valid JSDoc comment.
The return value to be tested against must come after a line comment with an
arrow (Clojure REPL style):

```javascript
/**
 * Identity
 * @example
 * id(1) // => 1
 */
```

Line breaks between the call and the comment are fine:

```javascript
/**
 * Identity
 * @example
 *   id(1)
 *   // => 1
 */
```

Line breaks in function calls currently do _not_ work:

```javascript
/**
 * This will break!
 * @example
 * id(
 *   1
 * ) // => 1
 */
```

Source and examples that need to be Babelified work just fine, as long as you
have Babel configured and modules installed.

## Roadmap

* Handle expecting errors
* Fix multi-line function calls
* Fix dependencies that need to be Babelified
* Add ability to have custom test case name
* Clean up comment-parser and getModuleName (in tap)
* More tests and examples

## License

[MIT](./LICENSE.md)
