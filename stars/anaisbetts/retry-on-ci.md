---
repo: anaisbetts/retry-on-ci
url: 'https://github.com/anaisbetts/retry-on-ci'
homepage: null
starredAt: '2025-06-11T06:23:22Z'
createdAt: '2024-11-19T10:32:48Z'
updatedAt: '2025-06-11T06:23:22Z'
language: JavaScript
license: MIT
branch: main
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-06-14T22:31:10.475Z'
description: NPM script to retry scripts on failure in CI
tags: []
---

# retry-on-ci

This is an npm package you can use in npm scripts to retry commands, but only in a CI environment.

```js
{
  "scripts": {
    "test": "retry-on-ci jest"
  }
}
```

### Environment variables

- `CI` - Set to `true` when running in a CI environment. Most CI environments such as GitHub Actions set this by default.
- `CI_RETRIES` - Number of retries, defaults to 3
- `CI_TIMEOUT`- Timeout for command, defaults to 10 minutes
