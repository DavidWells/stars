---
repo: nak2k/node-cfn-spec
url: 'https://github.com/nak2k/node-cfn-spec'
homepage: null
starredAt: '2024-12-27T20:32:45Z'
createdAt: '2018-05-17T02:55:48Z'
updatedAt: '2024-12-27T20:32:45Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:35.219Z'
description: null
tags: []
---

# cfn-spec

This package provides [AWS CloudFormation Resource Specification](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html).

## Installation

```
npm i cfn-spec -S
```

## Usage

``` javascript
const region = 'us-east-1';

const spec = require(`cfn-spec/${region}`;

// Or

const { getSpec } = require('cfn-spec');
const spec = getSpec(region);
```

## License

MIT
