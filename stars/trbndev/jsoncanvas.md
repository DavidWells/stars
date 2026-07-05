---
repo: trbndev/jsoncanvas
url: 'https://github.com/trbndev/jsoncanvas'
homepage: ''
starredAt: '2025-01-05T06:44:15Z'
createdAt: '2024-03-15T05:34:07Z'
updatedAt: '2025-02-11T06:14:13Z'
language: TypeScript
license: MIT
branch: main
stars: 29
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:31.835Z'
description: "\U0001F4DD JSONCanvas Implementation for TypeScript"
tags:
  - jsoncanvas
  - typescript
---

# @trbn/jsoncanvas

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

`@trbn/jsoncanvas` is an implementation of the [JSONCanvas Spec](https://jsoncanvas.org/spec/1.0/) in TypeScript.

> Note: This package does NOT include a rendering engine. It is only a data structure for a canvas.

## Installation

With pnpm:

```bash
pnpm install @trbn/jsoncanvas
```


## Example Usage

```typescript
import { JSONCanvas } from '@trbn/jsoncanvas';

const canvas = new JSONCanvas();

// Adds a text node to the canvas
canvas.addNode({
  id: 'node1',
  type: 'text',
  text: 'Hello, World!',
  x: 100,
  y: 100,
  width: 100,
  height: 100,
});

// Adds another text node to the canvas
canvas.addNode({
  id: 'node2',
  type: 'text',
  text: 'Hello, World 2!',
  x: 200,
  y: 200,
  radius: 50,
});

// Adds an connection between node1 and node2
canvas.addEdge({
  id: 'edge1',
  fromNode: 'node1',
  toNode: 'node2',
  label: 'Edge 1',
});

// Removes node2 and all connections to it
canvas.removeNode('node2');

// Outputs the canvas as a string
console.log(canvas.toString());
```

## License

[MIT](./LICENSE) License © 2024-PRESENT [Torben Haack](https://github.com/haackt)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@trbn/jsoncanvas?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/@trbn/jsoncanvas
[npm-downloads-src]: https://img.shields.io/npm/dm/@trbn/jsoncanvas?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/@trbn/jsoncanvas
[bundle-src]: https://img.shields.io/bundlephobia/minzip/@trbn/jsoncanvas?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=@trbn/jsoncanvas
[license-src]: https://img.shields.io/github/license/haackt/jsoncanvas.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/haackt/jsoncanvas/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/@trbn/jsoncanvas-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/@trbn/jsoncanvas
