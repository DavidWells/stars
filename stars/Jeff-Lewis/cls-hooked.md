---
repo: Jeff-Lewis/cls-hooked
url: 'https://github.com/Jeff-Lewis/cls-hooked'
homepage: ''
starredAt: '2018-12-30T19:11:05Z'
createdAt: '2015-10-08T15:14:05Z'
updatedAt: '2025-02-07T23:54:39Z'
language: JavaScript
license: BSD-2-Clause
branch: master
stars: 769
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-02-25T21:19:51.430Z'
description: >-
  cls-hooked : CLS using AsynWrap or async_hooks instead of async-listener for
  node 4.7+
tags:
  - async-hooks
  - asynchooks
  - asyncwrap
  - cls
  - cls-hooked
  - continuation-local-storage
  - nodejs
---

[![NPM](https://nodei.co/npm/cls-hooked.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cls-hooked/)

[![Build Status](https://travis-ci.org/Jeff-Lewis/cls-hooked.svg?branch=master)](https://travis-ci.org/Jeff-Lewis/cls-hooked)

# Continuation-Local Storage ( Hooked )

### This is a fork of [CLS](https://github.com/othiym23/node-continuation-local-storage) using [AsyncWrap](https://github.com/nodejs/node-eps/blob/async-wrap-ep/XXX-asyncwrap-api.md) OR [async_hooks](https://github.com/nodejs/node/blob/master/doc/api/async_hooks.md) instead of [async-listener](https://github.com/othiym23/async-listener).

### When running Nodejs version < 8, this module uses [AsyncWrap](https://github.com/nodejs/node-eps/blob/async-wrap-ep/XXX-asyncwrap-api.md) which is an unsupported Nodejs API, so please consider the risk before using it.

### When running Nodejs version >= 8.2.1, this module uses the newer [async_hooks](https://github.com/nodejs/node/blob/master/doc/api/async_hooks.md) API which is considered `Experimental` by Nodejs. 

### Thanks to [@trevnorris](https://github.com/trevnorris) for [AsyncWrap](https://github.com/nodejs/node-eps/blob/async-wrap-ep/XXX-asyncwrap-api.md), [async_hooks](https://github.com/nodejs/node/blob/master/doc/api/async_hooks.md) and all the async work in Node and [@AndreasMadsen](https://github.com/AndreasMadsen) for [async-hook](https://github.com/AndreasMadsen/async-hook)

### A little history of "AsyncWrap/async_hooks" and its incarnations

1. First implementation was called **[AsyncListener](https://github.com/nodejs/node-v0.x-archive/pull/6011)** in node v0.11 but was [removed from core](https://github.com/nodejs/node-v0.x-archive/pull/8110) prior to Nodejs v0.12
2. Second implementation called **[AsyncWrap, async-wrap or async_wrap](https://github.com/nodejs/node-eps/blob/async-wrap-ep/XXX-asyncwrap-api.md)** was included to Nodejs v0.12.
    - `AsyncWrap` is unofficial and undocumented but is currently in Nodejs versions 6 & 7
    - `cls-hooked` uses `AsyncWrap` when run in Node < 8.
3. Third implementation and [offically Node-eps accepted](https://github.com/nodejs/node-eps/blob/master/006-asynchooks-api.md) **AsyncHooks ([async_hooks](https://github.com/nodejs/node/blob/master/doc/api/async_hooks.md)) API** was included in Nodejs v8. :) 
**The latest version of `cls-hooked` uses [async_hooks](https://github.com/nodejs/node/blob/master/doc/api/async_hooks.md) API when run in Node >= 8.2.1**

---
Continuation-local storage works like thread-local storage in threaded
programming, but is based on chains of Node-style callbacks instead of threads.
The standard Node convention of functions calling functions is very similar to
something called ["continuation-passing style"][cps] in functional programming,
and the name comes from the way this module allows you to set and get values
that are scoped to the lifetime of these chains of function calls.

Suppose you're writing a module that fetches a user and adds it to a session
before calling a function passed in by a user to continue execution:

```javascript
// setup.js

var createNamespace = require('cls-hooked').createNamespace;
var session = createNamespace('my session');

var db = require('./lib/db.js');

function start(options, next) {
  db.fetchUserById(options.id, function (error, user) {
    if (error) return next(error);

    session.set('user', user);

    next();
  });
}
```

Later on in the process of turning that user's data into an HTML page, you call
another function (maybe defined in another module entirely) that wants to fetch
the value you set earlier:

```javascript
// send_response.js

var getNamespace = require('cls-hooked').getNamespace;
var session = getNamespace('my session');

var render = require('./lib/render.js')

function finish(response) {
  var user = session.get('user');
  render({user: user}).pipe(response);
}
```

When you set values in continuation-local storage, those values are accessible
until all functions called from the original function – synchronously or
asynchronously – have finished executing. This includes callbacks passed to
`process.nextTick` and the [timer functions][] ([setImmediate][],
[setTimeout][], and [setInterval][]), as well as callbacks passed to
asynchronous functions that call native functions (such as those exported from
the `fs`, `dns`, `zlib` and `crypto` modules).

A simple rule of thumb is anywhere where you might have set a property on the
`request` or `response` objects in an HTTP handler, you can (and should) now
use continuation-local storage. This API is designed to allow you extend the
scope of a variable across a sequence of function calls, but with values
specific to each sequence of calls.

Values are grouped into namespaces, created with `createNamespace()`. Sets of
function calls are grouped together by calling them within the function passed
to `.run()` on the namespace object. Calls to `.run()` can be nested, and each
nested context this creates has its own copy of the set of values from the
parent context. When a function is making multiple asynchronous calls, this
allows each child call to get, set, and pass along its own context without
overwriting the parent's.

A simple, annotated example of how this nesting behaves:

```javascript
var createNamespace = require('cls-hooked').createNamespace;

var writer = createNamespace('writer');
writer.run(function () {
  writer.set('value', 0);

  requestHandler();
});

function requestHandler() {
  writer.run(function(outer) {
    // writer.get('value') returns 0
    // outer.value is 0
    writer.set('value', 1);
    // writer.get('value') returns 1
    // outer.value is 1
    process.nextTick(function() {
      // writer.get('value') returns 1
      // outer.value is 1
      writer.run(function(inner) {
        // writer.get('value') returns 1
        // outer.value is 1
        // inner.value is 1
        writer.set('value', 2);
        // writer.get('value') returns 2
        // outer.value is 1
        // inner.value is 2
      });
    });
  });

  setTimeout(function() {
    // runs with the default context, because nested contexts have ended
    console.log(writer.get('value')); // prints 0
  }, 1000);
}
```

## cls.createNamespace(name)

* return: {Namespace}

Each application wanting to use continuation-local values should create its own
namespace. Reading from (or, more significantly, writing to) namespaces that
don't belong to you is a faux pas.

## cls.getNamespace(name)

* return: {Namespace}

Look up an existing namespace.

## cls.destroyNamespace(name)

Dispose of an existing namespace. WARNING: be sure to dispose of any references
to destroyed namespaces in your old code, as contexts associated with them will
no longer be propagated.

## cls.reset()

Completely reset all continuation-local storage namespaces. WARNING: while this
will stop the propagation of values in any existing namespaces, if there are
remaining references to those namespaces in code, the associated storage will
still be reachable, even though the associated state is no longer being updated.
Make sure you clean up any references to destroyed namespaces yourself.

## process.namespaces

* return: dictionary of {Namespace} objects

Continuation-local storage has a performance cost, and so it isn't enabled
until the module is loaded for the first time. Once the module is loaded, the
current set of namespaces is available in `process.namespaces`, so library code
that wants to use continuation-local storage only when it's active should test
for the existence of `process.namespaces`.

## Class: Namespace

Application-specific namespaces group values local to the set of functions
whose calls originate from a callback passed to `namespace.run()` or
`namespace.bind()`.

### namespace.active

* return: the currently active context on a namespace

### namespace.set(key, value)

* return: `value`

Set a value on the current continuation context. Must be set within an active
continuation chain started with `namespace.run()` or `namespace.bind()`.

### namespace.get(key)

* return: the requested value, or `undefined`

Look up a value on the current continuation context. Recursively searches from
the innermost to outermost nested continuation context for a value associated
with a given key. Must be set within an active continuation chain started with
`namespace.run()` or `namespace.bind()`.

### namespace.run(callback)

* return: the context associated with that callback

Create a new context on which values can be set or read. Run all the functions
that are called (either directly, or indirectly through asynchronous functions
that take callbacks themselves) from the provided callback within the scope of
that namespace. The new context is passed as an argument to the callback
when it's called.

### namespace.runAndReturn(callback)

* return: the return value of the callback

Create a new context on which values can be set or read. Run all the functions
that are called (either directly, or indirectly through asynchronous functions
that take callbacks themselves) from the provided callback within the scope of
that namespace. The new context is passed as an argument to the callback
when it's called.

Same as `namespace.run()` but returns the return value of the callback rather
than the context.

### namespace.bind(callback, [context])

* return: a callback wrapped up in a context closure

Bind a function to the specified namespace. Works analogously to
`Function.bind()` or `domain.bind()`. If context is omitted, it will default to
the currently active context in the namespace, or create a new context if none
is currently defined.

### namespace.bindEmitter(emitter)

Bind an EventEmitter to a namespace. Operates similarly to `domain.add`, with a
less generic name and the additional caveat that unlike domains, namespaces
never implicitly bind EventEmitters to themselves when they're created within
the context of an active namespace.

The most likely time you'd want to use this is when you're using Express or
Connect and want to make sure your middleware execution plays nice with CLS, or
are doing other things with HTTP listeners:

```javascript
http.createServer(function (req, res) {
  writer.bindEmitter(req);
  writer.bindEmitter(res);

  // do other stuff, some of which is asynchronous
});
```

### namespace.createContext()

* return: a context cloned from the currently active context

Use this with `namespace.bind()`, if you want to have a fresh context at invocation time,
as opposed to binding time:

```javascript
function doSomething(p) {
  console.log("%s = %s", p, ns.get(p));
}

function bindLater(callback) {
  return writer.bind(callback, writer.createContext());
}

setInterval(function () {
  var bound = bindLater(doSomething);
  bound('test');
}, 100);
```

## context

A context is a plain object created using the enclosing context as its prototype.

# copyright & license

See [LICENSE](https://github.com/jeff-lewis/cls-hooked/blob/master/LICENSE)
for the details of the BSD 2-clause "simplified" license used by
`continuation-local-storage`. This package was developed in 2012-2013 (and is
maintained now) by Forrest L Norvell, [@othiym23](https://github.com/othiym23),
with considerable help from Timothy Caswell,
[@creationix](https://github.com/creationix), working for The Node Firm. This
work was underwritten by New Relic for use in their Node.js instrumentation
agent, so maybe give that a look if you have some Node.js
performance-monitoring needs.

[timer functions]: https://nodejs.org/api/timers.html
[setImmediate]:    https://nodejs.org/api/timers.html#timers_setimmediate_callback_arg
[setTimeout]:      https://nodejs.org/api/timers.html#timers_settimeout_callback_delay_arg
[setInterval]:     https://nodejs.org/api/timers.html#timers_setinterval_callback_delay_arg
[cps]:             http://en.wikipedia.org/wiki/Continuation-passing_style
