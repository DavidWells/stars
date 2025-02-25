---
repo: lukeed/rewrite-imports
url: 'https://github.com/lukeed/rewrite-imports'
homepage: ''
starredAt: '2018-11-16T18:57:28Z'
createdAt: '2017-07-25T22:17:29Z'
updatedAt: '2022-05-06T01:45:06Z'
language: JavaScript
license: MIT
branch: master
stars: 31
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:02.900Z'
description: Rewrite `import` statements as `require()`s; via RegExp
tags:
  - imports
  - javascript
  - regex
  - transpiler
---

# rewrite-imports [![CI](https://github.com/lukeed/rewrite-imports/actions/workflows/ci.yml/badge.svg)](https://github.com/lukeed/rewrite-imports/actions/workflows/ci.yml)

A tiny (349B) utility to transform various `import` statements into `require()` calls, using regular expressions.

> ***Looking for something _more_ backwards compatible?*** <br>
> Check out [`v1.4.0`](https://github.com/lukeed/rewrite-imports/tree/v1.4.0) which does not rely on destructured assignment!


## Caveats

This module returns a string and **does not** provide a runtime nor does it evaluate the output.

> :bulb: For this behavior, use [`rewrite-module`](https://github.com/lukeed/rewrite-module) or check out [`@taskr/esnext`](https://github.com/lukeed/taskr/tree/master/packages/esnext) for an example.

The output requires a JavaScript runtime that supports `require` calls and [destructuring assignments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment#Object_destructuring) with Objects.

  * At least `Node 6.x` is required

  * Or, for browsers:
    * A `require` shim is always needed – see [`fn`](#fn)
    * Ensure your target browsers support destructuring – see [chart](https://kangax.github.io/compat-table/es6/#test-destructuring,_assignment)

If you have [false positives](https://github.com/lukeed/rewrite-imports/issues/8), you may want to use an AST to find actual `import` statements before transformation.

> Check out an [example implementation](https://github.com/styleguidist/react-styleguidist/blob/82f22d217044dee6215e60696c39791ee168fc14/src/client/utils/transpileImports.js).


## Install

```
$ npm install --save rewrite-imports
```


## Usage

```js
import { rewrite } from 'rewrite-imports';
// or
const { rewrite } = require('rewrite-imports');

rewrite(`import foo from '../bar'`);
//=> const foo = require('../bar');

rewrite(`import { foo } from 'bar'`);
//=> const { foo } = require('bar');

rewrite(`import * as path from 'path';`);
//=> const path = require('path');

rewrite(`import { foo as bar, baz as bat, lol } from 'quz';`);
//=> const { foo:bar, baz:bat, lol } = require('quz');

rewrite(`import foobar, { foo as FOO, bar } from 'foobar';`);
//=> const foobar = require('foobar');
//=> const { foo:FOO, bar } = foobar;
```


## API

### rewrite(input, fn)

#### input
Type: `String`

The `import` statement(s) or the code containing `import` statement(s).

> See [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) for valid `import` statement syntax.

#### fn
Type: `String`<br>
Default: `'require'`

The `require`-like function name to use. Defaults to `require` but you may choose to pass the name of a custom shim function; for example, `__webpack_require__` may work for webpack in the browser.

## License

MIT © [Luke Edwards](https://lukeed.com)
