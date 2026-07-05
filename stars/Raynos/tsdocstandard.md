---
repo: Raynos/tsdocstandard
url: 'https://github.com/Raynos/tsdocstandard'
homepage: ''
starredAt: '2020-06-09T04:53:36Z'
createdAt: '2020-04-30T20:57:24Z'
updatedAt: '2024-12-20T06:24:25Z'
language: JavaScript
license: MIT
branch: master
stars: 35
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:49.610Z'
description: Standard but also use TypeScript on JS files with jsdoc.
tags: []
---

# TSDoc Standard

### Standard but also use TypeScript on JS files with jsdoc.

This `standard` configuration understands that you want to use
typescript on `.js` files using `jsdoc` / `tsdoc` syntax.

The `eslint` configuration knows all about `jsdoc` & `typescript`
to give you improved type safety on `.js` files with `jsdoc`
annotations.

## Motivation

This `tsdocstandard` is here to help you convert a `standard`
JavaScript project into a JavaScript + jsdoc + typescript project.

To use `tsdocstandard` you do need some dependencies, namely
`npm install -D typescript` and a `./tsconfig.json` file.

Here is an example [`tsconfig.json`](https://github.com/Raynos/tsdocstandard/blob/master/tsconfig.json)

Once you run `tsdocstandard` expect to get 100 warnings about
missing jsdoc annotations. That's the point, it will help you
convert your JavaScript to typed JavaScript with jsdoc comments.

Once you fix all the missing annotations expect almost 100%
`type-coverage` ; ( You can measure it with the
[`type-coverage`](https://github.com/plantain-00/type-coverage)
library ).

## Comparison with ts-standard

There's also a [ts-standard](https://github.com/toddbluhm/ts-standard) linter.
However, that is meant to lint `*.ts` typescript files. This project `tsdocstandard`
is to lint `*.js` files used with `tsc --checkJs`

## Why use JS+JSDoc over TS ?

I found JS+JSDoc a better fit for open source libraries published to npm.
TS is probably fine for a closed source app or server.

 - Using JS makes the package.json 10x simpler ( https://github.com/Raynos/fake-kms/pull/1/files#diff-b9cfc7f2cdf78a7f4b91a753d10865a2 )
 - No build step during development
 - External contributors for my library can just write JS, largest pool of possible contributors ( same reason i dont author/publish coffeescript )
 - The published artifact to npm is the one I wrote and is not some "compiled JS" output. Aka no source maps.
 - In general there are far fewer files checked into git with JS+JSDoc for a library published to npm.

## Usage

To use `tsdocstandard` you want to replace `standard` with `tsdocstandard`
and also install `typescript`

```sh
npm install tsdocstandard typescript -D
tsc && tsdocstandard
```

Since `tsdocstandard` relies on typescript in jsdoc you want to
make sure your codebase "type checks" with `tsc` before running
the linter with `tsdocstandard` otherwise some lint rules will
fail due to a typescript type checking error.

To use typescript you need a `tsconfig.json`; for example you can use

```json
{
  "compilerOptions": {
    "types": ["node"],
    "lib": ["es2018"],
    "noEmit": true,
    "module": "commonjs",
    "allowJs": true,
    "checkJs": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitReturns": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "strict": true,
    "baseUrl": "./",
    "paths": {
      "*" : ["./types/*"]
    }
  },
  "include": [
    "types/**/*.d.ts",
    "*.js",
    "test/**/*.js"
  ]
}
```

## Migration

If you want to migrate a larger codebase one file at it's
recommended you install both `standard` & `tsdocstandard`.

Then use the `tsdocstandard` & `standard` keys in package.json

```json
{
  "tsdocstandard": {
    "ignore": [
      "old-code.js"
    ]
  },
  "standard": {
    "ignore": [
      "new-code.js"
    ]
  }
}
```

Basically run both linters and ignore the files that have and
have not been migrated.

## Install

```bash
npm install -D typescript # dependency
npm install -D tsdocstandard
```

## Status (Unstable)

Currently `tsdocstandard` is used in multiple repositories. I've
applied it to existing TS code as well as added to a vanilla JS
code.

 - https://github.com/Raynos/tapzero (16.1.0) (ported from TS => JSDoc)
 - https://github.com/Raynos/fake-cloudwatch-logs (16.1.0) (ported from TS => JSDoc)
 - https://github.com/Raynos/sync-wait-group (16.1.0) (ported from TS => JSDoc)
 - https://github.com/Raynos/fake-ses (15.4.2) (ported from TS => JSDoc)
 - https://github.com/Raynos/fake-kms (15.4.2) (ported from TS => JSDoc)
 - https://github.com/Raynos/error (15.2.2) (ported from JS => JSDoc)
 - https://github.com/Raynos/fake-lambda-api (15.5.2) (written in JSDoc from scratch)
 - https://github.com/Raynos/fake-s3 (15.7.1) (ported from JS => JSDoc)
 - https://github.com/optoolco/fake-aws (15.7.1) (written in JSDoc)

I need to use this ruleset on a larger set of javascript files
before I will be happy with it.

Any and all feedback is useful in issues or PRs

## Known issues

There are limitations with the following rules

 - `no-unsafe-assignment` ( https://github.com/typescript-eslint/typescript-eslint/issues/1943 )
 - `no-invalid-void-type` ( https://github.com/typescript-eslint/typescript-eslint/pull/1960 )

## How to ignore files

Add a `tsdocstandard` key like documented for `standard`
https://standardjs.com/#how-do-i-ignore-files

## How to use in text editor.

I have `standard` vscode installed. You can configure it on a
per project basis whether to use `standard`; `semistandard` or
`standardx`. However if you edit the JSON file you can enter
an arbitrary string like `tsdocstandard`.

As long as you install `tsdocstandard` globally and edit the
VS code extension configuration to use the `tsdocstandard` engine
which requires editing JSON as the UI only has three items in
the dropdown.

## Rules

Importantly:

 - `jsdoc`
 - `@eslint-typescript`

There's lots of rules. Plus `standard` as well.

## Usage

Literally just like [`standard`](http://ghub.io/standard)
