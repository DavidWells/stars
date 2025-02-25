---
repo: mikaelvesavuori/triplecheck-core
url: 'https://github.com/mikaelvesavuori/triplecheck-core'
homepage: ''
starredAt: '2025-01-14T08:10:46Z'
createdAt: '2021-04-24T12:42:35Z'
updatedAt: '2025-01-14T08:10:46Z'
language: HTML
license: MIT
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:15.218Z'
description: Core contracts and utilities for TripleCheck.
tags: []
---

# triplecheck-core

![TripleCheck Core](readme/triplecheck-core.png)

## TripleCheck: Core contracts and utilities

_If you are just a regular user of TripleCheck (CLI and/or broker) you won't need to think about this package at all._

This repo contains core functionality that is shared across `triplecheck` projects, such as the base [repository contract](https://hannesdorfmann.com/android/evolution-of-the-repository-pattern/) to be used by any concrete implementations that handle database actions for TripleCheck. To use a vendor-specific solution there needs to be a compatible Repository built for it. [Check this list for currently available repositories written by myself](https://github.com/mikaelvesavuori?tab=repositories&q=triplecheck-repository&type=&language=&sort=).

TripleCheck and its repositories are written in Typescript.

## Installation

Install as a dependency with `npm install triplecheck-core` or `yarn install triplecheck-core`.

## Documentation

See the generated documentation under `/docs`.

## The Repository class

You should `implement` the Repository class for your concrete implementation.

```TypeScript
export abstract class Repository {
  abstract getData(key: string): Promise<any>;
  abstract updateData(key: string, data: any): Promise<void>;
  abstract deleteData(key: string): Promise<void>;
}
```
