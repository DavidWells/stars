---
repo: defunctzombie/dom-events
url: 'https://github.com/defunctzombie/dom-events'
homepage: null
starredAt: '2015-06-23T18:00:17Z'
createdAt: '2013-03-10T01:08:43Z'
updatedAt: '2025-02-15T13:37:48Z'
language: JavaScript
license: NA
branch: master
stars: 36
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:40.045Z'
description: DOM event binding and emitting
tags: []
---

# dom-events

[![Build Status](https://travis-ci.org/defunctzombie/dom-events.png?branch=master)](https://travis-ci.org/defunctzombie/dom-events)

DOM event binding and triggering

## api

### .on(element, name, fn [, useCapture])

Bind `fn` to be called when `name` is triggered on `element`.

```js
var eve = require('dom-events');

var div = document.createElement('div');
eve.on(div, 'click', function(ev) {
    console.log(ev);
});
```

### .off(element, name, fn [, useCapture])

Remove `fn` from being called when `name` is triggered on `element`

```js
var eve = require('dom-events');

var fn = function(ev) {
    console.log(ev);
};

var div = document.createElement('div');
eve.on(div, 'click', fn);

// emit some stuff

eve.off(div, 'click', fn);
```

### .once(element, name, fn [, useCapture])

Calls `fn` the first time the event happens and unsubcribes immediately.

### .emit(element, name [, opts])

Force emit `name` on `element`.

```js
var eve = require('dom-events');

var div = document.createElement('div');
eve.on(div, 'click', function(ev) {
    console.log(ev);
});

eve.emit(div, 'click'):
```

## license

MIT

