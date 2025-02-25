---
repo: privatenumber/pkg-entry-points
url: 'https://github.com/privatenumber/pkg-entry-points'
homepage: ''
starredAt: '2023-05-19T20:59:06Z'
createdAt: '2023-05-16T04:52:56Z'
updatedAt: '2024-10-24T14:42:59Z'
language: TypeScript
license: MIT
branch: develop
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:49.336Z'
description: >-
  Get all entry-points for an npm package. Supports the `exports` field in
  `package.json`
tags:
  - entry-points
  - exports
  - nodejs
  - package-json
---

# pkg-entry-points

Get all entry-points for an npm package. Supports the [`exports` field](https://nodejs.org/api/packages.html#exports) to expand subpaths and condition combinations.

<br>

<p align="center">
	<a href="https://github.com/sponsors/privatenumber/sponsorships?tier_id=398771"><img width="412" src="https://raw.githubusercontent.com/privatenumber/sponsors/master/banners/assets/donate.webp"></a>
	<a href="https://github.com/sponsors/privatenumber/sponsorships?tier_id=397608"><img width="412" src="https://raw.githubusercontent.com/privatenumber/sponsors/master/banners/assets/sponsor.webp"></a>
</p>
<p align="center"><sup><i>Already a sponsor?</i> Join the discussion in the <a href="https://github.com/pvtnbr/pkg-entry-points">Development repo</a>!</sup></p>

## Install

```sh
npm install pkg-entry-points
```

## Usage

To get all entry-points for a package located at `./node_modules/my-package`:

```ts
import { getPackageEntryPoints } from 'pkg-entry-points'

const packageExports = await getPackageEntryPoints('./node_modules/my-package')

console.log(packageExports)

/*
{
    '.': [
        [conditions, internalPath],
    ],
    './entry-file': [
        [['types'], './dist/entry-file.d.ts'],
        [['import'], './dist/entry-file.mjs'],
        [['require'], './dist/entry-file.js'],
    ],
    ...,
}
*/
```

### Example: `vue` - using `exports` conditions
Entry-points evaluated from the [`vue` package](https://github.com/vuejs/core/blob/v3.3.2/packages/vue/package.json):

<details>
	<summary><code>vue</code> entry-points</summary>

```json5
{
    ".": [
        [["types"], "./dist/vue.d.ts"],
        [["require"], "./index.js"],
        [["import", "node"], "./index.mjs"],
        [["default", "import"], "./dist/vue.runtime.esm-bundler.js"]
    ],
    "./server-renderer": [
        [["types"], "./server-renderer/index.d.ts"],
        [["import"], "./server-renderer/index.mjs"],
        [["require"], "./server-renderer/index.js"]
    ],
    "./compiler-sfc": [
        [["types"], "./compiler-sfc/index.d.ts"],
        [["import"], "./compiler-sfc/index.mjs"],
        [["require"], "./compiler-sfc/index.js"]
    ],
    "./dist/vue.cjs.js": [
        [["default"], "./dist/vue.cjs.js"]
    ],
    "./dist/vue.cjs.prod.js": [
        [["default"], "./dist/vue.cjs.prod.js"]
    ],
    "./dist/vue.d.ts": [
        [["default"], "./dist/vue.d.ts"]
    ],
    "./dist/vue.esm-browser.js": [
        [["default"], "./dist/vue.esm-browser.js"]
    ],
    "./dist/vue.esm-browser.prod.js": [
        [["default"], "./dist/vue.esm-browser.prod.js"]
    ],
    "./dist/vue.esm-bundler.js": [
        [["default"], "./dist/vue.esm-bundler.js"]
    ],
    "./dist/vue.global.js": [
        [["default"], "./dist/vue.global.js"]
    ],
    "./dist/vue.global.prod.js": [
        [["default"], "./dist/vue.global.prod.js"]
    ],
    "./dist/vue.runtime.esm-browser.js": [
        [["default"], "./dist/vue.runtime.esm-browser.js"]
    ],
    "./dist/vue.runtime.esm-browser.prod.js": [
        [["default"], "./dist/vue.runtime.esm-browser.prod.js"]
    ],
    "./dist/vue.runtime.esm-bundler.js": [
        [["default"], "./dist/vue.runtime.esm-bundler.js"]
    ],
    "./dist/vue.runtime.global.js": [
        [["default"], "./dist/vue.runtime.global.js"]
    ],
    "./dist/vue.runtime.global.prod.js": [
        [["default"], "./dist/vue.runtime.global.prod.js"]
    ],
    "./package.json": [
        [["default"], "./package.json"]
    ],
    "./macros": [
        [["default"], "./macros.d.ts"]
    ],
    "./macros-global": [
        [["default"], "./macros-global.d.ts"]
    ],
    "./ref-macros": [
        [["default"], "./ref-macros.d.ts"]
    ]
}
```
</details>


### Example: `typescript` - no `exports` (legacy `main` field, etc.)
Entry-points evaluated from the [`typescript` package](https://github.com/microsoft/TypeScript/blob/v5.0.4/package.json):

<details>
	<summary><code>typescript</code> entry-points</summary>

```json5
{
    "./lib/cancellationToken.js": [
        [["default"], "./lib/cancellationToken.js"]
    ],
    "./lib/cs/diagnosticMessages.generated.json": [
        [["default"], "./lib/cs/diagnosticMessages.generated.json"]
    ],
    "./lib/de/diagnosticMessages.generated.json": [
        [["default"], "./lib/de/diagnosticMessages.generated.json"]
    ],
    "./lib/es/diagnosticMessages.generated.json": [
        [["default"], "./lib/es/diagnosticMessages.generated.json"]
    ],
    "./lib/fr/diagnosticMessages.generated.json": [
        [["default"], "./lib/fr/diagnosticMessages.generated.json"]
    ],
    "./lib/it/diagnosticMessages.generated.json": [
        [["default"], "./lib/it/diagnosticMessages.generated.json"]
    ],
    "./lib/ja/diagnosticMessages.generated.json": [
        [["default"], "./lib/ja/diagnosticMessages.generated.json"]
    ],
    "./lib/ko/diagnosticMessages.generated.json": [
        [["default"], "./lib/ko/diagnosticMessages.generated.json"]
    ],
    "./lib/pl/diagnosticMessages.generated.json": [
        [["default"], "./lib/pl/diagnosticMessages.generated.json"]
    ],
    "./lib/pt-br/diagnosticMessages.generated.json": [
        [["default"], "./lib/pt-br/diagnosticMessages.generated.json"]
    ],
    "./lib/ru/diagnosticMessages.generated.json": [
        [["default"], "./lib/ru/diagnosticMessages.generated.json"]
    ],
    "./lib/tr/diagnosticMessages.generated.json": [
        [["default"], "./lib/tr/diagnosticMessages.generated.json"]
    ],
    "./lib/tsc.js": [
        [["default"], "./lib/tsc.js"]
    ],
    "./lib/tsserver.js": [
        [["default"], "./lib/tsserver.js"]
    ],
    "./lib/tsserverlibrary.js": [
        [["default"], "./lib/tsserverlibrary.js"]
    ],
    "./lib/typesMap.json": [
        [["default"], "./lib/typesMap.json"]
    ],
    "./lib/typescript.js": [
        [["default"], "./lib/typescript.js"]
    ],
    "./lib/typingsInstaller.js": [
        [["default"], "./lib/typingsInstaller.js"]
    ],
    "./lib/watchGuard.js": [
        [["default"], "./lib/watchGuard.js"]
    ],
    "./lib/zh-cn/diagnosticMessages.generated.json": [
        [["default"], "./lib/zh-cn/diagnosticMessages.generated.json"]
    ],
    "./lib/zh-tw/diagnosticMessages.generated.json": [
        [["default"], "./lib/zh-tw/diagnosticMessages.generated.json"]
    ],
    "./package.json": [
        [["default"], "./package.json"]
    ],
    ".": [
        [["default"], "./lib/typescript.js"]
    ]
}
```
</details>

## API

### getPackageEntryPoints(packagePath, fs?)

Returns: `Promise<PackageEntryPoints>`

Type definitions:
```ts
type PackageEntryPoints = {
    [subpath: string]: ConditionToPath[]
}

type ConditionToPath = [conditions: string[], internalPath: string]
```

#### Description
Returns all possible entry-points of an npm package.

If the package has a `package.json#exports` property, it will return an object where the keys are expanded subpaths and the values are arrays of tuples containing an array of possible import combinations paired with the internal file path it resolves to.

If the package does not have an `exports` property, it will return an object where the keys are the internal file paths, mapping to arrays of possible import combinations.

#### Parameters

- `packagePath`

    Type: `string`

    Required

    The path to the package to get the exports for.

- `fs`

    Type: `typeof import('fs/promises')`

    Optional

    Default: `fs.promises`

    The file-system to use. Defaults to Node.js's `fs/promises` module.


## Sponsors
<p align="center">
	<a href="https://github.com/sponsors/privatenumber">
		<img src="https://cdn.jsdelivr.net/gh/privatenumber/sponsors/sponsorkit/sponsors.svg">
	</a>
</p>


## Related

### [resolve-pkg-maps](https://github.com/privatenumber/resolve-pkg-maps)

Utils to resolve `package.json` subpath & conditional [`exports`](https://nodejs.org/api/packages.html#exports)/[`imports`](https://nodejs.org/api/packages.html#imports) maps in resolvers.
