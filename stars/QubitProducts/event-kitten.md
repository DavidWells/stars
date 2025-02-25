---
repo: QubitProducts/event-kitten
url: 'https://github.com/QubitProducts/event-kitten'
homepage: null
starredAt: '2016-03-29T19:50:13Z'
createdAt: '2015-03-27T22:11:37Z'
updatedAt: '2023-06-02T12:06:38Z'
language: JavaScript
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:29.914Z'
description: 'An event emitter inspired by event-kit, written in JavaScript'
tags:
  - ceh
  - implement
---

Event Kitten
------------

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

An event emitter inspired by [event-kit](https://github.com/atom/event-kit), written in JavaScript. Meow.

### Motivation

[event-kit](https://github.com/atom/event-kit) is pretty awesome however it is written in coffeescript :disappointed: and uses [Grim](https://github.com/atom/grim) which is a >1MB dependency!


### API

```javascript
var createEmitter = require('event-kitten')
var emitter = createEmitter()

var sub = emitter.on('foo', function () {
  console.log('bar')
})

// logs 'bar'
emitter.emit('foo')

// remove the observer
sub.dispose()
```
