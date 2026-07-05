---
repo: nice-registry/get-auth-token-from-npmrc
url: 'https://github.com/nice-registry/get-auth-token-from-npmrc'
homepage: ''
starredAt: '2018-01-08T05:49:43Z'
createdAt: '2018-01-08T04:33:55Z'
updatedAt: '2019-07-25T00:25:29Z'
language: JavaScript
license: NA
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:31.556Z'
description: >-
  Convenience module and CLI for extracting the auth token from your ~/.npmrc
  file
tags: []
---

# get-auth-token-from-npmrc 

> Convenience module and CLI for extracting the auth token from your ~/.npmrc file

Hey! If you know of a better way to do this, please let me know.

## Programmatic Usage

Install it locally:

```sh
npm i get-auth-token-from-npmrc --save
```

Then in your JS file:

```js
const token = require('get-auth-token-from-npmrc')()
// xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```

If `~/.npmrc` exists and you're logged in to npm, a token is returned.

Otherwise, `null` is returned.

## CLI Usage

Install it globally (or locally depending on your use-case):

```sh
npm i -g get-auth-token-from-npmrc && get-auth-token-from-npmrc
```

The token is written to stdout.

## Dependencies

None

## Dev Dependencies

None

## License

MIT
