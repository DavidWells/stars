---
repo: KoryNunn/console-watch
url: 'https://github.com/KoryNunn/console-watch'
homepage: null
starredAt: '2025-04-03T00:34:28Z'
createdAt: '2016-02-12T16:52:23Z'
updatedAt: '2025-04-03T00:34:29Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-04-12T22:30:07.050Z'
description: Track console.log/warn/error/etc...
tags: []
---

# console-watch

Track console.log/warn/error/etc...

## Install

```
npm install console-watch
```

## Usage

```javascript

// Require it
var consoleWatch = require('console-watch');

consoleWatch(function(getResults){

    // Log some stuff
    console.log('foo');

    // Get the results (and reset console back to it's original state.
    var results = getResults();
});

```
