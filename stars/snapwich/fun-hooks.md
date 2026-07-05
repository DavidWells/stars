---
repo: snapwich/fun-hooks
url: 'https://github.com/snapwich/fun-hooks'
homepage: ''
starredAt: '2022-02-03T04:08:14Z'
createdAt: '2018-11-19T23:11:43Z'
updatedAt: '2024-10-28T10:57:30Z'
language: JavaScript
license: MIT
branch: master
stars: 33
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:16.606Z'
description: A generalized and simple hooking API for adding extensibility to applications
tags: []
---

[![Build Status](https://circleci.com/gh/snapwich/fun-hooks.svg?style=svg)](https://circleci.com/gh/snapwich/fun-hooks)

# Fun Hooks
## Installation
```bash
npm install fun-hooks
```

## Motivation
Fun(ctional) Hooks is a generalized and simple hooking API for creating runtime extensible applications. This 
function-based approach operates on functions themselves rather than object methods to be fully compatible with purely 
functional code, but still maintains some convenience operations for dealing with object-oriented code.

The goals of this library are the following (in priority order):

  1. [Easy debugging](#debugging)
  2. [Performance](#performance)
  3. [Simple but powerful API](#usage)
  4. [Limited footprint](#footprint)

### Compatibility for older environments
If you will be running fun-hooks in an environment that doesn't support the use of [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy#browser_compatibility)
objects or you are using MooTools, Prototype.js, or some other old school js library that incorrectly patches Array and 
Function prototype methods, you should use the latest [0.9.x version of fun-hooks](https://github.com/snapwich/fun-hooks/tree/legacy/0.9.x) 
that includes the appropriate compatibility polyfills.

## Usage
Hooks follow the same format whether they're `sync` or `async` and whether they're `before` or `after` hooks; however, 
it's important to remember that `sync` `after` hooks act on the _return_ result and `async` `after` hooks act on the 
_callback's_ arguments.

### Configuration
  - **ready** : number - (Optional, default: **0** (meaning no `ready()` call required)) See [Ready](#ready).
```javascript
import funHooks from "fun-hooks";    // es6 (using webpack or babel)
let funHooks = require("fun-hooks"); // or in node
let funHooks = window.funHooks;      // or directly in browser from somewhere like https://unpkg.com/fun-hooks@latest
let createHook = funHooks({
  ready: funHooks.ASYNC | funHooks.QUEUE
});
```

### Sync (`before`, `after`)
```javascript
function sum(a, b) {
  return a + b;
}

let hookedSum = createHook("sync", sum);

// sync `before` hooks accept the arguments to sum, and `next` passes the arguments to sum (or next `before` hook)
hookedSum.before(function(next, a, b) {
  a = a + 1;    // modify arguments or do some operation
  next(a, b);   // call next when you're done
});

// sync `after` hooks accepts the return result from sum, and `next` returns the result (or calls next `after` hook)
hookedSum.after(function(next, result) {
  next(result + 1);
});

let result = hookedSum(1, 1);
// hookedSum(1, 1) -> hookedSum.before(1, 1) -> sum(2, 1) -> hookedSum.after(3) -> 4

console.log(result); // 4
```

_Note: You should always use `sync` if you are returning a value.  This includes if you are returning a `Promise`.  
Also, if you're hooking a function with `sync` your hooks should all call `next` synchronously (e.g. no ajax) so that 
your value can be returned.  If you asynchronously call `next` in a `sync` hook then the return value will be 
`undefined`._

### Async (`before`, `after`)
```javascript
function increment(a, b, callback) {
  callback(a + 1, b + 1);
}

let hookedIncrement = createHook("async", increment);

// async `before` hooks accept the arguments to sum, and `next` passes the arguments to the next `before` hook or sum (same as sync)
hookedIncrement.before(function(next, a, b) {
  a = a + 1;
  next(a, b);
});

// async `after` hooks accept the arguments sum passed to callback, and `next` calls sum's actual callback (or next `after` hook)
hookedIncrement.after(function(next, a, b) {
  next(a, b + 1);
});

hookedIncrement(1, 1, function(a, b) {
  console.log(a, b); // 3, 3
})
// hookedIncrement(1, 1) -> hookedIncrement.before(1, 1) -> increment(2, 1) -> hookedIncrement.after(3, 2) -> callback(3, 3)
```

You'll notice no difference above in `sync` or `async` with the `before` hooks, but the `after` hooks are dealing with 
the `callback`'s parameters in one case and the return result (which will always be a single value) in the other.

### Removing hooks
Hooks can be removed using the remove method. You can either use a match object to remove a specific hook or pass 
nothing to remove all hooks.

```javascript
function beforeHook() {
  console.log("called");
}

hookedSum.before(beforeHook);

hookedSum(1, 1); // "called"

hookedSum.getHooks({hook: beforeHook}).remove();

hookedSum(1, 1); // hook not called

hookedSum.before(beforeHook);
hookedSum.after(afterHook);
hookedSum.removeAll(); // remove all before and after hooks
```

### Priority
You can attach as many `before` or `after` hooks as you'd like to a function.  The order in which the hooks are run is
dependent on the order they're added or an optional `priority` argument set when creating the hook (which defaults 
to a priority of `10`).

```javascript
hookedSum.before(beforeHook1);
hookedSum.before(beforeHook2, 9);
hookedSum.before(beforeHook3, 11);
hookedSum.after(afterHook1, 8);
hookedSum.after(afterHook2);

hookedSum(1, 1); // hookedSum -> beforeHook3 -> beforeHook1 -> beforeHook2 -> sum -> afterHook2 -> afterHook1
```

### Bailing
A hook can bail early to skip the other hooks or to skip the hooked function altogether (effectively stubbing it).

```javascript
function bailHook(next, a, b) {
  next.bail(1, 1);
}

hookedIncrement.after(bailHook);
hookedIncrement.after(afterHook2);

// notice `afterHook2` is not called
hookedIncrement(1, 1, function callback(a, b) {}); // hookedIncrement -> increment -> bailHook -> callback(1, 1)

hookedIncrement.before(bailHook);

// notice not even the original `increment` function is called now
hookedIncrement(1, 1, function callback(a, b) {}); // hookedIncrement -> bailHook -> callback(1, 1)
```

If you want to bail completely (i.e. not even call the callback) then just don't call `next`.

### Get Hooks
You can get all the hook entries attached to a hooked function using `hookedFn.getHooks()`.  An optional argument 
can be passed for matching only specific kinds of hooks: e.g. `hookedFn.getHooks({type: "before"})` or
`hookedFn.getHooks({hook: myBeforeHook})` to get a specific hook entry.

### Side-effect (or pass-through) only hooks
If you want to have a hook that just performs some side-effect before or after the hooked function but does not modify 
arguments, just call `next` and pass-through the arguments without modifying them.  It's important that `next` is
still called with the original arguments so that the hook-chain can continue.

```javascript
hookedIncrement.before(function sideEffect(next, ...args) {
  console.log("I'm a side-effect!");
  next.apply(this, args);
})
```

### Naming
Hooks can be given a name and then accessed using the `.get` method.  This can be useful for defining the 
extensible API for your application.  _Note: You can also just expose references to the hooked functions themselves, 
this is just a convenience.  Also, when using named hooks, you can reference the hook by name using `.get` and add 
`before` and `after` hooks before the hook itself has actually been created!

_Note: For Typescript users, the `.get` function requires a type parameter defining the type of hook to expect.
Type helpers are exported as `SyncHook<T>` and `AsyncHook<T>` where `T` is the hooked function signature. If you want
Typescript to infer proper types then you should just expose references to the hooked function themselves._

```javascript
// some-applicaiton
import hookFactory from "fun-hooks"; 
let hook = hookFactory(); // default configuration

function getItem(id, cb) {
  fetchItem(id).then(cb);
}

function getPrice(item) {
  return item.price;
}

// works, even though the "item" hook isn't defined until below!
hook.get("item").after(function(next, id) {
  console.log("accessing item: " + id);
  next(id);
});

hook("async", getItem, "item"); // naming this hook `item`
hook("sync", getPrice, "price"); // naming this hook `price`

export const getHook = hook.get;

// extending application
import { getHook } from "some-application";

getHook("item").before(function modifyId(next, id) {
  let newId = getUpdatedId(id); // `id` naming scheme changed... luckily we have this hook available!
  next(newId);
});

getHook("price").after(function currencyConversion(next, price) {
  let newPrice = convert(price, "USD");
  next(newPrice);
});
```

### Objects
While functions are the base unit of extension in this library, there is a convenience provided to apply hooks to object
methods if an object is passed to the hook creator. _Note: `this` will be bound correctly in the hooked function as well 
as in the `before` and `after` hooks (i.e. `this` refers to the object instance inside hooks)._

```javascript
class Thing {
  constructor() {
    this.value = 1;
  }
  setValue(value) {
    this.value = value;
  }
  getValue() {
    return this.value;
  }
}
hook(Thing.prototype, ["setValue", "getValue"]);

Thing.prototype.getValue.after(function(next) {
  next(this.value + 2);
});

let myThing = new Thing();
myThing.setValue(1);

console.log(myThing.getValue()); // 3
```

_Note: `hook` will also walk the prototype chain and find `getValue` if it were an inherited method._

If `["setValue", "getValue"]` were omitted then `hook` would hook the results of
`Object.getOwnPropertyNames(Thing.prototype)` excluding `constructor` and any methods marked private with a preceding
underscore (e.g. `_privateMethod() {}`).  Also, if the list of methods to hook is omitted, `hook` will no longer walk 
the prototype chain to avoid creating accidental hooks.  

Hooked methods are all assumed to be `sync` unless otherwise specified.

```javascript
hook(Thing.prototype, ["setValue", "sync:getValue" /* same as "getValue" */, "async:loadData"]);
```

If a third argument, `name`, is provided, then the object's hooked methods will be made accessible to the `.get` 
method described above using `<Object Name>.<Method Name>` in [Naming](#naming).

```javascript
hook(Thing.prototype, ["setValue", "getValue"], "thing");

// grab the collection of hooks
hook.get("thing"); // {thing: {setValue, getValue}}
// or grab an individual hook
hook.get("thing.setValue");
```

### Ready
Fun hooks allows you to specify whether hooked functions should either throw an error or queue (for async hooks only)
when they are called before being "ready". To utilize this feature, use the `ready` configuration option when setting
up the hooking library. The `ready` API is turned off by default.

e.g.
```javascript
import funHooks from "fun-hooks"; 
let hook = funHooks({
  // ready accepts a bit mask to determine ready behavior for sync and async hooks
  // SYNC will cause sync hooks to throw if called before ready
  // ASYNC will cause async hooks to throw if called before ready
  // ASYNC + QUEUE will cause async hooks to queue (rather than throw) if called before ready (and execute immediately 
  // when `ready()` is called)
  ready: funHooks.SYNC | funHooks.ASYNC | funHooks.QUEUE
});

function sum(a + b) {
  return a + b;
}
let hookedSum = hook(sum);

hookedSum(1, 2); // throws "not ready" error

function addTen(a, cb) {
  cb(a + 10);
}

let hookedAddTen = hook(addTen);

hookedAddTen(6, function(result) {
  console.log(result);
}); // this will queue the call and `addOne` will not be executed

function addOneHook(next, a) {
  next(a + 1);
}
hookedAddTen.before(addOneHook);
hookedSum.before(addOneHook)

// all hooks are ready now, queued `addTen` and its hooks are now called and 17 is printed to screen.
// notice the that the `addOneHook` for `hookedAddTen` was used even though it was added after `hookedAddTen` was called
hook.ready(); 

hookedSum(1, 2); // prints 4 since addOne hook was installed
```

## Additional Information

### Debugging
One of the hardest parts of using libraries that allow for hooking, intercepting, and/or adding some sort of middleware 
comes about when attempting to debug the code.  These libraries usually require a lot of scaffolding that manages
the hooks, caches results, changes some internal state, and calls the appropriate next hook in the sequence; this 
creates a debugging nightmare when you step into your wrapped function or your hook's `next` call and are now sifting 
through some library's scaffolding code helplessly trying to find your way back to your own code base.  

Fun Hooks solves this problem by doing as much work as possible when the hook is created (rather than when it's 
invoked) dynamically generating a wrapper function that already has the hooks (and the original function) chained in 
the proper callback order.  This means that the `next` function passed into each hook immediately invokes the next hook 
and not some scaffolding code.

example:
```
wrappedFn() => hook1() -> hook2() -> wrappedFn() -> hook3() -> hook4()
rather than
wrappedFn() => hook1() -> scaffolding -> hook2() -> scaffolding -> wrappedFn() ... etc
```
(Depending on the type and nature of the hook, some _might_ have a one-line wrapper function to do something like 
extract a return result from a `sync` function)

Also, when wrapping a function for extension, Fun Hooks returns a Proxy object rather than a wrapper function. This
allows the library to skip scaffolding code altogether if there are no hooks to apply, meaning if you step into your
`wrappedFn()` invocation but no hooks have been attached, you'll step directly into your `wrappedFn` code.

Finally, when you're stepping through your hooks or wrapped function code, the previously executed hooks will be still 
be present in the stack since they are all invoked by the previous hook as opposed to iteratively looped through in 
scaffolding code and invoked individually.

All of the above creates a pleasant hooking environment that is much easier to debug.

### Performance
Since most of the scaffolding code involved with function invocation has been avoided, this makes the execution of a 
function and all its hooks more efficient at the sake of a little more overhead when creating the hook. Considering 
hooked functions (and their hooks) are usually invoked a lot more frequently than hooks are added/removed, I think 
this is a decent trade-off.

Proxy forwarding is also much more performant than a function wrapper* (in a browser; in Node.js that currently 
doesn't seem to be the case, but will probably change as Proxies are further optimized).

### Footprint
Since this hooking library is written for Browsers first the footprint and API is kept as slim as possible.

### Code readability
Currently parts of this library are not very readable. Since much of the code is dynamically generated (using 
`new Function`) and is in strings it can't be properly minified by a minifier and is therefore written into the code 
pre-minified. This hurts readability but is necessary to remain as small as possible. Readability could probably 
still be improved somewhat but is considered low-priority compared to the goals stated above.  There are extensive 
tests to ensure the code is as bug-free as possible.

### `next` as first argument
It is a common convention in Javascript to pass callbacks as the last argument to a function. However, `fun-hooks` 
breaks this convention for a two reasons.

 1. Javascript provides `Funciton.prototype.bind` to set `this` as well as for providing partial function application. 
 `fun-hooks` uses this feature extensively in order to stack the hooks in such a way that they directly call
 each other. However, `bind` only allows partially applying arguments starting from the left. If the `next` callback 
 were the last argument, this would require each hook being wrapped in another function to perform _right_ partial
 function application. (this is actually what is done for the hooked `async` function itself since it will have 
 its callback on the right by convention)
 2. Having the `next` callback on the left allows "pass-through" hooks to easily decouple themselves from worrying
 about function arity. (i.e. `(next, ...args) => { doSomething(); next.apply(null, args) }` is easy and still works 
 if parameters are added to the function, whereas `(a, b, next) => { doSomething(); next.call(null, a, b) }` is coupled 
 to the hooked function's interface and needs to be refactored if the interface changes)
 
### CSP (Content Security Policy) considerations
Since this library uses `new Function` you may need to allow for `'unsafe-eval'` if your website uses a 
[CSP policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) (Node.js users need not worry). Technically the way 
this library uses `new Function` is safe, but what can you do... If you use CSP and cannot apply `'unsafe-eval'` then 
there is a "no-eval" version available at the cost of some overhead. You can use it with the following import:

```
import funHooks from 'fun-hooks/no-eval/index.js'
```

## Development
```bash
npm run test 
# or with debugging
npm run test:debug

# lint
npm run lint
```
