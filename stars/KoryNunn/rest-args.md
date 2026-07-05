---
repo: KoryNunn/rest-args
url: 'https://github.com/KoryNunn/rest-args'
homepage: null
starredAt: '2014-12-27T02:49:42Z'
createdAt: '2014-10-27T23:29:24Z'
updatedAt: '2016-04-14T06:33:48Z'
language: JavaScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:00.440Z'
description: >-
  A tiny util for getting all non-named arguments from a function via an
  arguments object.
tags: []
---

# rest-args

A tiny util for getting all non-named arguments from a function via an arguments object.

# usage:

```javascript
function(foo, bar){
    return restArgs(arguments);
}
```

called with: ```1,2,3,4,5```

will result in ```345```
