---
repo: evocateur/pectin
url: 'https://github.com/evocateur/pectin'
homepage: null
starredAt: '2020-09-23T00:09:16Z'
createdAt: '2018-08-31T21:38:28Z'
updatedAt: '2024-04-26T18:30:05Z'
language: TypeScript
license: ISC
branch: latest
stars: 58
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:29.709Z'
description: >-
  Rollup-related tools for incremental transpilation of packages in Lerna-based
  monorepos
tags:
  - cli
  - lerna
  - monorepo
  - rollup
  - rollup-plugin
---

# Pectin

> [Rollup][]-related tools for incremental transpilation of packages in [Lerna][]-based monorepos

[![npm version](https://img.shields.io/npm/v/pectin.svg)](https://www.npmjs.com/package/pectin)
[![Build Status](https://travis-ci.org/evocateur/pectin.svg?branch=latest)](https://travis-ci.org/evocateur/pectin)

## Getting Started

The easiest way to start using Pectin is to install the CLI and run it during an npm lifecycle, such as `"prerelease"`:

```sh
npm i -D pectin
```

In your monorepo's root `package.json` (aka "manifest"):

```json
{
    "scripts": {
        "clean": "git clean -fdx packages",
        "prerelease": "npm run clean && pectin",
        "release": "lerna publish",
        "lint": "eslint .",
        "pretest": "pectin && npm run lint",
        "test": "jest"
    }
}
```

Configured this way, you can always ensure your packages have the latest build output whenever anyone executes `npm run release` _or_ incrementally build recent changes before `npm test`.

Once installed locally, you can experiment with the CLI via `npx`:

```sh
npx pectin -h
```

To watch packages and rebuild on source change, pass `-w`, just like Rollup's CLI:

```sh
npx pectin -w
```

## Motivation

One advantage of a [Lerna][] monorepo is that you can reduce the amount of repetition between modules by running all development-related tasks (build, lint, test, and so on) from the root of the repository instead of each package one-by-one. This works fine for tools that are capable of running over many packages simultaneously without breaking a sweat, like `jest` and `eslint`.

Running Rollup builds over many different package roots, however, is a much trickier business. Pectin was built to facilitate running Rollup builds for all packages in a monorepo, with special consideration for unique monorepo circumstances such as incremental builds, npm lifecycle behavior, and per-package options.

For example, it isn't always the case that _every_ package in a monorepo actually needs to be rebuilt every time the build is run. Consider running `jest --watch` in a monorepo with 15 packages, but you're only working on one. The naïve approach finds all the packages and passes all of them to Rollup, which means Rollup builds for every package. Pectin optimizes this by testing the "freshness" of the built output against the source tree and only building when a file in the source tree has a more recent change (a higher `mtime`, for filesystem wizards).

Pectin's CLI was written to seamlessly wrap `rollup`. It helps avoid, among other things, Rollup's CLI emitting a warning and exiting non-zero when you pass an empty array (that is, no changes since the last build) to Rollup via the default export of `rollup.config.js`. Pectin's CLI supports all options supported by Rollup's CLI.

## Contributing

Please note that this project is released with a [Contributor Code of Conduct](./CODE_OF_CONDUCT.md).
By participating in this project you agree to abide by its terms.

## Packages

-   [`@pectin/api`](./packages/pectin-api#readme)
-   [`@pectin/babelrc`](./packages/pectin-babelrc#readme)
-   [`@pectin/core`](./packages/pectin-core#readme)
-   [`pectin`](./packages/pectin#readme)
-   [`rollup-config-pectin`](./packages/rollup-config-pectin#readme)
-   [`rollup-plugin-main-entry`](./packages/rollup-plugin-main-entry#readme)
-   [`rollup-plugin-subpath-externals`](./packages/rollup-plugin-subpath-externals#readme)

## Customizing Plugins

When calling the `pectin` CLI, there is no support for adding plugins beyond those already included.
However, as `pectin` is _mostly_ just a fancy wrapper around the `rollup` CLI, it is possible to generate Rollup config programmatically and simulate the "lazy build" behavior of `pectin`.

First, create a `rollup.config.js` in the root of your monorepo:

```js
import * as path from 'path';
import { findConfigs } from '@pectin/api';
import visualizer from 'rollup-plugin-visualizer';

export default findConfigs().then(configs =>
    configs.map(cfg => {
        const {
            // format can be 'cjs', 'esm', or 'umd'
            format,
            // absolute directory from pkg.main,
            // e.g. '<root>/packages/<pkg>/dist'
            dir: outputDir,
        } = cfg.output[0];

        // plugins are assigned per-format, as certain
        // formats require different plugin configuration
        if (format === 'esm') {
            cfg.plugins.push(
                visualizer({
                    filename: path.join(outputDir, 'stats.html'),
                })
            );
        }

        return cfg;
    })
);
```

Then change any references to `pectin` in your npm scripts to `rollup -c`:

```json
{
    "scripts": {
        "build": "rollup -c || echo 'no changed packages to build, probably?'",
        "watch": "rollup -c -w"
    }
}
```

The caveat highlighted by the `||` alternation above is that `rollup` will complain if the array generated by `findConfigs()` is empty, and exits non-zero. Unless caught by the `||`, `npm run build` would exit with an error.

## Ignoring Packages

If you have a package that you do not want Pectin to build, you can add the following to its `package.json`:

```json
"rollup": {
    "skip": true
}
```

## Related

-   [Lerna][]
-   [Rollup][]

[lerna]: https://github.com/lerna/lerna#readme
[rollup]: https://github.com/rollup/rollup#readme
