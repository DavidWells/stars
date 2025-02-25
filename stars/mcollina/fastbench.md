---
repo: mcollina/fastbench
url: 'https://github.com/mcollina/fastbench'
homepage: null
starredAt: '2023-11-25T20:49:07Z'
createdAt: '2015-07-08T17:33:26Z'
updatedAt: '2024-11-19T06:15:09Z'
language: JavaScript
license: MIT
branch: master
stars: 87
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:43.546Z'
description: the simplest benchmark you can run on node
tags: []
---

# fastbench&nbsp;&nbsp;[![Build Status](https://travis-ci.org/mcollina/fastbench.png)](https://travis-ci.org/mcollina/fastbench)

The simplest benchmark you can run on node

## Install

```js
npm install fastbench
```

## Usage

```js
'use strict'

var bench = require('fastbench')

var run = bench([
  function benchSetTimeout (done) {
    setTimeout(done, 0)
  },
  function benchSetImmediate (done) {
    setImmediate(done)
  },
  function benchNextTick (done) {
    process.nextTick(done)
  }
], 1000)

// run them two times
run(run)
```

Output:

```
benchSetTimeout*1000: 1363ms
benchSetImmediate*1000: 4ms
benchNextTick*1000: 1ms
benchSetTimeout*1000: 1365ms
benchSetImmediate*1000: 4ms
benchNextTick*1000: 0ms
```

You can disable colors by passing a `--no-color` flag to your node
script.

## API

### bench(functions, iterations)

Build a benchmark for the given functions and that precise number of
iterations. It returns a function to run the benchmark.

The iterations parameter can also be an `Object`, in which case it
acceps two options:

* `iterations`: the number of iterations (required)
* `max`: is a an alias for iterations
* `color`: if the output should have color (default: true)

## License

MIT
