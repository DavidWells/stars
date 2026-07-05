---
repo: nickserv/cacheinfo
url: 'https://github.com/nickserv/cacheinfo'
homepage: 'https://npm.im/cacheinfo'
starredAt: '2022-10-20T00:15:08Z'
createdAt: '2022-10-04T19:45:03Z'
updatedAt: '2023-04-25T06:41:15Z'
language: TypeScript
license: NA
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:19.664Z'
description: Info about your JavaScript package manager cache sizes
tags:
  - diagnostics
  - info
  - reporting
---

# `cacheinfo`

Info about your JavaScript package manager cache sizes

## Usage

### CLI

```sh
npx cacheinfo
```

```
bower ... MB
bun ... MB
corepack ... MB
deno ... MB
npm ... MB
pnpm ... MB
yarn classic ... MB
yarn modern ... MB
```

### API

`cacheinfo` is a function that returns a `ReadableStream<[name: string, size: number]>` with the name and size (in bytes) of each package manager cache

```ts
import cacheinfo from "cacheinfo";

for await (const [name, size] of cacheinfo()) {
	// ...
}
```
