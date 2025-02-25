---
repo: dougmoscrop/aws-info-node
url: 'https://github.com/dougmoscrop/aws-info-node'
homepage: null
starredAt: '2022-04-13T21:40:04Z'
createdAt: '2019-04-26T13:49:53Z'
updatedAt: '2024-10-12T23:20:25Z'
language: JavaScript
license: MIT
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:48.227Z'
description: Get info about AWS Services and Regions
tags: []
---

# aws-info

```js
const { endpoint, regionName } = require('aws-info');

// https://s3.amazonzaws.com
const s3Endpoint = endpoint('S3', 'us-east-1');

// Canada (Central)
const name = regionName('ca-central-1');
```

You can also access the raw data:

```js
const { data } = require('aws-info');

// data.regions ...
// data.services ...
```
