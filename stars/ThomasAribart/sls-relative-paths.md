---
repo: ThomasAribart/sls-relative-paths
url: 'https://github.com/ThomasAribart/sls-relative-paths'
homepage: null
starredAt: '2024-08-30T01:28:07Z'
createdAt: '2022-08-21T10:20:29Z'
updatedAt: '2024-08-30T01:28:07Z'
language: TypeScript
license: NA
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:24.597Z'
description: Allow defining Serverless Framework functions handlers paths relatively
tags: []
---

# ✨ DRYer Serverless configuration

When defining a Serverless Framework service file in TS or JS, it's common to import functions configurations from the same folders as their handlers.

It helps keeping the service file light, even when the number of functions grows:

```typescript
// serverless.ts(|js)
import { myFunction } from 'functions/myFunction/config.ts(|js)';
import { anotherFunction } from 'functions/anotherFunction/config.ts(|js)';

export const myService = {
  service: 'my-service',
  functions: {
    myFunction,
    anotherFunction,
    ...
  },
  ...
};
```

However, handlers paths **still need to be provided** in the functions files:

```typescript
// functions/myFunction/handler.ts(|js)
export const main = ... // function code
```

```typescript
// functions/myFunction/config.ts(|js)
export const myFunction = {
  // 👇 Still needed
  handler: 'functions/myFunction/handler.main', // Wait... but that's where I am 😭
  ...
};
```

This is a code duplication that can annoy developers, and frequently cause bugs (typically when moving code around or copy/pasting functions).

That's when `sls-relative-paths` comes to the rescue 💪

## Sls-relative-paths

The `sls-relative-paths` plugin allows you to define your handlers paths **relatively** to their functions files:

```typescript
// serverless.ts(|js)
import { myFunction } from 'functions/myFunction/config.ts';

export const myService = {
  service: 'my-service',
  plugins: ['sls-relative-paths'], // 👈 add plugin
  functions: {
    myFunction,
    ...
  },
  ...
};
```

```typescript
// functions/myFunction/config.ts(|js)
export const myFunction = {
  dirName: __dirname, // 👈 dirname is required to re-construct the complete path
  handler: './handler.main', // 🎉 relative path will work!
  ...
};
```

You can also set a default relative path in your service file:

```typescript
// serverless.ts(|js)
import { myFunction } from 'functions/myFunction/config.ts';

export const myService = {
  service: 'my-service',
  plugins: ['sls-relative-paths'],
  functions: {
    myFunction,
    ...
  },
  relativePaths: {
    default: 'handler.main'
  },
  ...
};
```

```typescript
// functions/myFunction/config.ts(|js)
export const myFunction = {
  dirName: __dirname,
  // 🙌 'handler' prop not needed and defaulted to 'handler.main'
  ...
};
```

## Installation

```bash
# npm
npm install --save-dev sls-relative-paths

# yarn
yarn add --dev sls-relative-paths
```

## Other exports

### `ServiceProperties` type

In TS, you can assign this type to your service file:

```typescript
// serverless.ts(|js)
import type { ServiceProperties } from 'sls-relative-path';
import type { AWS } from '@serverless/typescript';

export const myService: AWS & ServiceProperties = {
  service: 'my-service',
  plugins: ['sls-relative-paths'],
  functions: {
    myFunction,
    ...
  },
  relativePaths: {
    default: ['handler', 'main'] // ❌ default should be a string
  },
  ...
};
```

### `FnProperties` type

In TS, you can assign this type to your functions files:

```typescript
  // functions/myFunction/config.ts(|js)
import type { FnProperties } from 'sls-relative-path';
import type { AWS } from '@serverless/typescript';

type FnConfig = NonNullable<AWS['functions']>[string] & FnProperties;

export const myFunction: FnConfig = {
  dirName: undefined, // ❌ dirName is required
  handler: './handler.main',
  ...
};
```

<p align="right">
  <i>If you use this repo, star it ✨</i>
</p>
