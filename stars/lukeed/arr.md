---
repo: lukeed/arr
url: 'https://github.com/lukeed/arr'
homepage: null
starredAt: '2020-01-21T05:27:04Z'
createdAt: '2017-07-06T23:32:15Z'
updatedAt: '2024-12-28T17:55:49Z'
language: JavaScript
license: MIT
branch: master
stars: 258
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:07.297Z'
description: 'A collection of tiny, highly performant Array.prototype alternatives'
tags:
  - array
  - array-methods
  - javascript
  - js
  - nodejs
  - performance
---

# arr [![Build Status](https://travis-ci.org/lukeed/arr.svg?branch=master)](https://travis-ci.org/lukeed/arr)

> A collection of tiny, highly performant `Array.prototype` alternatives and extra utilities.

All exports are offered as CommonJS and ES6 modules. Additionally, every entry is ES3 code, which means that each package is ready for & compatible with any Browser or Node version!

Please view each package's readme for Usage and important information! :pray:

> :warning: **Note:** Most functions have _slight differences_ from the native built-ins!

To view extensive benchmark results, visit the [Benchmarks section](/benchmarks).

| Package | Version | Minified | Node 4 | Node 6 | Node 7 | Node 8 | Node 10 | Node 12 |
|---------|:-------:|:-----:|:------:|:------:|:------:|:------:|:------:|:------:|
| [`every`](/packages/every) | [![npm](https://img.shields.io/npm/v/@arr/every.svg?maxAge=86400)](https://www.npmjs.com/package/@arr/every) | 95 B | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :no_entry_sign: | :no_entry_sign: |
| [`filter`](/packages/filter) | [![npm](https://img.shields.io/npm/v/@arr/filter.svg?maxAge=86400)](https://www.npmjs.com/package/@arr/filter) | 101 B | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :no_entry_sign: | :no_entry_sign: |
| [`filter.mutate`](/packages/filter.mutate) | [![npm](https://img.shields.io/npm/v/@arr/filter.mutate.svg?maxAge=86400)](https://www.npmjs.com/package/@arr/filter.mutate) | 90 B | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [`find`](/packages/find) | [![npm](https://img.shields.io/npm/v/@arr/find.svg?maxAge=86400)](https://www.npmjs.com/package/@arr/find) | 91 B | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :mag: | :mag: |
| [`findIndex`](/packages/findIndex) | [![npm](https://img.shields.io/npm/v/@arr/findindex.svg?maxAge=86400)](https://www.npmjs.com/package/@arr/findindex) | 94 B | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :mag: | :no_entry_sign: |
| [`flatten`](/packages/flatten) | [![npm](https://img.shields.io/npm/v/@arr/flatten.svg?maxAge=86400)](https://www.npmjs.com/package/@arr/flatten) | 151 B | :wavy_dash: | :wavy_dash: | :wavy_dash: | :wavy_dash: | :wavy_dash: | :white_check_mark: |
| [`forEach`](/packages/forEach) | [![npm](https://img.shields.io/npm/v/@arr/foreach.svg?maxAge=86400)](https://www.npmjs.com/package/@arr/foreach) | 73 B | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :no_entry_sign: | :mag: |
| [`includes`](/packages/includes) | [![npm](https://img.shields.io/npm/v/@arr/includes.svg?maxAge=86400)](https://www.npmjs.com/package/@arr/includes) | 95 B | :wavy_dash: | :white_check_mark: | :no_entry_sign: | :no_entry_sign: | :no_entry_sign: | :no_entry_sign: |
| [`map`](/packages/map) | [![npm](https://img.shields.io/npm/v/@arr/map.svg?maxAge=86400)](https://www.npmjs.com/package/@arr/map) | 122 B | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [`reduce`](/packages/reduce) | [![npm](https://img.shields.io/npm/v/@arr/reduce.svg?maxAge=86400)](https://www.npmjs.com/package/@arr/reduce) | 137 B | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [`reduceRight`](/packages/reduceRight) | [![npm](https://img.shields.io/npm/v/@arr/reduceright.svg?maxAge=86400)](https://www.npmjs.com/package/@arr/reduceright) | 130 B | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :no_entry_sign: |
| [`reverse`](/packages/reverse) | [![npm](https://img.shields.io/npm/v/@arr/reverse.svg?maxAge=86400)](https://www.npmjs.com/package/@arr/reverse) | 136 B | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| [`some`](/packages/some) | [![npm](https://img.shields.io/npm/v/@arr/some.svg?maxAge=86400)](https://www.npmjs.com/package/@arr/some) | 94 B | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :mag: |
| [`unique`](/packages/unique) | [![npm](https://img.shields.io/npm/v/@arr/unique.svg?maxAge=86400)](https://www.npmjs.com/package/@arr/unique) | 111 B | :wavy_dash: | :wavy_dash: | :wavy_dash: | :mag: | :mag: | :mag: |

> :white_check_mark: &mdash; Denotes function **is** faster than native <br>
> :no_entry_sign: &mdash; Denotes function **is not** faster than native <br>
> :mag: &mdash; Denotes function **is sometimes** faster than native <br>
> :wavy_dash: &mdash; Denotes function has no native counterpart <br>

## License

MIT © [Luke Edwards](http://lukeed.com)
