---
repo: velut/short-time-ago
url: 'https://github.com/velut/short-time-ago'
homepage: ''
starredAt: '2021-12-14T02:13:17Z'
createdAt: '2020-06-24T16:53:37Z'
updatedAt: '2025-02-21T23:13:08Z'
language: TypeScript
license: MIT
branch: main
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:29.060Z'
description: >-
  A small, no dependencies, Typescript utility to describe time differences in a
  human readable format (e.g., "1 minute ago")
tags: []
---

# short-time-ago

[![Build status](https://img.shields.io/github/actions/workflow/status/velut/short-time-ago/main.yml?branch=main)](https://github.com/velut/short-time-ago/actions?query=workflow%3ACI)
[![Coverage](https://img.shields.io/codecov/c/gh/velut/short-time-ago)](https://codecov.io/gh/velut/short-time-ago)
[![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-blue)](https://www.jsdocs.io/package/short-time-ago)
![Language](https://img.shields.io/github/languages/top/velut/short-time-ago)
[![npm](https://img.shields.io/npm/v/short-time-ago)](https://www.npmjs.com/package/short-time-ago)
[![License](https://img.shields.io/github/license/velut/short-time-ago)](https://github.com/velut/short-time-ago/blob/main/LICENSE)

This package exports a single function, `timeAgo`,
which describes the time elapsed between a given date and the current date
in a human readable format (for example, _"10 minutes ago"_, _"in 3 seconds"_).

## Pros

- Simple API and usage
- Small size (< 1KB)
- No dependencies
- Works in the browser
- Written in Typescript
- Well tested and documented
- Accepts a custom date for the `now` anchor time

## Cons

- Only `en_US` locale support.

## API & Package Info

```typescript
timeAgo: (date: Date, now?: Date) => string;
```

- Explore the API on [**jsDocs.io**](https://www.jsdocs.io/package/short-time-ago)
- View package contents on [**unpkg**](https://unpkg.com/short-time-ago/)
- View repository on [**GitHub**](https://github.com/velut/node-short-time-ago)

## Install

Using `npm`:

```
npm i short-time-ago
```

Using `yarn`:

```
yarn add short-time-ago
```

Using `pnpm`:

```
pnpm add short-time-ago
```

## Usage

Basic usage:

```typescript
import { timeAgo } from "short-time-ago";

const myDate = new Date();
const description = timeAgo(myDate);

// Output: `just now`.
console.log(description);
```

Specifying a custom current date with the `now` parameter:

```typescript
import { timeAgo } from "short-time-ago";

const myDate = new Date("2019-01-01T00:00:00.000Z");
const now = new Date("2019-01-01T00:01:00.000Z");
const description = timeAgo(myDate, now);

// Output: `1 minute ago`.
console.log(description);
```

```typescript
import { timeAgo } from "short-time-ago";

const myDate = new Date("2019-01-02T00:00:00.000Z");
const now = new Date("2019-01-01T00:00:00.000Z");
const description = timeAgo(myDate, now);

// Output: `in 1 day`.
console.log(description);
```

## Output

The following table describes `timeAgo`'s output.

| Time elapsed          | Past output       | Future output    |
| --------------------- | ----------------- | ---------------- |
| < 1 second            | `just now`        | `just now`       |
| < 1 minute            | `N second(s) ago` | `in N second(s)` |
| < 1 hour              | `N minute(s) ago` | `in N minute(s)` |
| < 1 day               | `N hour(s) ago`   | `in N hour(s)`   |
| < 1 month (30.5 days) | `N day(s) ago`    | `in N day(s)`    |
| < 1 year (365 days)   | `N month(s) ago`  | `in N month(s)`  |
| > 1 year              | `N year(s) ago`   | `in N year(s)`   |

## License

```
MIT
```

MIT License. See [LICENSE](./LICENSE) file.

Copyright (c) 2025 Edoardo Scibona.
