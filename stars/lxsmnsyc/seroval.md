---
repo: lxsmnsyc/seroval
url: 'https://github.com/lxsmnsyc/seroval'
homepage: 'https://seroval.vercel.app'
starredAt: '2025-01-30T23:09:00Z'
createdAt: '2023-02-05T17:52:28Z'
updatedAt: '2025-02-25T13:25:52Z'
language: TypeScript
license: MIT
branch: main
stars: 548
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:09.053Z'
description: Stringify JS values
tags: []
---

# seroval

> Stringify JS values

[![NPM](https://img.shields.io/npm/v/seroval.svg)](https://www.npmjs.com/package/seroval) [![JavaScript Style Guide](https://badgen.net/badge/code%20style/airbnb/ff5a5f?icon=airbnb)](https://github.com/airbnb/javascript)

## Install

```bash
npm install --save seroval
```

```bash
yarn add seroval
```

```bash
pnpm add seroval
```

## Usage

```js
import { serialize } from 'seroval';

const object = {
  number: [Math.random(), -0, NaN, Infinity, -Infinity],
  string: ['hello world', '<script>Hello World</script>'],
  boolean: [true, false],
  null: null,
  undefined: undefined,
  bigint: 9007199254740991n,
  array: [,,,], // holes
  regexp: /[a-z0-9]+/i,
  date: new Date(),
  map: new Map([['hello', 'world']]),
  set: new Set(['hello', 'world']),
};

// self cyclic references
// recursive objects
object.self = object;
// recursive arrays
object.array.push(object.array);
// recursive maps
object.map.set('self', object.map);
// recursive sets
object.set.add(object.set);

// mutual cyclic references
object.array.push(object.map);
object.map.set('mutual', object.set);
object.set.add(object.array);

const result = serialize(object);
console.log(result);
```

Output (as a string):

```js
((h,j,k,m,o)=>(o={number:[0.5337763749243287,-0,0/0,1/0,-1/0],string:["hello world","\x3Cscript>Hello World\x3C/script>"],boolean:[!0,!1],null:null,undefined:void 0,bigint:9007199254740991n,array:h=[,,,,k=(j=[],new Map([["hello","world"],["mutual",m=new Set(["hello","world"])]]))],regexp:/[a-z0-9]+/i,date:new Date("2023-12-07T17:28:57.909Z"),map:k,set:m},h[3]=h,k.set("self",k),m.add(m).add(h),o.self=o,o))()

// Formatted for readability
((h, j, k, m, o) => (
  (o = {
    number: [0.5337763749243287, -0, 0 / 0, 1 / 0, -1 / 0],
    string: ["hello world", "\x3Cscript>Hello World\x3C/script>"],
    boolean: [!0, !1],
    null: null,
    undefined: void 0,
    bigint: 9007199254740991n,
    array: (h = [
      ,
      ,
      ,
      ,
      (k =
        ((j = []),
        new Map([
          ["hello", "world"],
          ["mutual", (m = new Set(["hello", "world"]))],
        ]))),
    ]),
    regexp: /[a-z0-9]+/i,
    date: new Date("2023-12-07T17:28:57.909Z"),
    map: k,
    set: m,
  }),
  (h[3] = h),
  k.set("self", k),
  m.add(m).add(h),
  (o.self = o),
  o
))();
```

## Docs

- [Serialization](https://github.com/lxsmnsyc/seroval/blob/main/docs/serialization.md)
- [Compatibility](https://github.com/lxsmnsyc/seroval/blob/main/docs/compatibility.md)
- [Isomorphic References](https://github.com/lxsmnsyc/seroval/blob/main/docs/isomorphic-refs.md)

## Sponsors

![Sponsors](https://github.com/lxsmnsyc/sponsors/blob/main/sponsors.svg?raw=true)

## License

MIT © [lxsmnsyc](https://github.com/lxsmnsyc)
