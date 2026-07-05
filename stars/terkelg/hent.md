---
repo: terkelg/hent
url: 'https://github.com/terkelg/hent'
homepage: ''
starredAt: '2019-11-15T03:41:51Z'
createdAt: '2019-11-03T19:33:35Z'
updatedAt: '2023-03-21T05:15:01Z'
language: JavaScript
license: MIT
branch: master
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:12.846Z'
description: A small utility to fetch remote files into buffers
tags:
  - buffers
  - download
  - fetch
  - files
  - get
  - request
---

# hent [![build status](https://badgen.now.sh/github/status/terkelg/hent)](https://github.com/terkelg/hent/actions) [![codecov](https://badgen.now.sh/codecov/c/github/terkelg/hent)](https://codecov.io/gh/terkelg/hent)

> Tiny utility to fetch remote files into buffers

hent is a small, promise based, utility to download remote files into nodejs buffers.
Protocol and redirects are automatically handled for you.


## Features

- Promise based
- Supports HTTP and HTTPS protocols
- Follow redirects
- Dependency free

Additionally, this module is delivered as:

* **ES Module**: [`dist/hent.mjs`](https://unpkg.com/hent/dist/hent.mjs)
* **CommonJS**: [`dist/hent.js`](https://unpkg.com/hent/dist/hent.js)


## Install

```
$ npm install --save hent
```


## Usage

```js
import hent from 'hent';

const {buffer} = await hent('https://example.com/dog.jpeg');

// access response object
const {res, buffer} = await hent('https://example.com/cat.png');

// that's it!
```


## API

### hent(url, [opts])
Returns: `Promise <Object>`

The returned object has two properties: `buffer` and `res`.
- `buffer` is the downloaded file as a [Buffer](https://nodejs.org/api/buffer.html).
- `res` is the node [response](https://nodejs.org/api/http.html#http_class_http_incomingmessage) used to access response status, headers and data.


> **fyi**: hent is a danish word and means fetch.

### url
Type: `String`

URL to the resource you want to download.<br>
Protocol is automatically detected.

### opts
Type: `Object`

Optional options object passed to [`http.get`](https://nodejs.org/dist/latest-v6.x/docs/api/http.html#http_http_get_options_callback).
Use this to define custom headers etc.


## License

MIT © [Terkel Gjervig](https://terkel.com)
