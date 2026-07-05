---
repo: sindresorhus/ipify
url: 'https://github.com/sindresorhus/ipify'
homepage: ''
starredAt: '2018-03-08T19:15:00Z'
createdAt: '2014-08-18T20:27:00Z'
updatedAt: '2025-02-12T06:41:04Z'
language: JavaScript
license: MIT
branch: main
stars: 276
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:25.949Z'
description: Get your public IP address
tags: []
---

# ipify

> Get your public IP address

Using the [Ipify API](https://www.ipify.org) or a [custom Ipify instance](https://github.com/rdegges/ipify-api).

## Install

```sh
npm install ipify
```

## Usage

```js
import ipify from 'ipify';

console.log(await ipify());
//=> '2001:0db8:85a3:0000:0000:8a2e:0370:7334'
```

## API

### ipify(options?)

Returns a `Promise<string>` with an IP address.

#### options

Type: `object`

##### useIPv6

Type: `boolean`\
Default: `true`

Use the IPv6 API endpoint. The IPv6 endpoint will return an IPv6 address if available, IPv4 address otherwise.

Setting the `endpoint` option will override this.

```js
import ipify from 'ipify';

console.log(await ipify({useIPv6: false}));
//=> '82.142.31.236'
```

##### endpoint

Type: `string`\
Default: `'https://api6.ipify.org'`

Custom API endpoint.

## FAQ

### How is this different from [`public-ip`](https://github.com/sindresorhus/public-ip)?

This package only targets the Ipify service, while `public-ip` targets multiple services, is faster, and more resilient. Unless you run your own Ipify instance, you probably want `public-ip` instead.

## Related

- [ipify-cli](https://github.com/sindresorhus/ipify-cli) - CLI for this module
- [internal-ip](https://github.com/sindresorhus/internal-ip) - Get your internal IPv4 or IPv6 address
