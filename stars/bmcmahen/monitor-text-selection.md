---
repo: bmcmahen/monitor-text-selection
url: 'https://github.com/bmcmahen/monitor-text-selection'
homepage: null
starredAt: '2015-03-13T00:15:02Z'
createdAt: '2013-11-09T05:23:35Z'
updatedAt: '2015-03-13T00:15:02Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:48.593Z'
description: emit events for selection and deselection of text for a given element.
tags: []
---


# monitor-select

  emit events for selection and deselection of text for a given element.

## Installation

  Install with [component(1)](http://component.io):

    $ component install bmcmahen/monitor-text-selection

## Example

```javascript
var el = document.querySelector('#text');
var monitor = require('monitor-text-selection')(el);
monitor.on('selected', function(e, el){
  console.log('selected');
});

monitor.on('deselected', function(e, el){
  console.log('deselected');
});

// unbind 
monitor.unbind();
```



## License

  MIT
