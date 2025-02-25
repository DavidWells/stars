---
repo: BeyondCodeBootcamp/js-with-types-jsdoc-tsc-starter
url: 'https://github.com/BeyondCodeBootcamp/js-with-types-jsdoc-tsc-starter'
homepage: null
starredAt: '2021-11-11T05:29:15Z'
createdAt: '2021-08-19T23:31:28Z'
updatedAt: '2025-02-24T15:08:14Z'
language: JavaScript
license: MPL-2.0
branch: main
stars: 19
isPublic: true
isTemplate: true
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:39.610Z'
description: >-
  A simple, but non-trivial example of getting the most from JSDoc + tsserver
  (Type Linting without TypeScript)
tags: []
---

# JSDoc-TypeScript + Node Starter

> A simple, but non-trivial example of getting the most from JSDoc + tsserver
> (Type Linting without TypeScript)

If you'd like to get the benefits of Type Linting without drinking the
TypeScript Kool-Aid, you're in the right place.

<a href="https://www.youtube.com/watch?v=TPoxoaS7N3w&list=PLxki0D-ilnqZfyo2dZe11ZNGP7RJxJcoA&index=18" target="_blank"><img src="https://user-images.githubusercontent.com/122831/130662033-d730d789-93b3-44b3-87fd-360b1168a634.jpg"></a>

This project has purposefully half-baked - meaning that errors exist on purpose
(with explanatory comments) - so that you can see the type linting in action!

<kbd><img width="819" alt="tsc type linting in action" src="https://user-images.githubusercontent.com/122831/130413852-cba0eed3-7a1c-4c49-9d0f-f8bf1716cbf7.png"></kbd>

## Table of Contents

<!-- TODO Key Benefits, VS Code -->

- Key Benefits
- Prerequisites
- Starter / Demo
- Key Components
- Key Configuration
- JSDoc Cheat Sheet
- Manual "From Scratch"
- Vim Configuration

## Key Benefits

You get benefits from both **explicit and implicit** type linting.

Here are some of the extra checks `tsserver` will give you that you wouldn't get
from `jshint` alone:

- [x] `require`ing a file that doesn't exist
- [x] access an `undefined` property
- [x] a property is only defined in an `if { ... }` condition
- [x] a method on a value from a function that sometimes returns `null`
- [x] IntelliSense / AutoCompletion

Even **if you don't use JSDoc** (or TypeScript Definitions) to add explicit
types, **you still get the benefits** of code analysis.

If you do add JSDoc type annotations to your JavaScript, you'll get even more
specific errors.

## Prerequisites

- `git`
- `node`
- `typescript` (and `jshint`)
- `vim-ale` (or VS Code)

You'll need `node`, `typescript` (`tsserver`), and `jshint`:

```bash
curl https://webinstall.dev/node@16 | bash
export PATH="${HOME}/.local/opt/node/bin:${PATH}"

npm install -g typescript
npm install -g jshint
```

If you're using **VS Code**, type linting is built-in. You don't need any
additional plugins, just configure `tsconfig.json` as mentioned below.

If you're using `vim` you'll also want
[`vim-ale`](https://webinstall.dev/vim-ale) (and probably the full set of
[`vim-essentials`](https://webinstall.dev/vim-essentials)), and update
`~/.vimrc` to use `typescript` (and `jshint`, if desired) as the linter.

```bash
curl https://webinstall.dev/vim-ale | bash
```

```vim
" also use tserver for linting JavaScript
let g:ale_linters = {
\  'javascript': ['tsserver', 'jshint']
\}
```

Alternatively, you can let `vim` load per-project config `.vimrc`:

```vim
set exrc
set secure
```

For other options see [.vimrc](/.vimrc).

## Starter / Demo

Clone the repo:

```bash
git clone https://github.com/BeyondCodeBootcamp/jsdoc-typescript-starter
```

Enter and install the dependencies (mostly type definitions):

```bash
pushd ./jsdoc-typescript-starter/
npm ci
```

Run `tsc` for a quick sanity check: \
(you should see a handful of errors scroll by)

```bash
tsc
```

With all that working, now open `server.js`, save (to kick off the linter), and
be amazed!

```bash
vim server.js
```

_Note: `tsserver` can take 10 - 30 seconds to boot on a VPS, and may not start
until after your first save (`:w`) in `vim`._

## Key Components

A typical project will look something like this:

```txt
.
├── server.js
├── lib/
│  ├── **/*.js
│  └── **/*.d.ts
├── node_modules/
│  ├── @types/ ("Definitely Typed" typings)
│  └── <whatever>/index.d.ts (may require "default imports")
├── tsconfig.json (JSON5)
├── typings/
│  └── express/
│     └── index.d.ts (TypeScript definitions)
└── types.js (global JSDOC)
```

We could break this down into 4 key components, which must be referenced in your
`tsconfig.json`:

1. Source code (JavaScript + JSDoc)
   ```txt
   .
   ├── server.js
   └── lib/
      ├── **/*.js
      └── **/*.d.ts
   ```
2. Local typings (JSDoc)
   ```txt
   .
   └── types.js
   ```
3. Typed Modules: \
   (modules that ship with types)
   ```bash
   npm install --save axios
   ```
   ```txt
   .
   └── node_modules/
       └── axios/
           └── index.d.ts (may be compiled from TS)
   ```
   Note: for modules that ship with types you may need to change how you require
   them to use the "default exports", (otherwise you may get _really_ weird type
   errors about missing methods, etc):
   ```diff
   - let axios = require('axios');
   + let axios = require('axios').default;
   ```
   (there are also some **special cases**, see below for examples)
4. "Definitely Typed" definitions: \
   (community-sourced _typings_ for popular packages)
   ```bash
   npm install --save-dev @types/express
   ```
   ```txt
   .
   └── node_modules/
       └── @types/
           └── express/
               └── index.d.ts (community-sourced type definitions)
   ```
5. Type overrides (Type Definitions)
   ```txt
   .
   └── typings/
      └── express/
         └── index.d.ts (TypeScript definitions)
   ```
   _Note: the `./typings` folder has three widely accepted naming conventions:
   named `./@types`, `./types`._

These **must be properly enumerated** in `tsconfig.json`:

## Key Configuration

1. `include` - this section must enumerate your _local types_ and _source code_:
   ```js
   {
       "...": "",
       "include": ["./types.js", "server.js", "lib/**/*.js"]
   }
   ```
2. `compilerOptions.typeRoots` should specify your _local overrides_ and
   _community type definitions_.
   ```js
   {
       "compilerOptions": {
           "typeRoots": ["./typings", "./node_modules/@types"]
       },
       "...": ""
   }
   ```
3. `compilerOptions` must be changed from the default setting in order to make
   `tsserver` behaver as a _linter for node_ rather than as a compiler for the
   browser TypeScript:
   ```json5
   {
       "compilerOptions": {
           "target": "ESNEXT",
           "module": "commonjs",
           // "lib": [],        // Leave this empty. All libs in 'target' will be loaded.
           "allowJs": true, // read js files
           "checkJs": true, // lint js files
           "noEmit": true,  // don't transpile
           "alwaysStrict": true, // assume "use strict"; whether or not its present
           "moduleResolution": "node", // expect node_modules resolution
           "esModuleInterop": true, // allow commonjs-style require
           "preserveSymlinks": false, // will work with basetag
           // I don't understand these well enough to tell you how to use them,
           // so I recommend that you don't (they may effect includes, excludes,
           // and typeRoots in expected/unintended ways).
           // "baseUrl": "./",
           // "paths": {},
           // "rootDirs": [],
           "...": ""
       },
       "...": ""
   }
   ```
   - Leave `compilerOptions.lib` commented out or empty. \
     (otherwise it will override `target`)
4. `compilerOptions.noImplicitAny` - this will strictly warn about all (untyped)
   JavaScript. You probably won't this off at first on existing projects - so
   that you only lint types that you've added and care about - and then turn it
   on after you've got the low hanging fruit.

   ```js
   {
       "compilerOptions": {

           "noImplicitAny": true,
           "...": ""
       },
       "...": ""
   }
   ```

   If this is a _new_ project, it's fine to turn on right away.
5. You may need to switch some `require`s to use the "default import", for example:
   ```diff
     // Example: axios is this way
   - let axios = require('axios');
   + let axios = require('axios').default;

    // Example: some modules are typed incorrectly and require some coaxing
   - let axiosRetry = require('axios-retry');
   + //@ts-ignore
   + require('axios-retry').default = require('axios-retry');
   + let axiosRetry = require('axios-retry').default;
   - let Papa = require('papaparse');
   + //@ts-ignore
   + require('papaparse').default = require('papaparse');
   + let Papa = require('papaparse').default;
   ```
   See https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/55420 to learn more.

<!-- TODO
           figure out if this is important:
           "maxNodeModuleJsDepth": 3, // will resolve dependencies of dependencies
-->

## JSDoc Cheat Sheet

See [./types.js](/types.js).

How to define a type and cast, and object as that type:

```js
/**
 * @typedef Thing
 * @property {string} id
 * @property {number} index
 * @property {Date} expires
 * @property {function} callback
 */

/**@type Thing*/
let thing = {
  id: 'id',
  index: 1,
  expires: new Date(),
  callback: function () {}
}
```

How to define a function

```js
/**
 * Does some stuff
 * @param {string} id
 * @returns {Promise<Thing>}
 */
async function doStuff(id) {
  // do stuff
  // ...
  return await fetchthing;
}
```

How to define a hashmap / dictionary / plain object:

```js
/**
 * @typedef Thing
 * ...
 * @property {Record<string, any>} stuff
 */
```

How to define an optional property, multiple types, and union type:

```js
/**
 * @typedef Thing
 * ...
 * @property {string} [middle_name]
 * @property {Array<Thing> | null} friends
 */
```

```js
/**
 * @typedef Foo
 * @property {string} foo
 */
 
/**
 * @typedef Bar
 * @property {string} bar
 */

/** @type {Foo & Bar} */
var foobar = { foo: "foo", bar: "bar" };

/** @typedef {Foo & Bar} FooBar */
/** @type {FooBar} */
var foobar = { foo: "foo", bar: "bar" };
```

## From Scratch

If you wanted to start a brand-new project from scratch, these are the steps you
would take:

```bash
npm install -g typescript
tsc --init

npm install --save-dev @types/node
npm install --save-dev @types/express
```

Here's the difference between the default `tsconfig.json` and the settings that
work for this project:

```diff
diff --git a/tsconfig.json b/tsconfig.json
index 35fc786..979a70d 100644
--- a/tsconfig.json
+++ b/tsconfig.json
@@ -2,11 +2,11 @@
   "compilerOptions": {

     // "incremental": true,
-    "target": "es5",
+    "target": "ESNEXT",
     "module": "commonjs",
     // "lib": [],
-    // "allowJs": true,
-    // "checkJs": true,
+    "allowJs": true,
+    "checkJs": true,
     // "jsx": "preserve",
     // "declaration": true,
     // "declarationMap": true,
@@ -17,13 +17,13 @@
     // "composite": true,
     // "tsBuildInfoFile": "./",
     // "removeComments": true,
-    // "noEmit": true,
+    "noEmit": true,
     // "importHelpers": true,
     // "downlevelIteration": true,
     // "isolatedModules": true,

     "strict": true,
-    // "noImplicitAny": true,
+    "noImplicitAny": false,
     // "strictNullChecks": true,
     // "strictFunctionTypes": true,
     // "strictBindCallApply": true,
@@ -43,11 +43,11 @@
-    // "moduleResolution": "node",
+    "moduleResolution": "node",
     // "baseUrl": "./",
     // "paths": {},
     // "rootDirs": [],
-    // "typeRoots": [],
+    "typeRoots": ["./typings", "node_modules/@types"],
     // "types": [],
     // "allowSyntheticDefaultImports": true,
     "esModuleInterop": true,
-    // "preserveSymlinks": true,
+    "preserveSymlinks": false,
     // "allowUmdGlobalAccess": true,

     // "sourceRoot": "",
@@ -60,5 +60,7 @@

     "skipLibCheck": true,
     "forceConsistentCasingInFileNames": true
-  }
+  },
+  "include": ["types.js", "server.js", "lib/**/*.js"],
+  "exclude": ["node_modules"]
 }
```

Again, **the #1 thing** is to make sure that `include` and `typeRoots` matches
how your project is set up. For this project it looks like this:

```js
{
    "compilerOptions": {
        // ...
       "typeRoots": ["./typings", "node_modules/@types"],
    },
    "include": ["types.js", "server.js", "lib/**/*.js"],
    // ...
}
```

If you decide to follow a different convention, name your things accordingly.
This is also valid, if it matches your project:

```js
{
    "compilerOptions": {
        // ...
       "typeRoots": ["./@types", "node_modules/@types"],
    },
    "include": ["**/*.js"],
    // ...
}
```

### TypeScript Checker CLI

`tsc` can show you the same errors that you'll see in VS Code or vim, but in all
files across your project at once.

To check that out, run `tsc` from the directory where `tsconfig.json` exists.

```bash
tsc
```

If you don't get error output, then ake user that `include` is set properly to
include all your code and JSDoc types, and that `typeRoots` is set to include
your type overrides.

### VS Code Configuration

VS Code has TypeScript built-in, no configuration is necessary aside from the
`tsconfig.json`.

### Vim Configuration

Assuming that you're using [`vim-ale`](https://webinstall.dev/vim-ale), the main
option you need to modify is the list of linters.

For example, you must have `tsserver`, and you may also want `jshint`:

```vim
let g:ale_linters = {
\  'javascript': ['tsserver', 'jshint']
\}
```

For other options see [.vimrc](/.vimrc)
