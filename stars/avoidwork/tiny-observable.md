---
repo: avoidwork/tiny-observable
url: 'https://github.com/avoidwork/tiny-observable'
homepage: ''
starredAt: '2018-12-13T19:11:47Z'
createdAt: '2015-12-03T23:29:36Z'
updatedAt: '2025-02-18T00:05:14Z'
language: JavaScript
license: BSD-3-Clause
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:56.686Z'
description: >-
  Tiny Observable for Client or Server, to be used with DOM elements or custom
  objects.
tags: []
---

# Tiny Observable

Tiny Observable for Client or Server, to be used with DOM elements or custom objects.

## Using the factory

```javascript
import {observable} from "tiny-observable";
const observer = observable();

// Hooking into every click event
observer.hook(document.querySelector("body"), "click");

// Capturing events, and redirecting
observer.on("click", ev => customFunction(ev));
```

## Using the Class

```javascript
import {Observable} from "tiny-observable";
const observer = Observable();
```

```javascript
import {Observable} from "tiny-observable";
class MyObservable extends Observable {}
```

## Testing

Tiny Observable has 100% code coverage with its tests.

```console
> nyc mocha test/*.js



  Observable
    √ Will create a new observable
    √ Will reassign limit with setMaxListeners()
    √ Will dispatch events when empty
    √ Will hook element dispatch of event
    √ Will dispatch event
    √ Will unhook element dispatch of event
    √ Will add & remove event handlers to a hooked input
    √ Will throw errors with bad inputs


  8 passing (6ms)

---------------------|---------|----------|---------|---------|---------------------------------------
File                 | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
---------------------|---------|----------|---------|---------|---------------------------------------
All files            |   95.83 |    76.71 |   86.95 |     100 |                                      
 tiny-observable.cjs |   95.83 |    76.71 |   86.95 |     100 | 18-24,38,58,63,89,114,127-139,154-155
---------------------|---------|----------|---------|---------|---------------------------------------
```

## API

### addListener(event, handler[, id, scope])
Adds a listener for an event.

### dispatch(event [, ...]);
Dispatches an event, with optional arguments.

### emit(event [, ...]);
Dispatches an event, with optional arguments.

### eventNames();
Returns an Array of event names.

### getMaxListeners();
Returns the limit of listeners per event.

### listenerCount(event);
Returns the count of listeners per event; this does not relate to hooked objects or elements.

### hook(object, event);
Hooks an event on an object or element.

### id();
Returns a random ID.

### off(event, id);
Removes all, or a specific listener for an event.

### on(event, handler[, id, scope])
Adds a listener for an event.

### once(event, handler[, id, scope])
Adds a single execution event listener for an event.

### rawListeners(event)
Returns an Array of raw functions for an event.

### removeAllListeners(event)
Removes all event listeners for an event.

### removeListener(event, id)
Removes an event listener by id.

### setMaxListeners(n);
Sets the limit of listeners per event.

### unhook(object, event);
Unhooks an event from an object or element.

## License
Copyright (c) 2023 Jason Mulligan
Licensed under the BSD-3 license
