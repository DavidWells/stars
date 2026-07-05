---
repo: remorses/smart-glob
url: 'https://github.com/remorses/smart-glob'
homepage: ''
starredAt: '2021-11-21T07:11:53Z'
createdAt: '2020-07-11T10:25:25Z'
updatedAt: '2024-04-02T20:54:19Z'
language: TypeScript
license: NA
branch: master
stars: 26
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:37.409Z'
description: Glob search in constant time thanks to git cache
tags: []
---

# smart-glob

`smart-glob` exports 2 functions

-   `globWithGit` uses the git cache to search for files, the search time should be constant (around 40ms)
-   `glob` does a normal glob search, it also can ignore directories in the `ignore` field

Both functions are tested in unix and windows environments (in windows return paths with `\\` delimiter unless `alwaysReturnUnixPaths` is provided)

In [bump-version](https://github.com/remorses/bump-version) github action i reduced the glob search time form 50 seconds down to 13 seconds using `glob` and to 0.5 seconds using `globWithGit`

```
npm i smart-glob
```

## Usage

```js
import { glob, globWithGit } from 'smart-glob'

const paths = await globWithGit(path.resolve('./tests/**.ts'), {
    cwd: './someFolder',
    // ignore patterns in gitignore
    gitignore: true,
    // output paths are absolute paths
    absolute: true,
    // ignore certain directories
    ignoreGlobs: ['**/dir/**'],
})

const files = await glob('**', {
    gitignore: true, // add the ignore from the .gitignore in current path
    filesOnly: true,
    ignore: ['node_modules'],
})
```

## Cli

```
npm i -g smart-glob
smart-glob './tests/**/*.tsx'
```

## Benchmark

Here is a benchmark with other globs solutions run on this package folder ignoring the `node_modules` directory

You can find this benchmark in the `/tests` folder

```
benchmarks

tiny-glob: 360.615ms
    ✓ tiny-glob (361ms)
fast-glob: 14.863ms
    ✓ fast-glob
globby: 18.128ms
    ✓ globby
glob: 930.975ms
    ✓ glob (931ms)
smart-glob: 6.296ms
    ✓ smart-glob
smart-glob using git: 54.845ms
    ✓ smart-glob using git (55ms)
```

