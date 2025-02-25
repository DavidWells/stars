---
repo: dabbott/generate-guidebook
url: 'https://github.com/dabbott/generate-guidebook'
homepage: null
starredAt: '2022-10-16T05:08:49Z'
createdAt: '2020-06-20T02:39:49Z'
updatedAt: '2024-05-28T23:18:12Z'
language: JavaScript
license: NA
branch: master
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:23.540Z'
description: Generate a guidebook website. Includes next.js plugin.
tags: []
---

# Generate Guidebook

A utility for generating a tutorial guide. Used in:

- https://javascript.express
- http://react.express
- http://www.reactnativeexpress.com/

## Example

```js
const generateGuidebook = require('generate-guidebook')

const guidebook = generateGuidebook('./pages')
```

## Next plugin

```js
const withGuidebook = require('generate-guidebook/next')

// These are the default options
module.exports = withGuidebook({
  guidebookDirectory = './pages',
  guidebookModulePath = './guide.js',
})
```
