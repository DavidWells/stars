---
repo: vercel/fetch
url: 'https://github.com/vercel/fetch'
homepage: 'https://npmjs.com/@vercel/fetch'
starredAt: '2020-07-09T15:38:10Z'
createdAt: '2017-10-18T21:05:53Z'
updatedAt: '2025-01-21T04:20:16Z'
language: JavaScript
license: NA
branch: main
stars: 572
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:44.821Z'
description: >-
  Opinionated `fetch` (with retrying and DNS caching) optimized for use with
  Node.js
tags: []
---

This repository is now **archived**. See this post for more details: https://github.com/vercel/fetch/issues/83

# Fetch Monorepo

This fetch monorepo contains three packages:

- `@vercel/fetch`
- `@vercel/fetch-retry`
- `@vercel/fetch-cached-dns`

These packages are designed for use with Node.js in order to bring the familiarity of the Fetch API to the backend. There are future plans to make this project interoperable between both browser and server environments.

## Getting Started

`@vercel/fetch` bundles all packages inside this monorepo together into a super-powered [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) client. By default, this package will use its peer dependency [node-fetch](https://github.com/node-fetch/node-fetch), but it also supports other fetch implementations.

```js
// Basic Usage
import fetch from '@vercel/fetch';
```

```js
// Bring your own fetch implementation
import createFetch from '@vercel/fetch';
import fetchImpl from 'some-fetch-implementation';
const fetch = createFetch(fetchImpl);
```

## Contributing

Please see our [CONTRIBUTING.md](./CONTRIBUTING.md)

## Code of Conduct

Please see our [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
