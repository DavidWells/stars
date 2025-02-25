---
repo: confine-sandbox/jsisolate-confine-runtime
url: 'https://github.com/confine-sandbox/jsisolate-confine-runtime'
homepage: null
starredAt: '2021-12-21T00:33:28Z'
createdAt: '2021-12-03T18:59:38Z'
updatedAt: '2021-12-21T15:19:24Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:26.078Z'
description: 'Confine runtime: Runs javascript in a separate isolate.'
tags: []
---

# JS Isolate Confine Runtime

[Confine](https://github.com/confine-sandbox/confine) runtime: Runs javascript in an isolate using [isolated-vm](https://github.com/laverdet/isolated-vm).

Install:

```
npm i jsisolate-confine-runtime
```

Typically this should be passed into [Confine](https://github.com/confine-sandbox/confine), but here are the constructor options:

```typescript
const runtime = new JsIsolateConfineRuntime({
  source: ArrayBuffer, // script source
  path: string, // the path to the script
  env: 'vanilla' | 'nodejs',
  module: 'cjs' | 'esm',
  globals: {
    // ... any globals you want to define
  },
  cjs: {
    requires: {
      // ... any require overrides you want to define
      // a map of 'module-name' -> 'path'
    }
  },
  esm: {
    disableImports: boolean // disallow imports?
  }
})
```
