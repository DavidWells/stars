---
repo: mapbox/flamebearer
url: 'https://github.com/mapbox/flamebearer'
homepage: ''
starredAt: '2018-12-13T19:14:45Z'
createdAt: '2018-03-29T13:09:53Z'
updatedAt: '2025-02-14T03:23:38Z'
language: JavaScript
license: ISC
branch: master
stars: 1650
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:56.578Z'
description: "Blazing fast flame graph tool for V8 and Node \U0001F525"
tags:
  - flame-graph
  - javascript
  - node
  - performance
  - profiling
  - v8
  - visualization
---

# 🔥 flamebearer

A blazing fast [flame graph](http://www.brendangregg.com/flamegraphs.html) tool for Node and V8.
Used to visualize and explore performance profiling results.
Designed to produce fast, lightweight flame graphs that remain responsive even on really big input.

## [Example graph](https://mapbox.github.io/flamebearer/examples/rollup.html)

## Usage

Use the [online version](https://mapbox.github.io/flamebearer/), or the command line tool:

```bash
# install flamebearer (Node v8.5+ required)
$ npm install -g flamebearer

# profile your app
$ node --prof app.js

# generate flamegraph.html from a V8 log and open it in the browser
$ node --prof-process --preprocess -j isolate*.log | flamebearer
```

## Thanks

- [Brendan Gregg](http://brendangregg.com/) for creating the [concept](https://queue.acm.org/detail.cfm?id=2927301) and maintaining the [reference implementation](http://brendangregg.com/flamegraphs.html).
- [David Mark Clements](https://github.com/davidmarkclements) for creating [0x](https://github.com/davidmarkclements/0x) which inspired this project.
- [Bernard Cornwell](http://www.bernardcornwell.net/books/) for the amazing books this project took its name from.
