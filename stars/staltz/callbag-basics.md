---
repo: staltz/callbag-basics
url: 'https://github.com/staltz/callbag-basics'
homepage: ''
starredAt: '2018-03-13T17:50:52Z'
createdAt: '2018-01-29T10:58:59Z'
updatedAt: '2025-02-25T06:05:52Z'
language: JavaScript
license: MIT
branch: master
stars: 1653
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:25.650Z'
description: "\U0001F45C Tiny and fast reactive/iterable programming library"
tags:
  - callbacks
  - callbag
  - iterables
  - observables
  - reactive
---

# Callbag basics 👜

Basic callbag factories and operators to get started with. [Callbag](https://github.com/callbag/callbag) is just a spec, but `callbag-basics` is a real library you can use.

**Highlights:**

- Supports reactive stream programming
- Supports iterable programming (also!)
- Same operator works for both of the above
- Tiny! Weighs just [7kB](https://github.com/staltz/callbag-basics/tree/master/dist)
- Fast! [Faster than](https://github.com/staltz/callbag-basics/tree/master/perf) xstream and RxJS
- Extensible: no core library! Everything is a utility function

Imagine a hybrid between an Observable and an (Async)Iterable, that's what callbags are all about. In addition, the internals are tiny because it's all done with a few simple callbacks, following the [callbag spec](https://github.com/callbag/callbag). As a result, it's tiny and fast.

## Usage

`npm install callbag-basics`

Import operators and factories:

```js
const {forEach, fromIter, map, filter, pipe} = require('callbag-basics');
```

## Try it online

- [Observe Events](https://codesandbox.io/s/p5jwlp0x07)
- [Flatten Promises](https://codesandbox.io/s/1o8ykm56o4)
- [Flatten Events with Promises](https://codesandbox.io/s/m32m21v59x)

### Reactive programming examples

Log XY coordinates of click events on `<button>` elements:

```js
const {forEach, fromEvent, map, filter, pipe} = require('callbag-basics');

pipe(
  fromEvent(document, 'click'),
  filter(ev => ev.target.tagName === 'BUTTON'),
  map(ev => ({x: ev.clientX, y: ev.clientY})),
  forEach(coords => console.log(coords))
);

// {x: 110, y: 581}
// {x: 295, y: 1128}
// ...
```

Pick the first 5 odd numbers from a clock that ticks every second, then start observing them:

```js
const {forEach, interval, map, filter, take, pipe} = require('callbag-basics');

pipe(
  interval(1000),
  map(x => x + 1),
  filter(x => x % 2),
  take(5),
  forEach(x => console.log(x))
);

// 1
// 3
// 5
// 7
// 9
```

### Iterable programming examples

From a range of numbers, pick 5 of them and divide them by 4, then start pulling those one by one:

```js
const {forEach, fromIter, take, map, pipe} = require('callbag-basics');

function* range(from, to) {
  let i = from;
  while (i <= to) {
    yield i;
    i++;
  }
}

pipe(
  fromIter(range(40, 99)), // 40, 41, 42, 43, 44, 45, 46, ...
  take(5), // 40, 41, 42, 43, 44
  map(x => x / 4), // 10, 10.25, 10.5, 10.75, 11
  forEach(x => console.log(x))
);

// 10
// 10.25
// 10.5
// 10.75
// 11
```

## API

The list below shows what's included.

### Source factories

- [fromObs](https://github.com/staltz/callbag-from-obs)
- [fromIter](https://github.com/staltz/callbag-from-iter)
- [fromEvent](https://github.com/staltz/callbag-from-event)
- [fromPromise](https://github.com/staltz/callbag-from-promise)
- [interval](https://github.com/staltz/callbag-interval)

### Sink factories

- [forEach](https://github.com/staltz/callbag-for-each)

### Transformation operators

- [map](https://github.com/staltz/callbag-map)
- [scan](https://github.com/staltz/callbag-scan)
- [flatten](https://github.com/staltz/callbag-flatten)

### Filtering operators

- [take](https://github.com/staltz/callbag-take)
- [skip](https://github.com/staltz/callbag-skip)
- [filter](https://github.com/staltz/callbag-filter)

### Combination operators

- [merge](https://github.com/staltz/callbag-merge)
- [concat](https://github.com/staltz/callbag-concat)
- [combine](https://github.com/staltz/callbag-combine)

### Utilities

- [share](https://github.com/staltz/callbag-share)
- [pipe](https://github.com/staltz/callbag-pipe)

### More

- [*Check the Wiki*](https://github.com/callbag/callbag/wiki)

## Terminology

- **source**: a callbag that delivers data
- **sink**: a callbag that receives data
- **puller sink**: a sink that actively requests data from the source
- **pullable source**: a source that delivers data only on demand (on receiving a request)
- **listener sink**: a sink that passively receives data from the source
- **listenable source**: source which sends data to the sink without waiting for requests
- **operator**: a callbag based on another callbag which applies some operation

## Contributing

**The Callbag philosophy is: build it yourself.** :)
You can send pull requests, but even better, don't depend on the repo owner accepting it. Just fork the project, customize it as you wish, and publish your fork on npm. As long as it follows the callbag spec, everything will be interoperable! :)

