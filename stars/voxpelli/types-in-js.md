---
repo: voxpelli/types-in-js
url: 'https://github.com/voxpelli/types-in-js'
homepage: ''
starredAt: '2020-12-13T02:57:04Z'
createdAt: '2020-12-09T11:06:54Z'
updatedAt: '2025-02-22T00:34:17Z'
language: null
license: CC0-1.0
branch: main
stars: 254
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:17.737Z'
description: Tips and tricks for working with types in JavaScript
tags:
  - badges
  - discussions
  - jsdoc
  - types-in-js
  - typescript
---

![](https://repository-images.githubusercontent.com/319930104/97292a80-409e-11eb-80f1-577cf14431cb)

# Types in JavaScript

If you love types but not transpiling, then using TypeScript itself won't be your cup of tea, but there are other approaches you can take to get pretty close.

## Participate

### Join our [GitHub discussions](https://github.com/voxpelli/types-in-js/discussions)!

This repo exists mainly to promote a discussion around this topic – exchange experiences, share best practices and tips and ask for help on tricky parts. The discussions is found in the [GitHub discussions](https://github.com/voxpelli/types-in-js/discussions) of this repo

### Is there a readme badge?

Yes! If you use types in plain JS in your project, you can include thise badge in your readme to let people know that your code is typed without relying on TypeScript syntax.

[![Types in JS](https://img.shields.io/badge/types_in_js-yes-brightgreen)](https://github.com/voxpelli/types-in-js)

```md
[![Types in JS](https://img.shields.io/badge/types_in_js-yes-brightgreen)](https://github.com/voxpelli/types-in-js)
```

## How to use types in JavaScript

[TypeScript supports JavaScript](https://www.typescriptlang.org/docs/handbook/intro-to-js-ts.html) and it supports quite a few [JSDoc annotations](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html) to help you type your JS code (some, like `@deprecated`, is even used in TS-code).

Since TypeScript is what drives the JavaScript tools in Visual Studio Code and [its intellisense](https://code.visualstudio.com/docs/nodejs/working-with-javascript#_intellisense) the implementation is actually used more than one would initially guess.

### Getting started

1. Add a [`tsconfig.json`](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html) with eg. [`allowJs: true`](https://www.typescriptlang.org/tsconfig#allowJs) ~~or add a [`jsconfig.json`](https://code.visualstudio.com/docs/languages/jsconfig) instead, which implies `allowJs: true`~~ _(Turns out that `jsconfig.json` implies a lot more than just `allowJs: true` and as such is not recommended. See discussion at https://github.com/voxpelli/types-in-js/discussions/25)_

2. Then point it to your javascript files by using [`files`](https://www.typescriptlang.org/tsconfig#files) and/or [`include`](https://www.typescriptlang.org/tsconfig#include) properties.

3. Lastly either set [`checkJs: true`](https://www.typescriptlang.org/tsconfig#checkJs) in it, to have all of those files checked, or selectively add `// @ts-check` to the top of the files you want to check.

4. (optional) Add some other useful / needed configurations, see [TSConfig tips](#tsconfig-tips).

4. (optional) Install [`typescript`](https://www.npmjs.com/package/typescript) locally in your project (`npm install typescript`), then validate your project using `npx tsc` ([`tsc`](https://www.typescriptlang.org/docs/handbook/compiler-options.html) is the name of the CLI supplied by `typescript`). `tsc` can preferably be run as a part of your test scripts, locally and on CI. See [CI / linting tips](#ci--linting--additional-tools)

## Articles around using types with JavaScript

* [TypeScript without TypeScript -- JSDoc superpowers](https://fettblog.eu/typescript-jsdoc-superpowers/) by [@ddprrt](https://github.com/ddprrt)

## TSConfig tips

See [open discussion](https://github.com/voxpelli/types-in-js/discussions/2) as well as [base configs](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html#tsconfig-bases) to extend from.

## CI / linting / additional tools

See [open discussion](https://github.com/voxpelli/types-in-js/discussions/3)

## JSDoc syntax tips

There's a [cheatsheet available](https://devhints.io/jsdoc)

## Managing third party dependencies

See [open discussion](https://github.com/voxpelli/types-in-js/discussions/7)

## Other good resources

* [DavidWells/types-with-jsdocs](https://github.com/DavidWells/types-with-jsdocs)
* [TypeScript JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html)
