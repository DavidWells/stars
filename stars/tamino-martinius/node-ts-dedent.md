---
repo: tamino-martinius/node-ts-dedent
url: 'https://github.com/tamino-martinius/node-ts-dedent'
homepage: ''
starredAt: '2022-03-24T17:08:20Z'
createdAt: '2018-06-14T05:06:35Z'
updatedAt: '2025-02-04T15:18:52Z'
language: TypeScript
license: MIT
branch: master
stars: 167
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:53.684Z'
description: >-
  TypeScript package which smartly trims and strips indentation from multi-line
  strings
tags:
  - dedent
  - deindent
  - indentation
  - multi-line-text
  - node
  - node-js
  - node-module
  - package
  - template-literals
  - typescript
---

# TypeScript Dedent

[![codecov](https://codecov.io/gh/tamino-martinius/node-ts-dedent/branch/master/graph/badge.svg)](https://codecov.io/gh/tamino-martinius/node-ts-dedent)

TypeScript package which smartly trims and strips indentation from multi-line strings.

## Usage Examples

```js
import { dedent } from 'ts-dedent';

console.log(dedent`A string that gets so long you need to break it over
                    multiple lines. Luckily dedent is here to keep it
                    readable without lots of spaces ending up in the string
                    itself.`);

console.log(dedent`
  A string that gets so long you need to break it over
  multiple lines. Luckily dedent is here to keep it
  readable without lots of spaces ending up in the string
  itself.
`);
```

```txt
A string that gets so long you need to break it over
multiple lines. Luckily dedent is here to keep it
readable without lots of spaces ending up in the string
itself.
```

---

```js
console.log(dedent`
  Leading and trailing lines will be trimmed, so you can write something like
  this and have it work as you expect:

    * how convenient it is
    * that I can use an indented list
        - and still have it do the right thing

  That's all.
`);
```

```txt
Leading and trailing lines will be trimmed, so you can write something like
this and have it work as you expect:

  * how convenient it is
  * that I can use an indented list
    - and still have it do the right thing

That's all.
```

---

```js
console.log(dedent`
  Also works fine

  ${1}. With any kind of
  ${2}. Placeholders
`);
```

```txt
Also works fine

1. With any kind of
2. Placeholders
```

---

```js
console.log(dedent(`
  Wait! I lied. Dedent can also be used as a function.
`);
```

```txt
Wait! I lied. Dedent can also be used as a function.
```

## License

MIT

## Based on

- [dedent](https://www.npmjs.com/package/dedent) by ~dmnd
- [dedent-js](https://www.npmjs.com/package/dedent-js) by ~martin-kolarik

## Changelog

See [history](HISTORY.md) for more details.

- `2.2.1` **2021-08-01** Update build dependencies and fixed typos in readme
- `2.2.0` **2021-08-01** Add indentation to values with multiline strings & added ESM module
- `2.1.1` **2021-03-31** Update build dependencies
- `2.1.0` **2021-03-24** Bugfixes
- `2.0.0` **2020-09-28** Bugfixes
- `1.2.0` **2020-09-28** Update build dependencies and a couple of minor improvments
- `1.1.0` **2019-07-26** Update build dependencies and fixed links in readme
- `1.0.0` **2018-06-14** Initial release
