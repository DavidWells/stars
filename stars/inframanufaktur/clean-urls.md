---
repo: inframanufaktur/clean-urls
url: 'https://github.com/inframanufaktur/clean-urls'
homepage: null
starredAt: '2022-04-04T21:37:27Z'
createdAt: '2022-03-25T18:50:41Z'
updatedAt: '2023-09-23T14:14:28Z'
language: JavaScript
license: MIT
branch: main
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:49.972Z'
description: Utility to remove tracking parameters from a URL
tags: []
---

# @inframanufaktur/clean-urls

Utility to remove tracking parameters from an URL

## Usage

Basic usage:

```js
const removeParams = require("@inframanufaktur/clean-urls");

const cleaned = removeParams("https://www.test.com/?utm_source=test");
// --> 'https://www.test.com/'
```

Allow companies through an allowlist:

```js
const removeParams = require("@inframanufaktur/clean-urls");

const cleaned = removeParams(
  "https://www.test.com/?utm_source=test&pk_campaign=test",
  ["Piwik"]
);
// --> 'https://www.test.com/?pk_campaign=test'
```

### How it works

The package takes the string of an URL and converts it with `new URL`.

Since it uses `new URL` you can only use this with URLs that contain a protocol and a hostname. `/about/?utm_source=test` will not work.

The search parameters of the URLs are matched against the list in `./data/params.js`. It it matches and the associated company is not present in your allowlist, the param gets removed.

## Compatability

Needs Node >v10 as its uses `new URL()`.
