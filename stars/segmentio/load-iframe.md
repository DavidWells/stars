---
repo: segmentio/load-iframe
url: 'https://github.com/segmentio/load-iframe'
homepage: ''
starredAt: '2015-06-08T23:17:35Z'
createdAt: '2014-07-01T21:07:04Z'
updatedAt: '2024-08-02T15:52:49Z'
language: JavaScript
license: NA
branch: master
stars: 20
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:41.576Z'
description: Loads an iframe
tags: []
---

# load-iframe [![CI][ci-badge]][ci-link]

Load an iframe by appending an iframe tag to the DOM.

## Installation

```sh
$ npm install load-iframe
$ component install segmentio/load-iframe
```

## Example
    
```js
var load = require('load-iframe');

load('//www.google.com');
```

Loads Google in the iframe.

```js
var load = require('load-iframe');

load({
  http  : 'http://www.google.com',
  https : 'https://ssl.google.com'
});
```

Loads in the right URL depending on the protocol.

## API

### loadIframe(src || options, callback)
Load the given iframe either by passing a `src` string, or
an `options` object:

```js
{
    src: '//example.com', // same as `src` string
    http: 'http://example.com', // `src` to load if the protocol is `http:`
    https: 'https://ssl.example.com' // `src` to load if the protocol is `https:`
}
```

## Publish a new version
To publish a new version of `load-iframe`

1. Update package.json with new major|minor|patch version and raise a PR. Ensure that you are not trying to publish an existing version by verifying the published versions in [NPM](https://www.npmjs.com/package/load-iframe?activeTab=versions).

2. Ensure that PR title or the Github commit message starts with `Publish`. This is the trigger for Publish Github Action.

3.  Merge the PR. Wait for the Github action to finish and then check [NPM](https://www.npmjs.com/package/load-iframe?activeTab=versions) for the new version.
## License

MIT
<!-- 

[ci-link]: https://circleci.com/gh/segmentio/load-iframe
[ci-badge]: https://circleci.com/gh/segmentio/load-iframe.svg?style=svg -->
