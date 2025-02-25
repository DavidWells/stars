---
repo: SkeLLLa/fast-rbac
url: 'https://github.com/SkeLLLa/fast-rbac'
homepage: 'https://www.comebackalive.in.ua/'
starredAt: '2020-09-03T17:29:20Z'
createdAt: '2019-05-31T14:07:55Z'
updatedAt: '2023-11-19T05:04:32Z'
language: TypeScript
license: MIT
branch: master
stars: 22
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:35.934Z'
description: Fast RBAC implementation for node.js and browsers.
tags:
  - acl
  - authorization
  - javascript
  - nodejs
  - rbac
---

# fast-rbac

<div align="center">
  <img src="https://gitlab.com/m03geek/fast-rbac/raw/master/rbac.logo.svg" width="300" height="auto"/>

[![NPM Version](https://img.shields.io/npm/v/fast-rbac.svg)](https://www.npmjs.com/package/fast-rbac)
[![Downloads Count](https://img.shields.io/npm/dm/fast-rbac.svg)](https://www.npmjs.com/package/fast-rbac)
[![Vunerabilities Count](https://snyk.io/test/npm/fast-rbac/badge.svg)](https://www.npmjs.com/package/fast-rbac)
[![Build Status](https://github.com/SkeLLLa/fast-rbac/workflows/build/badge.svg)](https://github.com/SkeLLLa/fast-rbac/commits/master)
[![License](https://img.shields.io/npm/l/fast-rbac.svg)](https://gitlab.com/m03geek/fast-rbac/blob/master/LICENSE)
[![Codecov Coverage](https://codecov.io/gh/SkeLLLa/fast-rbac/branch/master/graph/badge.svg?token=wLjMou8TT7)](https://codecov.io/gh/SkeLLLa/fast-rbac)
[![LGTM Alerts](https://img.shields.io/lgtm/alerts/github/SkeLLLa/fast-rbac.svg)](https://lgtm.com/projects/g/SkeLLLa/fast-rbac/)
[![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/github/SkeLLLa/fast-rbac.svg)](https://lgtm.com/projects/g/SkeLLLa/fast-rbac/)

<!-- [![Coverage Status](https://gitlab.com/m03geek/fast-rbac/badges/master/coverage.svg)](https://gitlab.com/m03geek/fast-rbac/commits/master) -->
</div>

Implementation of RBAC module tuned to be fast

Main rules:

- No RegEx
- O(1) time complexity for checking rules
- Wildcard and inherited rules caching
- No foolproof checks (use docs, jsdoc, types and implement those checks on your side if necessary)
- Zero dependency

## ToC

- [fast-rbac](#fast-rbac)
  - [ToC](#toc)
  - [Installation](#installation)
  - [Features and requirements](#features-and-requirements)
    - [Browser support](#browser-support)
    - [Benchmark results](#benchmark-results)
  - [Usage](#usage)
  - [ToDo List](#todo-list)
  - [Docs](#docs)
  - [Changelog](#changelog)
  - [Repos info](#repos-info)
  - [See also](#see-also)
  - [License](#license)

## Installation

```sh
npm i fast-rbac --save
```

<sub>[Back to top](#toc)</sub>

## Features and requirements

- Wildcard rules support
- Inheritance support
- Typescript support
- Prebuilt browser amd and system modules
- It's fast

---

- Node.js `>=8.0.0`.

### Browser support

For using this lib in browser it provides three options:

- AMD-style: `dist/browser/rbac.bundle.amd.js`
- System-style: `dist/browser/rbac.bundle.amd.js`
- ES6: `dist/browser/index.js` (`module` property is set for using with rollup and webpack)
- IIFE: `dist/browser/rbac.bundle.js` and `dist/browser/rbac.bundle.min.js` (not tested, it may not work properly)

### Benchmark results

So how fast is it? Here are results from simple benchmark with 3 roles.

```
@rbac/rbac x 46,003 ops/sec ±0.48% (87 runs sampled)
rbac:no_wildcard_support x 95,564 ops/sec ±1.55% (84 runs sampled)
easy-rbac x 45,884 ops/sec ±0.74% (89 runs sampled)
fast-rbac x 1,516,366 ops/sec ±0.38% (97 runs sampled)
fast-rbac:defer x 1,037,149 ops/sec ±0.71% (86 runs sampled)
```

Benchmark code is available in `benchmark` directory.

For more details refer to [benchmark doc](benchmark/BENCHMARK.md).

<sub>[Back to top](#toc)</sub>

## Usage

** NOTE **: No cyclic roles inheritance. You've been warned.

`can` method returns `boolean` if 3 arguments are passed to it.
It could return `Promise` if rule has `when` function and `context` is passed.
Even if your `when` function doesn't consume any arguments you need to pass context (e.g. `null` or `{}`) in order to execute it.
Whithout `context` the function `when` will be not executed and `can` will return `true`.

```js
import RBAC from 'fast-rbac';
// or
// const {RBAC} = require('fast-rbac');
// or
// const RBAC = require('fast-rbac').default;

const a = new RBAC({
  roles: {
    user: { can: ['cat:create', 'dog:*', { name: 'foo', operation: 'read' }] },
    prouser: { can: ['cat:update'], inherits: ['user', 'reader'] },
    admin: { can: ['*'] },
    reader: { can: ['*:read'], inherits: ['anon'] },
    anon: {
      can: [
        {
          name: '*:read',
          when: (ctx) => {
            const result: Promise<boolean> = new Promise((resolve) => {
              resolve(ctx.color === 'red');
            });
            return result;
          },
        },
      ],
    },
  },
});


console.log(a.can('user', 'dog', 'read')); // true

(async () => {
  console.log(await a.can('anon', 'cat', 'read', { color: 'red' })); // true
})();

a.add('someone', 'something', 'read');
console.log(a.can('someone', 'something', 'read')); // true
console.log(a.can('someone', 'something', 'write')); // false
a.remove('someone', 'something', 'read');
console.log(a.can('someone', 'something', 'read')); // false
```

<sub>[Back to top](#toc)</sub>

## ToDo List

PRs welcome!

- [x] Add/delete roles in runtime
- [x] Add some unit tests
- [ ] Add possibility to add/delete roles inherits
- [ ] Deal with circular role inheritance (but I'm totally ok with callstack error)

## Docs

See [docs](docs/README.md).

<sub>[Back to top](#toc)</sub>

## Changelog

See [changelog](CHANGELOG.md).

<sub>[Back to top](#toc)</sub>

## Repos info

- **Main** https://gitlab.com/m03geek/fast-rbac - preferred place for issues and PRs
- **Mirror** https://github.com/SkeLLLa/fast-rbac - only PRs accepted

<sub>[Back to top](#toc)</sub>

## See also

- [rbac](https://www.npmjs.com/package/rbac)
- [@rbac/rbac](https://www.npmjs.com/package/@rbac/rbac)
- [easy-rbac](https://www.npmjs.com/package/easy-rbac)

<sub>[Back to top](#toc)</sub>

## License

Licensed under [MIT](./LICENSE).

<sub>[Back to top](#toc)</sub>
