---
repo: Cadienvan/expirables
url: 'https://github.com/Cadienvan/expirables'
homepage: ''
starredAt: '2022-12-13T01:06:25Z'
createdAt: '2022-12-11T09:46:59Z'
updatedAt: '2024-06-24T15:23:31Z'
language: TypeScript
license: MIT
branch: main
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:03.400Z'
description: >-
  This is a zero dependency package that provides some expirable implementations
  of common Data Structures. 
tags:
  - data-structures
  - javascript
  - nodejs
  - typescript
---

![Expirables Logo](./expirables.png)

# What is this?

This is a zero dependency package that provides some expirable implementations of common Data Structures.  
Thanks to the [npm-package-ts-scaffolding](https://github.com/Cadienvan/npm-package-ts-scaffolding) it is importable both via CommonJS and ES Modules.  
It currently supports the following Data Structures:

- [ExpirableMap](./packages/website/docs/map.md)
- [ExpirableSet](./packages/website/docs/set.md)
- [ExpirableQueue](./packages/website/docs/queue.md)
- [ExpirableStack](./packages/website/docs/stack.md)
- [ExpirableLinkedList](./packages/website/docs/linked-list.md)

# How do I install it?

You can install it by using the following command:

```bash
npm install expirables
```

# Tests

You can run the tests by using the following command:

```bash
npm test
```

# Scaffolding

This project was generated using Cadienvan's own [npm-package-ts-scaffolding](https://github.com/Cadienvan/npm-package-ts-scaffolding) so it has all the necessary tools to develop, test and publish a TypeScript package importable both via CommonJS and ES Modules.

# FAQ

## Why are you using timeouts instead of lazy evaluation?

- Lazy evaluation would need to re-implement many methods of the Data Structures and would be much more complex to implement and maintain.
- Lazy evaluation could block the main thread for a long time if the Data Structure is big, and moving it to a Worker would be a lot of work for a small gain.
- Lazy evaluation would require a higher amount of memory to work because it would store all the expired entries until they are evaluated.
- Lazy evaluation would need us to store additional information about the entries (e.g. the expiration time) which would increase the memory footprint of the Data Structure.

# Contributing

If you want to contribute to this project, please open an issue or a pull request.
