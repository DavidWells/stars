---
repo: natemoo-re/require-or-import
url: 'https://github.com/natemoo-re/require-or-import'
homepage: null
starredAt: '2021-06-04T18:32:04Z'
createdAt: '2021-02-12T20:02:10Z'
updatedAt: '2021-06-05T15:40:35Z'
language: JavaScript
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:36.084Z'
description: null
tags: []
---

# Require or Import

Dynamically `require` CommonJS or `import` ECMAScript modules with consistent behavior.

## Why?

Node officially supports both CommonJS (CJS) and [ECMAScript modules](https://nodejs.org/api/esm.html) (ESM)! Unfortunately, there inherent inconsistencies between the two formats, which can become difficult when loading a file of an unknown format. 

This package attempts to smooth over those inconsistencies.

## What does it do?

**For authors of packages using native ECMAScript modules** `requireOrImport` does not introduce any new behavior. It wraps `import` as a convenience.

**For authors of packages using CommonJS modules** `requireOrImport` uses either `require` or `import` according to Node's interoperability [semantics](https://nodejs.org/api/esm.html#esm_interoperability_with_commonjs). `requireOrImport` loads CommonJS modules **as if they were loaded using `import`** in an ECMAScript module environment.

Specifically, `requireOrImport` is an asynchronous function which always loads CommonJS modules as a namespace with a `default` export key pointing to the CommonJS `module.exports` value, as defined by Node's [CommonJS Namespace](https://nodejs.org/api/esm.html#esm_commonjs_namespaces) behavior. Named exports are exposed using [`cjs-module-lexer`](https://github.com/guybedford/cjs-module-lexer/tree/master).

## Who should use this?

`requireOrImport` may be useful if you

- distribute both CommonJS and ECMAScript module entry points in your package
- distribute a compiled version of your sourcecode (although Node allows it, compilers tend to disallow mixed usage of `require` and `import`)
- need to load a file of an unknown format (like a user-supplied configuration file) and need that object to adhere to a consistent interface

## Example

When loaded with `requireOrImport()`, the following files all return `Promise<{ default: { test: 'abc' } }>`.


```
// test.cjs
module.exports = { test: 'abc' };
```

```
// test.mjs
export default { test: 'abc' };
```

```
// test.js below `package.json` with `"type": "commonjs"`
module.exports = { test: 'abc' };
```

```
// test.js below `package.json` with `"type": "module"`
export default { test: 'abc' };
```

When loaded with `requireOrImport()`, the following files all return `Promise<{ test: 'abc' }>`.

```
// test.cjs
exports.test = 'abc';
```

```
// test.mjs
export const test = 'abc';
```


```
// test.js below `package.json` with `"type": "commonjs"`
exports.test: 'abc';
```

```
// test.js below `package.json` with `"type": "module"`
export const test = 'abc';
```
