---
repo: bmcmahen/selection-range
url: 'https://github.com/bmcmahen/selection-range'
homepage: ''
starredAt: '2015-03-13T00:14:49Z'
createdAt: '2013-11-06T06:08:47Z'
updatedAt: '2024-03-27T01:41:30Z'
language: JavaScript
license: NA
branch: master
stars: 38
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:48.649Z'
description: 'get or set the selection range, or cursor position, for contenteditable'
tags: []
---


# selection-range

  Get or set the selection range, or cursor position. Useful for saving and restoring selections when your are programatically changing the dom.

## Installation

    $ component install bmcmahen/selection-range
    $ npm install selection-range

## Usage

```javascript
var select = require('selection-range');
select(el, { start: 5, end: 25 }); // select range of el from 5 - 25
select(el, { start: 5 }); // set the cursor at 5
var pos = select(el); // get range of selection
// pos.start = start index
// pos.end = end index
// pos.atStart = boolean. true if cursor should appear at start of el
// pos = undefined if no cursor
select(el, pos);
```

## Tests

```
npm install component-test -g
component test browser
```

## License

  MIT
