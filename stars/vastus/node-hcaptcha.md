---
repo: vastus/node-hcaptcha
url: 'https://github.com/vastus/node-hcaptcha'
homepage: 'https://www.npmjs.com/package/hcaptcha'
starredAt: '2020-10-05T18:28:12Z'
createdAt: '2018-10-09T16:33:42Z'
updatedAt: '2025-02-24T22:29:58Z'
language: JavaScript
license: NA
branch: master
stars: 96
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:28.114Z'
description: Verify hCaptcha token validity
tags: []
---

# hcaptcha

Verify hCaptcha token validity; simply w/ no dependencies.

## Install

```
npm install --save hcaptcha
```

## Usage

```js
const {verify} = require('hcaptcha');

const secret = 'my hcaptcha secret from hcaptcha.com';
const token = 'token from widget';

verify(secret, token)
  .then((data) => {
    if (data.success === true) {
      console.log('success!', data);
    } else {
      console.log('verification failed');
    }
  })
  .catch(console.error);
```
