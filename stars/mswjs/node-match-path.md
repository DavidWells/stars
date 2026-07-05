---
repo: mswjs/node-match-path
url: 'https://github.com/mswjs/node-match-path'
homepage: 'https://npmjs.com/package/node-match-path'
starredAt: '2022-02-10T18:12:58Z'
createdAt: '2019-07-24T13:23:22Z'
updatedAt: '2023-09-08T17:56:10Z'
language: TypeScript
license: NA
branch: master
stars: 30
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:14.621Z'
description: 'Matches a URL against a path. Parameters, wildcards, RegExp.'
tags:
  - martcher
  - match
  - path
  - request
  - route
  - routing
  - url
  - wildcard
---

[![Package version](https://img.shields.io/npm/v/node-match-path.svg)](https://npmjs.com/package/node-match-path)

# `node-match-path`

Matches a URL against the given path.

## Getting started

### Install

```bash
npm install node-match-path
```

## Usage

```js
const { match } = require('node-match-path')

match('/user/:userId', '/user/5')
/*
{
  matches: true,
  params: {
    userId: '5'
  }
}
*/
```

## API

### `match(path: RegExp | string, url: string): Match`

Returns a match data, if any, between a url and a path.

#### String path

```js
match('/admin', '/admin')

/*
{
  matches: true,
  params: null
}
*/
```

#### Path parameters

```js
match('/admin/:messageId', '/admin/abc-123')

/*
{
  matches: true,
  params: {
    messageId: 'abc-123'
  }
}
*/
```

#### Wildcard

```js
match('/user/*/inbox', '/user/abc-123/inbox')

/*
{
  matches: true,
  params: null
}
*/
```

#### Regular expression

```js
match(/\/messages\/.+?\/participants/, '/messages/5/participants')

/*
{
  matches: true,
  params: null
}
*/
```

## Honorable mentions

- [`path-to-regexp`](https://github.com/pillarjs/path-to-regexp)
