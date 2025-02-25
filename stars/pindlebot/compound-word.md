---
repo: pindlebot/compound-word
url: 'https://github.com/pindlebot/compound-word'
homepage: null
starredAt: '2018-12-15T08:43:19Z'
createdAt: '2018-07-12T19:41:03Z'
updatedAt: '2018-12-15T08:43:19Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:54.594Z'
description: null
tags: []
---

## compound-word

Split a compound word into parts. Uses the 0.3 million most common words.  

```js
const parse = require('compound-word')

let parts = parse('facebook') 
// => ['face', 'book']

parse('underworld')
// => ['under', 'world']
```
