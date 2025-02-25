---
repo: caolan/signaller
url: 'https://github.com/caolan/signaller'
homepage: null
starredAt: '2024-12-31T07:52:44Z'
createdAt: '2024-07-07T19:22:59Z'
updatedAt: '2024-12-31T08:33:24Z'
language: JavaScript
license: MIT
branch: main
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:33.760Z'
description: State change notifications
tags: []
---

# Signaller

Notify subscribers after a value is updated.

Multiple signals are handled efficiently, making this library useful to
propagate new application state to components.

~360 bytes (minified + gzipped).

## Installation

Either use `src/signaller.js` directly as a JavaScript module or install
via a package manager.

```
npm install signaller
```

## Example

```javascript
import {Signaller, watch} from "signaller.js";

// Create some Signallers to hold state.
const name = new Signaller("Pickles");
const count = new Signaller(10);

// Watch state for changes.
watch([name, count], changed => {
    console.log(`${name.value}: ${count.value}`);
});

// Multiple synchronous updates will not call the
// watch handler multiple times.
name.value = "Bananas";
name.value = "Cookies";
count.value++;

// Hmmm. More cookies, please.
setTimeout(() => count.value = 200, 1000);
```

Output:

```
Cookies: 11
Cookies: 200
```

## Tests

```
deno test
```

## Signaller(initial)

Represents a value that may change multiple times.

### Properties

#### .value

The current value of the Signaller. Setting this property to a value that
is not strictly equal to the old value will automatically call signal().

### Methods

#### .signal()

Takes all callbacks from the waiting list (clearing it) and calls 
each callback synchronously in the order they were added.

You do not need to call this function directly unless you have
mutated the underlying value and wish to signal the change to any
watchers manually.

#### .addCallback(callback)

Appends a callback to the waiting list that will be called on the next
signal. The callback function is called with this Signaller instance as
its only argument. Its return value is ignored.

Normally, you would use `watch()` instead of calling this method directly.

#### .removeCallback(callback)

Removes the first matching callback from the waiting list (if 
any). Does nothing if callback has not been registered and will not
throw.

Normally, you would use the stop function returned by `watch()` instead
of calling this method directly.

## watch(signallers, handler)

Watches an Array of Signallers for changes.

The handler will always be called asynchronously following a
signal. Multiple signals before the next handler completes will not
queue multiple handler calls. This means not every intermediate value
of a Signaller will necessarily be seen by the handler.

The handler receives an Array of Signaller instances that have signalled
since the last time the handler was called. If the handler returns a
Promise, the handler will not be called again until the Promise completes.

### Returns

A function to stop watching for signals. After calling this function, the
handler is guaranteed to not be called by again even if a signal is queued.
