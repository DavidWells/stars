---
repo: l2beat/earl
url: 'https://github.com/l2beat/earl'
homepage: 'https://earl.fun/'
starredAt: '2022-12-05T20:05:11Z'
createdAt: '2020-05-05T20:00:16Z'
updatedAt: '2025-02-18T00:24:21Z'
language: TypeScript
license: MIT
branch: main
stars: 260
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:06.317Z'
description: '☕ Ergonomic, modern and type-safe assertion library for TypeScript'
tags:
  - assert
  - assertion-libraries
  - chai
  - jest
  - mocha
  - testing
  - typescript
---

![Earl](https://raw.githubusercontent.com/l2beat/earl/master/gh-cover.png)

<p align="center">
  <p align="center">Ergonomic, modern and type-safe assertion library for TypeScript</p>
  <p align="center">Brings good parts of <b>Jest</b> back to good ol' <b>Mocha</b></p>
  <p align="center">
    <img alt="Build status" src="https://github.com/l2beat/earl/workflows/CI/badge.svg">
    <a href="https://github.com/l2beat/earl/tree/master/LICENSE"><img alt="Software License" src="https://img.shields.io/badge/license-MIT-brightgreen.svg"></a>
  </p>
</p>

## Features

- 💪 Use advanced assertions that are able to match whole ranges of values
- 🤖 Written in TypeScript with type-safety in mind
- 🎭 Type-safe, fully integrated mocks included
- ☕ Finally a modern assertion library for Mocha
- 📸 Snapshots can be easily created and updated with Earl
- 🔌 Tweak to your needs with plugins

## Installation

```sh
npm install --save-dev earl
```

## Example

```typescript
import { expect } from 'earl'

const user = {
  name: 'John Doe',
  email: 'john@doe.com',
  notificationCount: 5,
}

// This code fails to compile, and TypeScript provides this useful
// error message:
// Property 'notificationCount' is missing in type
// '{ name: string; email: any; }' but required in type 'User'.
expect(user).toEqual({
  name: 'John Doe',
  email: expect.a(String),
})
```

## Docs

- [Getting started](https://earl.fun/introduction/getting-started.html)
- [API reference](https://earl.fun/api/api-reference.html)

# License

Published under the MIT License. Copyright © 2023 L2BEAT.
