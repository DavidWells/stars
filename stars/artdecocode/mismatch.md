---
repo: artdecocode/mismatch
url: 'https://github.com/artdecocode/mismatch'
homepage: ''
starredAt: '2021-11-14T00:31:12Z'
createdAt: '2018-07-21T03:20:57Z'
updatedAt: '2021-11-14T00:31:12Z'
language: JavaScript
license: MIT
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:38.674Z'
description: >-
  A JavaScript package to return captured groups of a regular expression as
  objects in an array.
tags: []
---

# mismatch

[![npm version](https://badge.fury.io/js/mismatch.svg)](https://npmjs.org/package/mismatch)

`mismatch` is a JavaScript package to return captured groups of a regular expression as objects in an array.

```sh
yarn add mismatch
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/0.svg?sanitize=true"></a></p>

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
  * [`mismatch(re: RegExp, string: string, keys: string[], addPosition?: boolean)`](#mismatchre-regexpstring-stringkeys-stringaddposition-boolean-void)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/1.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import mismatch from 'mismatch'
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/2.svg?sanitize=true" width="25"></a></p>

### `mismatch(`<br/>&nbsp;&nbsp;`re: RegExp,`<br/>&nbsp;&nbsp;`string: string,`<br/>&nbsp;&nbsp;`keys: string[],`<br/>&nbsp;&nbsp;`addPosition?: boolean,`<br/>`): void`

The function will attempt to find all matches for a given regular expression in a string using `.replace()` method, construct an object consisting of captured groups based on supplied keys, and return those objects as an array. It has an advantage over iterating over `while(RegExp.exec(string))` pattern because it does not modify the regular expression's `lastIndex` property.

```js
/* yarn example/ */
import mismatch from 'mismatch'

const re = /(\w+)="(.+?)"/g
const string = `
<script
  crossorigin="anonymous"
  src="https://static.npmjs.com/commons.js"
  integrity="sha512-example/rhb92Zdom+ix+AYtqZ7C1DlLKEA=="
></script>
`
const keys = ['attribute', 'value']
const res = mismatch(re, string, keys)
console.log(JSON.stringify(res, null, 2))
```

```json
[
  {
    "attribute": "crossorigin",
    "value": "anonymous"
  },
  {
    "attribute": "src",
    "value": "https://static.npmjs.com/commons.js"
  },
  {
    "attribute": "integrity",
    "value": "sha512-example/rhb92Zdom+ix+AYtqZ7C1DlLKEA=="
  }
]
```

If an optional capturing group was not found, its key will not be included as part of the object. Also, if there are more captured groups than keys, they will also not be included.

```js
/* yarn example/extra.js */
import mismatch from 'mismatch'

const re = /(?: type="(.+?)")?\s+crossorigin="(.+?)"\s+src="(.+?)"/g
const string = `
<script
  crossorigin="anonymous"
  src="https://static.npmjs.com/commons.js"
  integrity="sha512-example/rhb92Zdom+ix+AYtqZ7C1DlLKEA=="
></script>
`
const keys = ['type', 'crossorigin']
const res = mismatch(re, string, keys)
console.log(JSON.stringify(res, null, 2))
```
```json
[
  {
    "crossorigin": "anonymous"
  }
]
```

To additionally add the positions at which the matches was found, the last argument, `addPositions` should be set to _true_.

```js
/* yarn example/ */
import mismatch from 'mismatch'

const re = /(\w+)="(.+?)"/g
const string = `
<script
  crossorigin="anonymous"
  src="https://static.npmjs.com/commons.js"
  integrity="sha512-example/rhb92Zdom+ix+AYtqZ7C1DlLKEA=="
></script>
`
const keys = ['attribute', 'value']
const res = mismatch(re, string, keys, true)
console.log(JSON.stringify(res, null, 2))
```
```json
[
  {
    "position": 11,
    "attribute": "crossorigin",
    "value": "anonymous"
  },
  {
    "position": 37,
    "attribute": "src",
    "value": "https://static.npmjs.com/commons.js"
  },
  {
    "position": 81,
    "attribute": "integrity",
    "value": "sha512-example/rhb92Zdom+ix+AYtqZ7C1DlLKEA=="
  }
]
```

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/3.svg?sanitize=true"></a></p>

## Copyright

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png" alt="Art Deco" />
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a>   2019</th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img src="https://raw.githubusercontent.com/artdecoweb/www.technation.sucks/master/anim.gif"
          alt="Tech Nation Visa" />
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents"><img src=".documentary/section-breaks/-1.svg?sanitize=true"></a></p>
