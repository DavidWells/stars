---
repo: sophiabits/ksuid-edge
url: 'https://github.com/sophiabits/ksuid-edge'
homepage: null
starredAt: '2024-05-02T22:17:50Z'
createdAt: '2023-07-27T10:13:13Z'
updatedAt: '2025-02-19T18:40:54Z'
language: TypeScript
license: NOASSERTION
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:30.977Z'
description: Edge and browser-compatible KSUID generator
tags: []
---

# ksuid-edge

A drop-in replacement for the excellent [`ksuid`](https://www.npmjs.com/ksuid) module for environments that don't have `Buffer` or `node:util`.

## Installation

```
$ pnpm add ksuid-edge
```

## Usage

The API should be 1:1 compatible with `ksuid`. Check out their usage instructions [here](https://github.com/novemberborn/ksuid#usage) for a more detailed run-through of the API.

```ts
import KSUID from 'ksuid';

const ksuidFromSync = KSUID.randomSync();
console.log(ksuidFromSync.toString()) // "KSUID { 2T9QkbWRq71cvp0KeN5YZJo9Kpu }"
```
