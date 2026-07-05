---
repo: jaydenseric/jsdoc-md
url: 'https://github.com/jaydenseric/jsdoc-md'
homepage: 'https://npm.im/jsdoc-md'
starredAt: '2021-06-18T00:25:47Z'
createdAt: '2018-06-21T14:12:09Z'
updatedAt: '2024-09-13T03:24:39Z'
language: JavaScript
license: MIT
branch: master
stars: 27
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:34.070Z'
description: >-
  A Node.js CLI and equivalent JS API to analyze source JSDoc and generate
  documentation under a given heading in a markdown file (such as readme.md).
tags:
  - babel
  - esm
  - jsdoc
  - maintained
  - markdown
  - mjs
  - node
  - npm
  - npx
  - remark
  - unified
---

![jsdoc-md logo](https://raw.githubusercontent.com/jaydenseric/jsdoc-md/a2ce08c27b4c4ffef7adc41d37f230594c17c467/jsdoc-md-logo.svg)

# jsdoc-md

[![npm version](https://badgen.net/npm/v/jsdoc-md)](https://npm.im/jsdoc-md) [![CI status](https://github.com/jaydenseric/jsdoc-md/workflows/CI/badge.svg)](https://github.com/jaydenseric/jsdoc-md/actions)

A [Node.js](https://nodejs.org) [CLI](#cli) and equivalent JS [API](#api) to analyze source JSDoc and generate documentation under a given heading in a markdown file (such as `readme.md`).

## Installation

To install with [npm](https://npmjs.com/get-npm), run:

```sh
npm install jsdoc-md --save-dev
```

Then, use either the [CLI](#cli) command [`jsdoc-md`](#command-jsdoc-md) or the JS [API](#api) function [`jsdocMd`](#function-jsdocmd) to generate documentation.

## CLI

### Command `jsdoc-md`

Analyzes JSDoc from source files nested in the current working directory to populate a markdown file documentation section. Source files are excluded via `.gitignore` files. If the optional peer dependency [`prettier`](https://npm.im/prettier) is installed, the new markdown file contents is [Prettier](https://prettier.io) formatted.

It implements the function [`jsdocMd`](#function-jsdocmd).

#### Arguments

| Argument | Alias | Default | Description |
| :-- | :-- | :-- | :-- |
| `--source-glob` | `-s` | `**/*.{mjs,cjs,js}` | JSDoc source file glob pattern. |
| `--markdown-path` | `-m` | `readme.md` | Path to the markdown file for docs insertion. |
| `--target-heading` | `-t` | `API` | Markdown file heading to insert docs under. |
| `--check` | `-c` |  | Should an error be thrown instead of updating the markdown file if the contents would change; useful for checking docs are up to date in CI. |

#### Examples

_Using [`npx`](https://docs.npmjs.com/cli/v8/commands/npx)._

> With defaults:
>
> ```sh
> npx jsdoc-md
> ```
>
> With arguments:
>
> ```sh
> npx jsdoc-md --source-glob **/*.{mjs,cjs,js} --markdown-path readme.md --target-heading API
> ```

_Using package scripts._

> [`package.json` scripts](https://docs.npmjs.com/cli/v8/using-npm/scripts) for a project that also uses [`eslint`](https://npm.im/eslint) and [`prettier`](https://npm.im/prettier):
>
> ```json
> {
>   "scripts": {
>     "docs-update": "jsdoc-md",
>     "docs-check": "jsdoc-md -c",
>     "eslint": "eslint .",
>     "prettier": "prettier -c .",
>     "test": "npm run eslint && npm run prettier && npm run docs-check",
>     "prepublishOnly": "npm test"
>   }
> }
> ```
>
> Run the `prettier` script before `docs-check` in the `test` script so [`prettier`](https://npm.im/prettier) reports formatting errors instead of `jsdoc-md`.
>
> Whenever the source JSDoc changes, run the `docs-update` script:
>
> ```sh
> npm run docs-update
> ```

## API

### function jsdocMd

Analyzes JSDoc from source files to populate a markdown file documentation section. Source files are excluded via `.gitignore` files. If the optional peer dependency [`prettier`](https://npm.im/prettier) is installed, the new markdown file contents is [Prettier](https://prettier.io) formatted.

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `options` | object? | Options. |
| `options.cwd` | string? | A directory path to scope the search for source and `.gitignore` files, defaulting to `process.cwd()`. |
| `options.sourceGlob` | string? = `**/*.{mjs,cjs,js}` | JSDoc source file glob pattern. |
| `options.markdownPath` | string? = `readme.md` | Path to the markdown file for docs insertion. |
| `options.targetHeading` | string? = `API` | Markdown file heading to insert docs under. |
| `options.check` | boolean? = `false` | Should an error be thrown instead of updating the markdown file if the contents would change; useful for checking docs are up to date in CI. |

**Returns:** Promise\<void> — Resolves once the operation is done.

#### Examples

_Ways to `import`._

> ```js
> import { jsdocMd } from "jsdoc-md";
> ```
>
> ```js
> import jsdocMd from "jsdoc-md/jsdocMd.mjs";
> ```

_Customizing options._

> ```js
> jsdocMd({
>   cwd: "/path/to/project",
>   sourceGlob: "index.mjs",
>   markdownPath: "README.md",
>   targetHeading: "Docs",
> }).then(() => {
>   console.log("Done!");
> });
> ```

## Caveats

### No code inference

Missing JSDoc tags are not inferred by inspecting the code, so be sure to use all the necessary tags.

```js
/**
 * The number 1.
 * @kind constant
 * @name ONE
 * @type {number}
 */
const ONE = 1;
```

### Tag subset

A JSDoc tag subset is supported:

- [`@desc`/`@description`](https://jsdoc.app/tags-description)
- [`@kind`](https://jsdoc.app/tags-kind)
- [`@name`](https://jsdoc.app/tags-name)
- [`@typedef`](https://jsdoc.app/tags-typedef)
- [`@callback`](https://jsdoc.app/tags-callback)
- [`@type`](https://jsdoc.app/tags-type)
- [`@prop`/`@property`](https://jsdoc.app/tags-property)
- [`@arg`/`@argument`/`@param`](https://jsdoc.app/tags-param)
- [`@return`/`@returns`](https://jsdoc.app/tags-returns)
- [`@emits`/`@fires`](https://jsdoc.app/tags-fires)
- [`@see`](https://jsdoc.app/tags-see)
- [`@example`](https://jsdoc.app/tags-example)
- [`@ignore`](https://jsdoc.app/tags-ignore)

### Namepath prefixes

Some [JSDoc namepath prefixes](https://jsdoc.app/about-namepaths) are not supported:

- [`module:`](https://jsdoc.app/tags-module)
- [`external:`](https://jsdoc.app/tags-external)

### Namepath special characters

[JSDoc namepath special characters](https://jsdoc.app/about-namepaths) with surrounding quotes and backslash escapes (e.g. `@name a."#b"."\"c"`) are not supported.

### Inline tags

One [JSDoc inline tag link](https://jsdoc.app/tags-inline-link) syntax is supported for namepath links in JSDoc descriptions and tags with markdown content: `` [`b` method]{@link A#b} ``. Use normal markdown syntax for non-namepath links.

Other inline tags such as [`{@tutorial}`](https://jsdoc.app/tags-inline-tutorial) are unsupported.

### Example content

[`@example`](https://jsdoc.app/tags-example) content outside `<caption />` (which may also contain markdown) is treated as markdown. This allows multiple code blocks with syntax highlighting and explanatory content such as paragraphs and images. For example:

````js
/**
 * Displays a message in a native popup window.
 * @kind function
 * @name popup
 * @param {string} message Message text.
 * @example <caption>Say `Hello!` to the user.</caption>
 * This usage:
 *
 * ```js
 * popup("Hello!");
 * ```
 *
 * Displays like this on macOS:
 *
 * ![Screenshot](path/to/screenshot.jpg)
 */
const popup = (message) => alert(message);
````
