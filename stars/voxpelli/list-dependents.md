---
repo: voxpelli/list-dependents
url: 'https://github.com/voxpelli/list-dependents'
homepage: ''
starredAt: '2025-02-27T00:11:30Z'
createdAt: '2024-04-02T18:27:07Z'
updatedAt: '2025-02-27T14:31:37Z'
language: JavaScript
license: MIT
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-03-01T22:29:47.339Z'
description: 'Lists all dependents of a project, using npm or ecosyste.ms'
tags: []
---

# list-dependents

Lists all dependents of a project, using npm and [`ecosyste.ms`](https://ecosyste.ms/)

[![npm version](https://img.shields.io/npm/v/list-dependents.svg?style=flat)](https://www.npmjs.com/package/list-dependents)
[![npm downloads](https://img.shields.io/npm/dm/list-dependents.svg?style=flat)](https://www.npmjs.com/package/list-dependents)
[![neostandard javascript style](https://img.shields.io/badge/code_style-neostandard-7fffff?style=flat&labelColor=ff80ff)](https://github.com/neostandard/neostandard)
[![Module type: ESM](https://img.shields.io/badge/module%20type-esm-brightgreen)](https://github.com/voxpelli/badges-cjs-esm)
[![Types in JS](https://img.shields.io/badge/types_in_js-yes-brightgreen)](https://github.com/voxpelli/types-in-js)
[![Follow @voxpelli@mastodon.social](https://img.shields.io/mastodon/follow/109247025527949675?domain=https%3A%2F%2Fmastodon.social&style=social)](https://mastodon.social/@voxpelli)

## Usage

### Simple

```javascript
import { fetchEcosystemDependents } from 'list-dependents';

const result = fetchEcosystemDependents(name);

for await (const { downloads, name, pkg } of fetchEcosystemDependents('npm-run-all2')) {
  console.log(downloads, name, pkg.description);
}
```

### Advanced

See [`examples/cli.js`](./examples/cli.js)

## API

### fetchEcosystemDependents()

Uses the [`ecosyste.ms`](https://ecosyste.ms/) API to resolve packages of dependents

#### Syntax

```ts
fetchEcosystemDependents(name, [options]) => AsyncGenerator<EcosystemDependentsItem>
```

#### Arguments

* `name` – _`string`_ – the name of the package to do the lookup for
* `options` – _[`EcosystemDependentsOptions`](#ecosystemdependentsoptions)_ – optional options

#### EcosystemDependentsOptions

* `filter` – _`(meta: EcosystemDependentsMeta) => boolean`_ – function given [`EcosystemDependentsMeta`](#ecosystemdependentsmeta) and should return `true` for the package to be included
* `logger` – _[`BunyanLite`](https://github.com/voxpelli/node-bunyan-adaptor#bunyanlite--simplified-pino--bunyan-type-subsets)_ – a logger instance
* `maxAge` – _`number`_ – the maximum age of latest release to include
* `maxPages` – _`number`_ – the maximum number of source pages to fetch (there are `perPage` items per page)
* `minDownloadsLastMonth = 400` – _`number`_ – the minimum amount of downloads needed to be returned
* `perPage = 36` – _`number`_ – how many items per page to lookup
* `skipPkg` – _`boolean`_ – when set skips resolving `package.json`

#### Returns

An [`AsyncGenerator`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AsyncGenerator) that yields [`EcosystemDependentsItem`](#ecosystemdependentsitem) objects

### fetchEcosystemPackage()

Uses the [`ecosyste.ms`](https://ecosyste.ms/) API to resolve a package

#### Syntax

```ts
fetchEcosystemPackage(name, [options]) => Promise<EcosystemDependentsItem|false|undefined>
```

#### Arguments

* `name` – _`string`_ – The name of the package to do the lookup for
* `options` – _[`PackageLookupOptions`](#packagelookupoptions)_ – optional options

#### PackageLookupOptions

* `client` – _[`got`](https://github.com/sindresorhus/got)_ – a client to use for HTTP requests
* `ecosystemsClient` – _[`got`](https://github.com/sindresorhus/got)_ – a client to use for HTTP requests to ecosyste.ms
* `dependentOn` – _`string`_ – ensure the package depends on this module. Only works when `package.json` is fetched.
* `filter` – _`(meta: EcosystemDependentsMeta) => boolean`_ – function given [`EcosystemDependentsMeta`](#ecosystemdependentsmeta) and should return `true` for the package to be included
* `logger` – _[`BunyanLite`](https://github.com/voxpelli/node-bunyan-adaptor#bunyanlite--simplified-pino--bunyan-type-subsets)_– a logger instance
* `skipPkg` – _`boolean | (meta: EcosystemDependentsMeta) => boolean`_ – when `true` skips resolving `package.json`
* `userAgent` – _`string`_ – an additional more specific user agent to preceed the built in one in the [`User-Agent`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) header of requests

#### Returns

A promise resolving to `false` if the package is actively excluded, `undefined` if it couldn't be resolved and else [`EcosystemDependentsItem`](#ecosystemdependentsitem)

### createPackageFetchQueue()

Returns a [`fetchEcosystemPackage`](#fetchecosystempackage) equivalent that enforces a maximum concurrent fetches to npm + shares the back-off between all fetches, respecting the [`Retry-After`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Retry-After) response headers.

#### Syntax

```ts
const fetchPackage = createPackageFetchQueue([queueOptions]);
const package = await fetchPackage(name, [options]);
```

#### Arguments

* `queueOptions` – _[`PackageFetchQueueOptions`](#packagefetchqueueoptions)_ – optional options

#### PackageFetchQueueOptions

* `client` – _[`got`](https://github.com/sindresorhus/got)_ – a client to use for HTTP requests
* `logger` – _[`BunyanLite`](https://github.com/voxpelli/node-bunyan-adaptor#bunyanlite--simplified-pino--bunyan-type-subsets)_– a logger instance
* `userAgent` – _`string`_ – an additional more specific user agent to preceed the built in one in the [`User-Agent`](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) header of requests

#### Returns

A function equal to [`fetchEcosystemPackage`](#fetchecosystempackage) except that the `client`, `ecosystemClient`, `logger` and `userAgent` is overriden by the values sent in when it was created

## Types

### DependentsMeta

```ts
export interface DependentsMeta {
  downloads: number;
  name: string;
}
```

### DependentsItem

```ts
import type { NormalizedPackageJson } from 'read-pkg';

export interface DependentsItem extends DependentsMeta {
  pkg?: NormalizedPackageJson | undefined;
  targetVersion?: string | undefined,
}
```

### EcosystemDependentsMeta

```ts
export interface EcosystemDependentsMeta extends DependentsMeta {
  dependentCount: number | undefined,
  firstRelease: string | undefined,
  latestRelease: string | undefined,
  latestVersion: string | undefined,
  repositoryUrl: string | undefined;
}
```

### EcosystemDependentsItem

```ts
export interface EcosystemDependentsItem extends DependentsItem, EcosystemDependentsMeta {}
```

## Similar modules

* [`dependents`](https://github.com/pkgjs/dependents) – uses [`npm-dependants`](https://github.com/juliangruber/npm-dependants) together with the npm API and GitHub API to deliver a functionality similar to [`fetchEcosystemDependents()`](#fetchecosystemdependents) / [`fetchNpmDependents()`](#fetchnpmdependents)
* [`list-installed`](https://github.com/voxpelli/list-installed) – sister module to this module – similar API but resolves locally installed modules rather than remote dependents
* [`npm-dependants`](https://github.com/juliangruber/npm-dependants) – similar in functionality to [`fetchNpmDependentList()`](#fetchnpmdependentlist)

<!-- ## See also

* [Announcement blog post](#)
* [Announcement tweet](#) -->
