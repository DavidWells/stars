---
repo: Vibrant-Colors/node-vibrant
url: 'https://github.com/Vibrant-Colors/node-vibrant'
homepage: 'https://vibrant.dev'
starredAt: '2024-12-22T00:06:55Z'
createdAt: '2015-06-04T13:30:08Z'
updatedAt: '2025-02-25T03:11:25Z'
language: TypeScript
license: NA
branch: main
stars: 2155
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:38.312Z'
description: "\U0001F3A8 Extract prominent colors from an image"
tags:
  - canvas
  - color
  - colour
  - detection
  - image
  - muted
  - picture
  - varation
  - vibrant
---

# node-vibrant

<a href="https://www.npmjs.com/package/node-vibrant" target="\_parent">
  <img alt="" src="https://img.shields.io/npm/dm/node-vibrant.svg" />
</a><a href="https://bundlephobia.com/package/node-vibrant@latest" target="\_parent">
  <img alt="" src="https://badgen.net/bundlephobia/minzip/node-vibrant" />
</a><a href="https://github.com/Vibrant-Colors/node-vibrant/discussions">
  <img alt="Join the discussion on Github" src="https://img.shields.io/badge/Github%20Discussions%20%26%20Support-Chat%20now!-blue" />
</a><a href="https://bestofjs.org/projects/node-vibrant"><img alt="Best of JS" src="https://img.shields.io/endpoint?url=https://bestofjs-serverless.now.sh/api/project-badge?fullName=Vibrant-Colors%2Fnode-vibrant%26since=daily" /></a><a href="https://github.com/Vibrant-Colors/node-vibrant/" target="\_parent">
  <img alt="" src="https://img.shields.io/github/stars/Vibrant-Colors/node-vibrant.svg?style=social&label=Star" />
</a>

<img align="right" width="265" src="./media/logo.png?raw=true">

Extract prominent colors from an image.

- Identical API for node.js, browser, and worker environments

## Install

```bash
$ npm install node-vibrant
```

## Usage

```typescript
// Node
import { Vibrant } from "node-vibrant/node";
// Browser
import { Vibrant } from "node-vibrant/browser";
// Web Worker
import { Vibrant } from "node-vibrant/worker";

// Using builder
Vibrant.from("path/to/image")
	.getPalette()
	.then((palette) => console.log(palette));

// Using constructor
let v = new Vibrant("path/to/image", opts);
v.getPalette().then((palette) => console.log(palette));
```

### Worker Usage

Quantization is the most time-consuming stage in `node-vibrant`. Luckily, the quantization can be run in the WebWorker to avoid freezing the UI thread.

Here's how to use this feature:

```typescript
import { Vibrant, WorkerPipeline } from "node-vibrant/worker";
import PipelineWorker from "node-vibrant/worker.worker?worker";

Vibrant.use(new WorkerPipeline(PipelineWorker as never));
```

This requires your bundler to handle `?worker` transforms [similar to how Vite does](https://vite.dev/guide/features.html#import-with-query-suffixes)

## Documentation

Docs can be seen currently in the [`docs`](./docs) folder. It includes reference docs and step-by-step guides.

We also have a few [`examples`](./examples) that you can reference for your needs.

PRs welcomed to expand either of these!

## Notes

### Result Consistency

The results are consistent within each user's browser instance regardless of the visible region or display size of an image, unlike the original `vibrant.js` implementation.

However, due to the nature of the HTML5 canvas element, image rendering is platform/machine-dependent. The resulting swatches may vary between browsers, Node.js versions, and between machines. See [Canvas Fingerprinting](https://en.wikipedia.org/wiki/Canvas_fingerprinting).

The test specs use CIE delta E 1994 color difference to measure inconsistencies across platforms. It compares the generated color on Node.js, Chrome, Firefox, and IE11. At `quality` == 1 (no downsampling) with no filters and the results are rather consistent. Color diffs between browsers are mostly not perceptible by the human eye. Downsampling _will_ cause perceptible inconsistent results across browsers due to differences in canvas implementations.
