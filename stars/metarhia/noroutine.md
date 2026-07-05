---
repo: metarhia/noroutine
url: 'https://github.com/metarhia/noroutine'
homepage: 'https://metarhia.com'
starredAt: '2021-10-30T02:31:50Z'
createdAt: '2021-10-23T18:22:33Z'
updatedAt: '2025-02-01T14:11:07Z'
language: JavaScript
license: MIT
branch: main
stars: 119
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:41.187Z'
description: "Goroutine analogue for Node.js, spreads I/O-bound routine calls to utilize thread pool (worker_threads) using balancer with event loop utilization. \U0001F331"
tags:
  - balancer
  - concurrency
  - goroutine
  - metarhia
  - multithreading
  - parallel
  - routine
  - threads
  - workers
---

# Node Routine (noroutine)

[![ci status](https://github.com/metarhia/noroutine/workflows/Testing%20CI/badge.svg)](https://github.com/metarhia/noroutine/actions?query=workflow%3A%22Testing+CI%22+branch%3Amaster)
[![snyk](https://snyk.io/test/github/metarhia/noroutine/badge.svg)](https://snyk.io/test/github/metarhia/noroutine)
[![npm version](https://badge.fury.io/js/noroutine.svg)](https://badge.fury.io/js/noroutine)
[![npm downloads/month](https://img.shields.io/npm/dm/noroutine.svg)](https://www.npmjs.com/package/noroutine)
[![npm downloads](https://img.shields.io/npm/dt/noroutine.svg)](https://www.npmjs.com/package/noroutine)
[![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/metarhia/noroutine/blob/master/LICENSE)

Goroutine analogue for Node.js, spreads I/O-bound routine (tasks) to utilize
thread pool with `worker_threads` using balancer with event loop utilization
(see `perf_hooks` API).

## Usage

Install: `npm install noroutine`

```js
const noroutine = require('noroutine');
const module1 = require('./module1.js');
const module2 = require('./module2.js');
noroutine.init({ modules: [module1, module2] });

(async () => {
  const res1 = await module1.method1('value1');
  const res2 = await module2.method2('value2');
  console.log({ res1, res2 });
})();
```

## Initialization options

```js
noroutine.init({
  modules: [module1, module2],
  pool: 5, // number of workers in thread pool
  wait: 2000, // maximum delay to wait for a free thread
  timeout: 5000, // maximum timeout for executing a functions
  monitoring: 5000, // event loop utilization monitoring interval
});
```

## License & Contributors

Copyright (c) 2021-2024 [Metarhia contributors](https://github.com/metarhia/noroutine/graphs/contributors).
Noroutine is [MIT licensed](./LICENSE).\
Noroutine is a part of [Metarhia](https://github.com/metarhia) technology stack.
