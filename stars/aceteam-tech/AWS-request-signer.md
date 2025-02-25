---
repo: aceteam-tech/AWS-request-signer
url: 'https://github.com/aceteam-tech/AWS-request-signer'
homepage: null
starredAt: '2019-09-12T23:17:35Z'
createdAt: '2019-07-03T15:31:02Z'
updatedAt: '2021-03-11T06:47:38Z'
language: JavaScript
license: NA
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:25.602Z'
description: null
tags: []
---

## Quick start

**Install**
```
yarn add aws-request-signer
```

**Add to the project**
```
const Signer = require('aws-request-signer')
```

**Sign the request**
```
const request = new Signer({
        region,
        accessKeyId,
        secretAccessKey
    }, {
        url,
        method,
        dataType: 'json',
        contentType: 'application/x-amz-json-1.0',
        body
    })
```

**Send the request**
```
await fetch('https://' + url.host + url.pathname, request)
```
