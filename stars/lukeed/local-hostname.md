---
repo: lukeed/local-hostname
url: 'https://github.com/lukeed/local-hostname'
homepage: null
starredAt: '2021-02-16T01:40:03Z'
createdAt: '2019-10-13T04:57:03Z'
updatedAt: '2022-05-06T01:45:07Z'
language: JavaScript
license: MIT
branch: master
stars: 32
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:02.520Z'
description: A tiny (171B) utility to check if a hostname is local
tags: []
---

# local-hostname [![build status](https://badgen.now.sh/github/status/lukeed/local-hostname)](https://github.com/lukeed/local-hostname/actions) [![codecov](https://badgen.now.sh/codecov/c/github/lukeed/local-hostname)](https://codecov.io/gh/lukeed/local-hostname)

> A tiny (171B) utility to check if a hostname is local

Compares an incoming URL `hostname` segment against a manually constructed RegExp pattern.<br>
The pattern supports IPV4 and IPV6 addresses and is derived from [RFC1918](https://tools.ietf.org/html/rfc1918#section-3) – see [Wikipedia](https://en.wikipedia.org/wiki/Localhost) explainer.

This module supports browser and Node.js environments.<br>
It is made available in three formats:

* **CommonJS**: `dist/localhost.js`
* **ES Module**: `dist/localhost.mjs`
* **UMD**: `dist/localhost.min.js`


## Install

```
$ npm install --save local-hostname
```


## Usage

```js
import localhost from 'local-hostname';

localhost('localhost'); //=> true
localhost('127.0.254.1'); //=> true
localhost('hello.localhost'); //=> true
localhost('192.168.0.1'); //=> true

localhost('localhost.123'); //=> false
localhost('192.167.100.300'); //=> false
localhost('168.254.1.255'); //=> false
localhost('example.com'); //=> false
```


## API

### localhost(hostname)
Returns: `Boolean`

#### hostname
Type: `String`

The `hostname` segment of a valid URL.<br>
> **Important:** The `localhost` function does not parse or format the URL for you!

## Contributing

PRs are welcome, of course! However, please open an issue first to discuss the planned changes :)

I am _by no stretch of the imagination_ a networking expert – I most likely missed cases and/or ranges.

To change the `RegExp` pattern, modify or add the segment(s) inside `src/build.js`, run it with `node`, and then paste the result into the `src/index.js` file.

## License

MIT © [Luke Edwards](https://lukeed.com)
