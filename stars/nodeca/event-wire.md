---
repo: nodeca/event-wire
url: 'https://github.com/nodeca/event-wire'
homepage: ''
starredAt: '2017-11-05T21:03:21Z'
createdAt: '2015-05-03T21:06:22Z'
updatedAt: '2024-12-18T06:51:55Z'
language: JavaScript
license: MIT
branch: master
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:35.970Z'
description: Mediator with dynamic responsibility chains
tags: []
---

# event-wire

[![CI](https://github.com/nodeca/event-wire/actions/workflows/ci.yml/badge.svg)](https://github.com/nodeca/event-wire/actions/workflows/ci.yml)
[![NPM version](https://img.shields.io/npm/v/event-wire.svg?style=flat)](https://www.npmjs.org/package/event-wire)
[![Coverage Status](https://img.shields.io/coveralls/nodeca/event-wire/master.svg?style=flat)](https://coveralls.io/r/nodeca/event-wire?branch=master)

> Mediator with dynamic responsibility chains.

Idea if this package is to have hybrid of [EventEmitter](http://nodejs.org/api/events.html)
and [chain-of-Responsibility](http://en.wikipedia.org/wiki/Chain-of-responsibility_pattern).
In short - dynamic channels with wildcards, and guaranteed execution order for
listeners.

Features:

- sync, async, promise-based & generator listeners
- wildards
- exclusions


## Install

```bash
npm install event-wire --save
```

## API


### constructor

Create new `event-wire` instanse.

```js
//
// Simple. Recommended.
//
var wire = require('event-wire')();


//
// Advanced, with enabled support for generators.
//
const wire = require('event-wire')({
  co: require('co')
})


//
// Advanced, with alternate promise/coroutine lib
//
const bb   = require('bluebird');
const wire = require('event-wire')({
  p: bb,
  co: (fn, params) => bb.coroutine(fn)(params)
});
```

### .emit(channel [, obj, callback])

Sends message with `obj` param into the `channel`. Once all sync and
ascync handlers finished, optional `callback(err)` (if specified) fired.

If callback not passed, `Promise` is returned.


### .on(channels [, options], handler)

Registers `handler` to be executed upon messages in the a single channel
or a sequence of channels stored in `channels` parameter. Handler can be
either sync, async or generator function:

```js
wire.on('foobar', function* (obj) {
  // do stuff here
  yield ...
});

wire.on('foobar', function (/* obj */) {
  return new Promise(resolve => { // You can return Promise
    setTimeout(() => { resolve(); }, 1000);
  });
});

wire.on('foobar', function (obj) {
  // do stuff here

  // and you can generate error via throw
  throw new Error('test');
});

wire.on('foobar', function (obj, callback) {
  // do stuff here
  callback();
});
```

If handler returns error, chain will be terminated - all next handlers
except "ensured" (see below) will be skipped.

__options__:

- `priority` (Number, Default: 0) - execution order (lower is earlier).
  Handlers with equal priorities are executed in definition order.
- `ensure` (Boolean, Default: false) - If `true`, will run handler even
  if one of previous fired error.
- `parallel` (Boolean, Default: false) - all adjacent handlers with the same
  priority that also have `parallel=true` will be executed in parallel.

  For example:

  ```js
  wire.on('foobar', { priority: 9, parallel: true }, handler1); // different priority
  wire.on('foobar', { priority: 10, parallel: true }, handler2); // handler2 and handler3 are parallel
  wire.on('foobar', { priority: 10, parallel: true }, handler3); // handler2 and handler3 are parallel
  wire.on('foobar', { priority: 10 }, handler4); // not parallel
  wire.on('foobar', { priority: 10, parallel: true }, handler5); // handler5 and handler6 are parallel
  wire.on('foobar', { priority: 10, parallel: true }, handler6); // handler5 and handler6 are parallel
  wire.on('foobar', { priority: 11, parallel: true }, handler7); // different priority
  ```
- `name` (String) - handler name, if function is anonymous or you need to
  keept it intact after code uglifiers.


### .once(...)

The same as `.on(...)`, but executed only one time.


### .before(...), .after(...)

Aliases of `.on(...)`, but with priority `-10` and `+10`


### .off(channel [, handler])

Removes `handler` of a channel, or removes ALL handlers of a channel if
`handler` is not given.


### .skip(channel, skipList)

Exclude calling list of named handlers for given channel (wildard allowed
at the end):

```js
wire.skip('server:static.*', [
  session_start,
  cookies_start
]);
```


### .has(channel) -> Boolean

Returns if `channel` (String) has at least one subscriber
with zero priority (main handler). Useful for dynamic routing


### .stat() -> Array

Returns array of info about every channel. For debug purposes. For example,
you can write dumper to check that all expected channels have required
handlers. Or to track number of calls.


### .hook(eventName, fn)

Internal messaging for debug. Currently supported events:

- `eachBefore` (handlerInfo, params) - called before every handler execute.
- `eachAfter` (handlerInfo, params) - called after every handler execute.


## License

[MIT](https://github.com/nodeca/event-wire/blob/master/LICENSE)
