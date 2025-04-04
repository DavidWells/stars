---
repo: giltayar/jsdoc-typing
url: 'https://github.com/giltayar/jsdoc-typing'
homepage: null
starredAt: '2021-05-20T19:36:04Z'
createdAt: '2020-12-13T14:49:04Z'
updatedAt: '2024-11-06T19:58:25Z'
language: JavaScript
license: NA
branch: master
stars: 36
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:39.754Z'
description: null
tags: []
---

# JSDoc Typing

Companion code to the "All the benefits of TypeScript, with none of the drawbacks" blog post
on <https://gils-blog.tayar.org>.

This repo is an example of how to use JSDoc to get all the benefits of TypeScript, without
the drawbacks of transpiling.

This package is an example package that both uses _and_ exports JSDoc typings.

The interesting things in this package are:

## Package.json

The `package.json` is where we tie everything together.

### `types` property

```json
  "types": "./types/jsdoc-typing.d.ts",
```

This property tells TypeScript where the type definitions file for this package is, so that if
another package `npm install`-s this package, it will find the type definitions. These
type definitions are generated by:

```json
  "scripts": {
    "build": "rm -rf types/* && tsc  --noEmit false --emitDeclarationOnly true && cp src/*.d.ts types",
  }
```

This `build` script first cleans the `types` folder, then generates the types using `tsc`,
and then copies the `.d.ts` files to the `types` directory because TypeScript doesn't.

Typechecking here is done in the `test` script by calling the TypeScript compiler, thus:

```json
  "scripts": {
    "test": "tsc",
  },
```

don't forget to `npm install --save-dev typescript` to get the compiler!

Last, but not least, we enable publishing the `types` directory so that importing packages
 will find it:

 ```json
   "files": [ "src", "types" ]
```

## tsconfig.json

The tsconfig.json is the file that defines how TypeScript typechecks the JS files:

```json
{
  "compilerOptions": {
    "lib": ["es2020", "DOM"],
    "moduleResolution": "node",
    "module": "CommonJS",
    "resolveJsonModule": true,
    "allowJs": true,
    "checkJs": true,
    "noEmit": true,
    "strict": true,
    "declarationDir": "types",
    "declaration": true
  },
  "include": ["src/**/*.js", "src/**/*.d.ts"],
  "exclude": ["node_modules"]
}
```

* `lib`: what JS intrinsics we're using. We use `DOM` here so that it can recognize `console`.
* `moduleResolution` and `module`: because we're working in CommonJS, we set these properties
  accordingly.
* `resolveJsonModule`: because we're using Node.js, and Node.js works with `require`-ing
  JSON modules, we allow this by setting it to `true`.
* `allowJS` and `checkJs`: enable us to typecheck JS files, and does it for all of them.
* `noEmit`: we're not transpiling files, so we don't want to emit any transpiled JS files.
* `strict`: this is a matter of opinion: how strict we want TypeScript to be.
   I want it to be as strict as possible, but up to you...
* `declarationDir` and `declaration`: we want to export `.d.ts` files, so we use these properties.
* `include` and `exclude`: which files we want to typecheck and which not. Don't forget to
   include the `.d.ts` files.

You can add other properties from the regular TypeScript `tsconfig.json`. You can find
the reference documentation for all properties [here](https://www.typescriptlang.org/tsconfig).

## global.d.ts

The `.d.ts` file in the `src` directory that includes the `declare module '...'` for all modules
that have no type definitions, so that TypeScript will not error when `require`-ing them.

## Other .d.ts files

Use other `.d.ts` files to export `interface`-s and other TypeScript type definitions that you
cannot define using JSDoc typings.

You are not allowed to add this to the a `.d.ts` file that includes `declare module` so keep
these separate from `global.d.ts`.
