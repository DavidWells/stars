---
repo: nak2k/node-arn2url
url: 'https://github.com/nak2k/node-arn2url'
homepage: ''
starredAt: '2024-12-27T20:15:50Z'
createdAt: '2018-07-03T03:25:56Z'
updatedAt: '2024-12-27T20:15:50Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:35.622Z'
description: Convert ARNs to URLs
tags: []
---

# arn2url

Convert ARNs to URLs.

## Installation

```
npm i arn2url
```

## Usage

``` javascript
const { arn2url } = require('arn2url');

const [err, url] = arn2url('arn:aws:s3:::example-bucket');

// Or

arn2url('arn:aws:s3:::example-bucket', (err, url) => {
  // Do something
});
```

## Related

- [opn-arn](https://github.com/nak2k/node-opn-arn)

## License

MIT
