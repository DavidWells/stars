---
repo: schorfES/routz
url: 'https://github.com/schorfES/routz'
homepage: ''
starredAt: '2022-01-02T06:01:34Z'
createdAt: '2021-08-09T15:41:36Z'
updatedAt: '2025-01-31T07:19:51Z'
language: TypeScript
license: MIT
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:24.129Z'
description: Define your SPA routes in a single source of truth - use them everywhere.
tags:
  - definitions
  - helper
  - lightweight
  - path
  - paths
  - react
  - route
  - router
  - routes
  - routing
  - single-page-applications
  - typescript
  - url
---

# Routz /ɹuːts/

[![CI Status](https://github.com/schorfES/routz/actions/workflows/ci.yml/badge.svg)](https://github.com/schorfES/routz/actions)
[![Coverage Status on Codecov](https://codecov.io/gh/schorfES/routz/branch/main/graph/badge.svg)](https://codecov.io/gh/schorfES/routz)
[![Known Vulnerabilities](https://snyk.io/test/github/schorfES/routz/badge.svg)](https://snyk.io/test/github/schorfES/routz)
[![Minified gzipped size](https://badgen.net/bundlephobia/minzip/routz)](https://bundlephobia.com/result?p=routz)
![Types included](https://badgen.net/npm/types/tslib)
[![License MIT](https://badgen.net/npm/license/routz)](https://github.com/schorfES/routz/blob/main/LICENSE)

Define your SPA routes in a single source of truth - use them everywhere.

## Installation

Routz is available on [NPM](https://www.npmjs.com/package/routz):

```bash
npm install routz --save
```

or

```bash
yarn add routz
```

## Usage

The _routz_ package exposes a single `define` function that defines the application routes by the given parameter and returns helper functions to access these routes. A definition of application routes is an object with key/value pairs. Each key is the name of a route. It's meant to be used in your application later on. The value describes the path definition. Each path can contain params. Params are dynamic parts of a single path, that are defined in the format: `[param]`. Optional params are defined by a question mark at the end like: `[optionalParam?]`.

```javascript
// urls.js
import { define } from 'routz';

const { receive, resolve } = define({
  'index': '/[locale?]',
  'blog:list': '/[locale?]/blog',
  'blog:article': '/[locale?]/blog/[slug]',
});

export { receive, resolve };
```

In this example the `locale` param is optional. The `slug` param in the route `blog:article` is required.

The exposed functions can be used inside the application. For example in a react component (using Next.js):

```javascript
// list.jsx
import Link from 'next/link';
import React from 'react';

import { resolve } from 'app/urls';

export const List = ({ articles }) => (
  <ul>
    {articles.map(({ slug, title }) => (
      <li key={slug}>
        <Link href={resolve('blog:article', { slug })}>
          <a>{title}</a>
        </Link>
      </li>
    ))}
  </ul>
);
```

## API

### `define(routes)`

Defines the routes and returns scoped `resolve` and `receive` functions that access the given routes.

### `resolve(name, params)`

This builds a path for a route by name and params. Params are dynamic parts of a single path, that are defined in the format: `[param]`. Optional params are defined by a question mark at the end like: `[optionalParam?]`. The params need to be passed as a key/value object. Optional params are not required to be defined in this object, but missing params will throw an error.

### `receive(name)`

Returns the route defintion by a given name.

## License

[LICENSE (MIT)](./LICENSE)
