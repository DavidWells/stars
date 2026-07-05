---
repo: vitalets/throw-utils
url: 'https://github.com/vitalets/throw-utils'
homepage: ''
starredAt: '2022-02-18T06:11:07Z'
createdAt: '2018-11-22T17:46:49Z'
updatedAt: '2023-08-18T09:08:08Z'
language: TypeScript
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:19.007Z'
description: Helpers for error throwing
tags:
  - throw
  - throw-errors
---

# throw-utils

[![Actions Status](https://github.com/vitalets/throw-utils/workflows/autotests/badge.svg)](https://github.com/vitalets/throw-utils/actions)
[![npm](https://img.shields.io/npm/v/throw-utils.svg)](https://www.npmjs.com/package/throw-utils)
[![license](https://img.shields.io/npm/l/throw-utils.svg)](https://www.npmjs.com/package/throw-utils)

Tiny helpers for error throwing.

<!-- AUTO-GENERATED-CONTENT:START (TOC) -->
- [Installation](#installation)
- [Use Cases](#use-cases)
- [API](#api)
  - [throwError](#throwerror)
  - [throwIf](#throwif)
  - [toError](#toerror)
- [License](#license)
<!-- AUTO-GENERATED-CONTENT:END -->

## Installation
```bash
npm i throw-utils
```

## Use Cases

1. Assign value or throw error if value is empty:
   ```diff
   import { throwError } from 'throw-utils';

   - if (!process.env.FOO) {
   -   throw new Error('FOO is not defined');
   - }
   - const foo = process.env.FOO;

   + const foo = process.env.FOO || throwError('FOO is not defined');
   ```

2. Return result from function or throw error if result is empty:
   ```diff
   import { throwIf } from 'throw-utils';

   function foo(a) {
   - if (!a) {
   -   throw new Error('Parameter a is required.');
   - }
   - return result;

   + return result || throwError('Empty result');
   }
   ```

3. Check function parameters in single line:
   ```diff
   import { throwIf } from 'throw-utils';

   function f(a) {
   - if (!a) {
   -   throw new Error('Parameter a is required.');
   - }

   + throwIf(!a, 'Parameter a is required.');
   }
   ```

## API
<!-- AUTO-GENERATED-CONTENT:START (API) -->
### throwError

Throws new error. Allows simple usage of `throw` in expressions and arrow functions.

| Function | Type |
| ---------- | ---------- |
| `throwError` | `(msg: ErrorLike) => never` |

### throwIf

Conditionally throws error. Convenient replacement of `if...throw` block with one-liner:

| Function | Type |
| ---------- | ---------- |
| `throwIf` | `(condition: unknown, msg: ErrorLike) => void` |

### toError

Converts anything to Error.

| Function | Type |
| ---------- | ---------- |
| `toError` | `(msg: ErrorLike) => Error` |
<!-- AUTO-GENERATED-CONTENT:END -->

## License
MIT @ [Vitaliy Potapov](https://github.com/vitalets)
