---
repo: okonet/webpack-long-term-cache-demo
url: 'https://github.com/okonet/webpack-long-term-cache-demo'
homepage: null
starredAt: '2016-06-13T19:27:21Z'
createdAt: '2015-07-11T19:20:50Z'
updatedAt: '2024-08-10T15:34:43Z'
language: JavaScript
license: MIT
branch: master
stars: 97
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:23.610Z'
description: >-
  A demo config showing how to enable long-term caching using Webpack. Read
  [medium link] for details.
tags: []
---

# webpack-long-term-cache-demo
A demo webpack config showing how to enable long-term caching using Webpack. Read [Long-term caching of static assets with Webpack](https://medium.com/@okonetchnikov/long-term-caching-of-static-assets-with-webpack-1ecb139adb95#.9ro7cpngr) for details.

## To enable long-term caching of static resources produced by webpack:

1. Use `[chunkhash]` to add a content-dependent cache-buster to each file.
1. Use compiler stats to get the file names when requiring resources in HTML.
1. Generate the chunk-manifest JSON and inline it into the HTML page before loading resources.
1. Ensure that the entry point chunk containing the bootstrapping code doesn’t change its hash over time for the same set of dependencies.
1. Profit!

## How to run

1. `npm install`
2. `npm start`
