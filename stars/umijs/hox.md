---
repo: umijs/hox
url: 'https://github.com/umijs/hox'
homepage: 'https://hox.js.org'
starredAt: '2019-11-15T19:26:35Z'
createdAt: '2019-10-16T06:16:57Z'
updatedAt: '2025-02-13T07:43:17Z'
language: TypeScript
license: MIT
branch: master
stars: 1458
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:12.816Z'
description: State sharing for React components.
tags:
  - react
  - react-hooks
  - reactjs
  - state-management
---

# Hox

State sharing for React components.

[![npm version](https://img.shields.io/npm/v/hox.svg?logo=npm)](https://www.npmjs.com/package/hox)
[![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/hox.svg?logo=javascript)](https://www.npmjs.com/package/hox)
![React](https://img.shields.io/npm/dependency-version/hox/peer/react?logo=react)

[English Doc](https://hox.js.org) · [中文文档](https://hox.js.org/zh/)

> This is the documentation for hox v2. If you are looking for the v1 doc, please go [here](https://github.com/umijs/hox/blob/v1/README.md).

## Play Hox in Codesandbox

[![Edit](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/awmleer/todo-app-with-hox/tree/master/)

## Install

```shell
npm install --save hox
# or
yarn add hox
# or
pnpm add hox
```

## Why Hox?

- Direct reuse of existing React knowledge, almost no learning cost, how you write React components, you can write Store
- Designed for flexible refactoring, using the same DSL in Store and components allows you to convert a component's local state into a state shared between components at almost zero cost
- Supports both local and global states, a good balance between flexibility and simplicity
- Excellent performance and TypeScript support
