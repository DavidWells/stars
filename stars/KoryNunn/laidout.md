---
repo: KoryNunn/laidout
url: 'https://github.com/KoryNunn/laidout'
homepage: null
starredAt: '2022-11-12T21:14:55Z'
createdAt: '2014-03-19T00:01:49Z'
updatedAt: '2022-11-12T21:14:55Z'
language: JavaScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:10.149Z'
description: Call a callback when an element has been laid out with css
tags: []
---

laidout
=======

# What

Call a callback when an element has been laid out with css

# Usage

```javascript
var laidout = require('laidout');

laidout(someElement, function(){
    // called when the element is actually in the document
});
```

## checkDisplay

Flag to also check that the element and it's parents are not `display: none;`

```javascript
laidout(someElement, true, callback);
```
