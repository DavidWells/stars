---
repo: bramstein/url-template
url: 'https://github.com/bramstein/url-template'
homepage: null
starredAt: '2022-02-28T03:05:12Z'
createdAt: '2012-10-23T21:05:13Z'
updatedAt: '2025-02-11T20:25:03Z'
language: JavaScript
license: BSD-3-Clause
branch: main
stars: 184
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:04.281Z'
description: A JavaScript URI template implementation (RFC 6570 compliant)
tags: []
---

## A JavaScript URI template implementation

This is a simple URI template implementation following the [RFC 6570 URI Template specification](http://tools.ietf.org/html/rfc6570). The implementation supports all levels defined in the specification and is extensively tested.

## Installation

For use with Node.js or build tools you can install it through npm:

```sh
$ npm install url-template
```

If you want to use it directly in a browser use a CDN like [Skypack](https://www.skypack.dev/view/url-template).

## Example

```js
import { parseTemplate } from 'url-template';

const emailUrlTemplate = parseTemplate('/{email}/{folder}/{id}');
const emailUrl = emailUrlTemplate.expand({
  email: 'user@domain',
  folder: 'test',
  id: 42
});

console.log(emailUrl);
// Returns '/user@domain/test/42'
```

## A note on error handling and reporting

The RFC states that errors in the templates could optionally be handled and reported to the user. This implementation takes a slightly different approach in that it tries to do a best effort template expansion and leaves erroneous expressions in the returned URI instead of throwing errors. So for example, the incorrect expression `{unclosed` will return `{unclosed` as output. The leaves incorrect URLs to be handled by your URL library of choice.

## Supported Node.js versions

The same versions that are [actively supported by Node.js](https://github.com/nodejs/release#release-schedule) are also supported by `url-template`, older versions of Node.js might be compatible as well, but are not actively tested against.
