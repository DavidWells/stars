---
repo: tinovyatkin/is-localhost-ip
url: 'https://github.com/tinovyatkin/is-localhost-ip'
homepage: ''
starredAt: '2019-10-06T20:13:15Z'
createdAt: '2019-08-17T22:04:34Z'
updatedAt: '2024-04-25T17:02:22Z'
language: JavaScript
license: MIT
branch: master
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:17.821Z'
description: >-
  Checks whether given host/DNS name or IPv4/IPv6 address belongs to the local
  machine
tags:
  - ipv4
  - ipv6
  - localhost
  - networking
  - nodejs
---

[![codecov](https://codecov.io/gh/tinovyatkin/is-localhost-ip/branch/master/graph/badge.svg)](https://codecov.io/gh/tinovyatkin/is-localhost-ip) ![node](https://img.shields.io/node/v/is-localhost-ip)

# is-localhost-ip

Comprehensive and robust library to checks whether given host name or IPv4/IPv6 address belongs to the local machine

Main difference from other libraries here is comprehensiveness: we start from strict RegExp checks (for IP address first, and then for correctness to be a host name), then fallback to DNS resolver (so it works with something like `john.dev` remapped locally in `hosts` or with local resolver).

All this in just _~100 lines of code_ without external dependencies.

## Installation

```sh
npm i is-localhost-ip
# or
yarn add is-localhost-ip
```

## Example

```js
const isLocalhost = require('is-localhost-ip');

(async () => {
  await isLocalhost('127.0.0.1'); // true
  await isLocalhost('::ffff:127.0.0.1'); // true
  await isLocalhost('192.168.0.12'); // true
  await isLocalhost('192.168.0.12', true); // true only if the local machine has an interface with that address
  await isLocalhost('184.55.123.2'); // false

  await isLocalhost('tino.local'); // true
  await isLocalhost('localhost'); // true
  await isLocalhost('microsoft.com'); // false
})();
```

## Caveats

Doesn't work with internationalized ([RFC 3492](https://tools.ietf.org/html/rfc3492) or [RFC 5891](https://tools.ietf.org/html/rfc5891)) domain names. If you need that please use wonderful [Punycode.js](https://github.com/bestiejs/punycode.js) to convert the string before passing to this library:

```js
const isLocalhost = require('is-localhost-ip');
const punycode = require('punycode');

(async () => {
  await isLocalhost(punycode.toASCII('свобода.рф')); // false
  await isLocalhost(punycode.toASCII('私の.家')); // true
})();
```

## License

`is-localhost-ip` is available under the [MIT](https://mths.be/mit) license.
