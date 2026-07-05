---
repo: WebReflection/proxy-target
url: 'https://github.com/WebReflection/proxy-target'
homepage: 'https://webreflection.medium.com/js-proxy-shenanigans-3c1c9452da60'
starredAt: '2024-03-04T17:29:10Z'
createdAt: '2023-11-18T20:27:27Z'
updatedAt: '2024-12-01T20:07:59Z'
language: JavaScript
license: MIT
branch: main
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:35.047Z'
description: A Proxy target common denominator for any kind of value.
tags:
  - javascript
  - proxy
---

# proxy-target

[![build status](https://github.com/WebReflection/proxy-target/actions/workflows/node.js.yml/badge.svg)](https://github.com/WebReflection/proxy-target/actions) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/proxy-target/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/proxy-target?branch=main)

A wrap/unwrap Proxy utility as answer to [these](https://es.discourse.group/t/the-array-isarray-shenanigans/1745) weird [limitations](https://es.discourse.group/t/proxy-drilling-once-again/1850).

This module allows any primitive to complex value to be proxied in a way that any handler can understand once the `unwrap(target)` operation is performed among actions:

  * *callbacks* remain callbacks and *arrays* remain arrays unless `proxy-target/array` is used
  * *primitives* and *null*, *undefined* or *object* generic types are preserved, among any other primitive, and return `{type: actualType, value: actualValue}` once wrapped

## Type / Value -> Wrap

| type          | value          | wrap                                    |
| :------------ | :------------- | :-------------------------------------- |
| `"array"`     | `[1, 2]`       | `[1, 2]` or `[[1,2]]` w/array           |
| `"bigint"`    | `1n`           | `{type: "bigint", value: 1n}`           |
| `"boolean"`   | `false`        | `{type: "boolean", value: false}`       |
| `"function"`  | `(a, b) => {}` | `(a, b) => {}` or `Ctx.bind(fn)` w/all  |
| `"null"`      | `null`         | `{type: "null", value: null}`           |
| `"number"`    | `1.2`          | `{type: "number", value: 1.2}`          |
| `"object"`    | `{a: 0}`       | `{type: "object", value: {a: 0}}`       |
| `"string"`    | `""`           | `{type: "string", value: ""}`           |
| `"symbol"`    | `Symbol()`     | `{type: "symbol", value: Symbol()}`     |
| `"undefined"` | `void 0`       | `{type: "undefined", value: undefined}` |
|               |                |                                         |
| `"custom"`    | `notArrOrFunc` | `{type: "custom", value: notArrOrFunc}` |

## Example / API

```js
import {
  bound,  // return a function that returns its bound context
  unbound,// if function, invokes it to return the context
  target, // create a `{type, value}` pair to proxy as target
  wrap,   // returns array, function, or a pair
  unwrap  // returns the wrapped value
} from 'proxy-target';

let proxied;

proxied = wrap([1, 2, 3]);
// remains [1, 2, 3]
unwrap(proxied);
// still [1, 2, 3]

// both wrap and unwrap accept an optional callback
// the returned value will the one returned by wrap
proxied = wrap({a: 1}, (type, value) => target(type, value));
// {type: "object", value: {a: 1}}
unwrap(proxied, (type, value) => value);
// {a: 1}

proxied = wrap(i => i + 123);
// remains i => i + 123
unwrap(proxied);
// i => i + 123

// bound / unbound
const callbacks = [
  a => a + 1,
  b => b + 2
];

proxied = wrap(
  callbacks[1],
  (type, value) => bound(
    target(type, callbacks.indexOf(value))
  )
);
// function () { return {type: "function", value: 1} );
unwrap(unbound(proxied), (type, value) => {
  return type === "function" ? callbacks[value] : value;
});
// b => b + 2


proxied = wrap(null);
// {type: "null", value: null}
unwrap(proxied);
// null

proxied = wrap(1);
// {type: "number", value: 1}
unwrap(proxied);
// 1

proxied = wrap(false);
// {type: "boolean", value: false}
unwrap(proxied);
// false

proxied = wrap(Symbol());
// {type: "symbol", value: thatSymbol}
unwrap(proxied);
// thatSymbol

// ... and so on ...
```
