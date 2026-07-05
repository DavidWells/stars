---
repo: getify/TypL
url: 'https://github.com/getify/TypL'
homepage: 'https://TypL.dev'
starredAt: '2020-10-23T15:32:28Z'
createdAt: '2019-01-25T20:57:25Z'
updatedAt: '2025-01-16T13:17:58Z'
language: JavaScript
license: MIT
branch: master
stars: 374
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:26.001Z'
description: The Type Linter for JS
tags:
  - assertion
  - javascript
  - linter
  - types
---

# TypL

The ***Typ***e ***L***inter for JS.

## Overview

**TypL** provides optional type annotations for JS programs, so you can verify that you haven't mixed incompatible value-types in any operations (which can cause bugs!). However, **TypL** takes a different approach from the more well-known [TypeScript](https://www.typescriptlang.org/) and [Flow](https://flow.org/) tools.

As a quick glance at the differences:

* not a typed-language variant of JS, but rather a (type) linter in the truest sense: **TypL** checks code against a set of opinions (that you control!) about how types should be treated in your program; with a **heavy emphasis on type inferencing**, you can run type linting on existing JS programs without any code changes

* for type annotations, uses only standard valid JS syntax (ES6 template tags), so type-annotated code can be executed without any compilation step if desired (as long as the runtime library is present)

* shifts focus from "typing your variables" to "typing your values and expressions"; variables optionally get assigned "implied types" from the annotated value-types

* provides compile-time static type checks as well as runtime dynamic type checks (assertions), both of which are optional

* completely configurable (like [ESLint](https://eslint.org/)), so you're always in control of what is reported as a type error or not -- for example, you decide if some specific type conversion/coercion is allowed, etc

TypL is still in early development. For more information, please see: [TypL.dev](https://typl.dev).

## Run

```
bin/typl --file=./some-code.js
```

or:

```
node ./lib/cli.js --file=./some-code.js
```

## Test

```
npm test
```

## Project Champions

I would like to thank the following people for their generous [sponsorship as a project champion](https://github.com/users/getify/sponsorship). You are awesome!

* [Judith Rohatiner @jrohatiner](https://github.com/jrohatiner)

## License

All code and documentation are (c) 2019 Kyle Simpson and released under the [MIT License](http://getify.mit-license.org/). A copy of the MIT License [is also included](LICENSE.txt).
