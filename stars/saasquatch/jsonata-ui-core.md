---
repo: saasquatch/jsonata-ui-core
url: 'https://github.com/saasquatch/jsonata-ui-core'
homepage: null
starredAt: '2022-03-22T22:56:00Z'
createdAt: '2019-10-23T04:50:12Z'
updatedAt: '2025-02-20T13:36:43Z'
language: TypeScript
license: MIT
branch: main
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:55.283Z'
description: Core AST and serializers for jsonata-ui
tags: []
---

# jsonata-ui-core

[![npm version](https://badge.fury.io/js/jsonata-ui-core.svg)](https://badge.fury.io/js/jsonata-ui-core)

Core AST and serializers for jsonata-ui

```sh
npm install jsonata-ui-core
```

The core library includes a serializer to turning JSONata ASTs back into strings.

```js
import {serializer} from "jsonata-ui-core";
import jsonata from "jsonata"

const input = `a.b.c = "foo"`;
const ast = jsonata(input).ast();
const output = serializer(ast);
console.log("There and back again", input, output);
```
[![Edit jsonata serializer demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/jsonata-serializer-demo-q67m3?fontsize=14)

## Versions matching with JSONata

This library serializes ASTs, and aims to match versions numbers with jsonata-js. This is because the ASTs returned by jsonata vary significantly by version.

| [jsonata](https://www.npmjs.com/package/jsonata) | Jsonata-ui-core |
|---------|-----------------|
| 1.7.x   | 1.7.x           |
| <1.6.x  | Not supported   |


## Not Implemented

 - Some operators not yet implemented
 - Complex `thunk` functions: `λ($f) { λ($x) { $x($x) }( λ($g) { $f( (λ($a) {$g($g)($a)}))})}(λ($f) { λ($n) { $n < 2 ? 1 : $n * $f($n - 1) } })(6)`
 - Regex: `$matcher := /[a-z]*an[a-z]*/i`
 - Partial function application `( $first5 := $substring(?, 0, 5); $first5("Hello, World") )`
 - Transform operator: `| Account.Order.Product | {'Price': Price * 1.2} |`
 - Conditional without else: `Account ? null` vs `Account ? null : true`
 - Merged back into main `jsonata-js` package

 ## Sponsors
 
 Sponsored by [SaaSquatch](http://saasquatch.com). Loyalty, point and referral programs for forward-looking companies.
