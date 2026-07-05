---
repo: velut/query-registry
url: 'https://github.com/velut/query-registry'
homepage: ''
starredAt: '2021-12-14T02:06:43Z'
createdAt: '2020-07-05T17:06:29Z'
updatedAt: '2025-02-21T19:56:43Z'
language: TypeScript
license: MIT
branch: main
stars: 31
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:29.020Z'
description: >-
  Query the npm registry for metadata, package documents, manifests, download
  counts and other data.
tags:
  - api
  - client
  - npm
  - package
  - packagejson
  - packument
  - query
  - registry
  - typescript
---

# query-registry

[![Build status](https://img.shields.io/github/actions/workflow/status/velut/query-registry/main.yml?branch=main)](https://github.com/velut/query-registry/actions?query=workflow%3ACI)
[![Coverage](https://img.shields.io/codecov/c/gh/velut/query-registry)](https://codecov.io/gh/velut/query-registry)
[![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-blue)](https://www.jsdocs.io/package/query-registry)
![Language](https://img.shields.io/github/languages/top/velut/query-registry)
[![npm](https://img.shields.io/npm/v/query-registry)](https://www.npmjs.com/package/query-registry)
[![License](https://img.shields.io/github/license/velut/query-registry)](https://github.com/velut/query-registry/blob/main/LICENSE)

`query-registry` is an API wrapper for the [npm registry API](https://github.com/npm/registry/blob/master/docs/REGISTRY-API.md).

## Features

- Provides functions to:
  - Get registry metadata.
  - Get registry public keys.
  - Get packuments (package documents) with full package metadata.
  - Get abbreviated packuments with installation data only.
  - Get package manifests for each version of a package.
  - Get download counts for the registry and for packages.
  - Search packages by name and other specific criteria.
- Works in the browser.
- Validates registry responses with [zod](https://www.npmjs.com/package/zod).
- Automatically caches registry responses for a short time.
- Supports third-party npm-compatible registries.

## Useful resources

- [**Explore the API on jsDocs.io**](https://www.jsdocs.io/package/query-registry)
- View package contents on [**unpkg**](https://unpkg.com/query-registry/)
- View repository on [**GitHub**](https://github.com/velut/query-registry)
- Read the changelog on [**GitHub**](https://github.com/velut/query-registry/blob/main/CHANGELOG.md)

## Install

Using `npm`:

```
npm add query-registry
```

Using `yarn`:

```
yarn add query-registry
```

Using `pnpm`:

```
pnpm add query-registry
```

Using `bun`:

```
bun add query-registry
```

## Usage examples

### Registry

Get the metadata about the npm registry itself, if available:

```typescript
import { getRegistryMetadata } from "query-registry";

const metadata = await getRegistryMetadata();
```

Get the public signing keys for the npm registry:

```typescript
import { getRegistrySigningKeys } from "query-registry";

const { keys } = await getRegistrySigningKeys();
```

### Packuments (Package documents)

Get the abbreviated packument containing only the necessary data to install the `react` package:

```typescript
import { getAbbreviatedPackument } from "query-registry";

const abbrPackument = await getAbbreviatedPackument("react");
```

Get the full packument containing all the data available about the `react` package:

```typescript
import { getPackument } from "query-registry";

const packument = await getPackument("react");
```

### Package manifests

Get the manifest containing the original `package.json` data plus additional registry metadata for the `latest` version of the `react` package:

```typescript
import { getPackageManifest } from "query-registry";

const manifest = await getPackageManifest("react");
```

Get the manifest for `react@18.2.0` (semver version):

```typescript
import { getPackageManifest } from "query-registry";

const manifest = await getPackageManifest("react", "18.2.0");
```

Get the manifest for `react@next` (distribution tag):

```typescript
import { getPackageManifest } from "query-registry";

const manifest = await getPackageManifest("react", "next");
```

### Search packages

Search packages related to `react` (e.g., `react`, `react-dom`, ...):

```typescript
import { searchPackages } from "query-registry";

const results = await searchPackages({ text: "react" });
```

### Download counts

Get the total number of downloads for package `react` for the last month:

```typescript
import { getPackageDownloads } from "query-registry";

const { downloads } = await getPackageDownloads("react", "last-month");
```

There are also these other download counts functions available: `getBulkDailyPackageDownloads`, `getBulkPackageDownloads`, `getDailyPackageDownloads`, `getDailyRegistryDownloads` and `getPackageVersionsDownloads`.

### Cache

Clear the internal cache.

```typescript
import { cache } from "query-registry";

cache.clear();
```

See the [quick-lru](https://www.npmjs.com/package/quick-lru) package for the cache API.

## License

```
MIT
```

Copyright (c) 2025 Edoardo Scibona

See [LICENSE](./LICENSE) file.
