---
repo: netlify/gh-release-fetch
url: 'https://github.com/netlify/gh-release-fetch'
homepage: ''
starredAt: '2024-12-09T16:04:18Z'
createdAt: '2019-03-15T21:04:14Z'
updatedAt: '2025-02-03T02:07:05Z'
language: TypeScript
license: MIT
branch: main
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:17.807Z'
description: null
tags: []
---

# Release Fetch

Thin wrapper to fetch packages from GitHub releases.

## Usage

### Typescript

```ts
import { fetchLatest } from 'gh-release-fetch'

fetchLatest({ repository: 'netlify/netlify-cli', package: 'cli.tar.gz', destination: 'dist' })
```

## License

[MIT](/LICENSE)
