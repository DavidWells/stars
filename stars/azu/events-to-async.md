---
repo: azu/events-to-async
url: 'https://github.com/azu/events-to-async'
homepage: ''
starredAt: '2021-08-22T04:52:32Z'
createdAt: '2021-08-21T14:56:37Z'
updatedAt: '2024-05-11T04:34:48Z'
language: TypeScript
license: MIT
branch: main
stars: 34
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:47.421Z'
description: 'Treat EventEmitter-like object using Async/Await, Async Iterator.'
tags:
  - async-await
  - async-generator
  - event-emitter
  - javascript
  - promise
  - typescript
---

# events-to-async

Treat EventEmitter-like object using Async/Await or Async Iterator.

Similar one of Node.js [`events.on`](https://nodejs.org/api/events.html#events_events_on_emitter_eventname_options)
and [`event.once`](https://nodejs.org/api/events.html#events_events_once_emitter_name_options), but it is generic.

## Features

- events to Async Iterator
- once event to a Promise
- support EventEmitter-like libraries
    - [`events.on`](https://nodejs.org/api/events.html#events_events_on_emitter_eventname_options)
      and [`event.once`](https://nodejs.org/api/events.html#events_events_once_emitter_name_options) only
      support `events`
- LightWeight: [~1kb](https://bundlephobia.com/package/events-to-async) (gzip)

## Install

Install with [npm](https://www.npmjs.com/):

    npm install events-to-async

## Usage

once an event to Promise

```js
import { EventEmitter } from "events";
import { on } from "events-to-async";

const events = new EventEmitter();
setTimeout(() => {
    events.emit("change", 1);
});
const event = await once((handler) => events.once("change", handler));
console.log(event); // => [1]
```

on events to AsyncIterator

```js
import { EventEmitter } from "events";
import { on } from "events-to-async";

const events = new EventEmitter();
const asyncIterator = on((handler) => {
    event.on("change", handler); // Listen
    return () => {
        // This function is called on occuring error or `break;`
        event.off("change", handler); // UnListen
    }
});
setTimeout(() => {
    events.emit("change", 1);
    events.emit("change", 2);
    events.emit("change", 3);
});
for await(const event of asyncIterator) {
    console.log(event); // [1] → [2] → [3]
}
// Unreachable here
```

You can stop the async iterator by using `break;`

```js
import { EventEmitter } from "events";
import { on } from "events-to-async";

const events = new EventEmitter();
const asyncIterator = on((handler) => {
    events.on("change", handler); // Listen
    return () => {
        // This function is called on occuring error or `break;`
        events.off("change", handler); // UnListen
    }
});
setTimeout(() => {
    events.emit("change", 1);
    events.emit("change", 2);
    events.emit("change", 3);
});
for await(const [num] of asyncIterator) {
    console.log(num); // 1 → 2 → 3
    if (num === 3) {
        break;
    }
}
console.log("4!!!"); 
```

### AbortController supports

You can cancel events using  [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController).

- Browser: [Modern browsers](https://caniuse.com/abortcontroller) supports
- Node.js 15+: supports
    - Node.js 14 requires polyfills
    - [abort-controller - npm](https://www.npmjs.com/package/abort-controller)
    - [node-abort-controller - npm](https://www.npmjs.com/package/node-abort-controller)

once an event with cancel

```js
import { EventEmitter } from "events";
import { on } from "events-to-async";

const events = new EventEmitter();
const abortController = new AbortController();
const event = once((handler) => {
    event.once("change", handler);
    return () => {
        event.off("change", handler);  // call it when occur error or abort
    }
}, { signal: abortController.signal });
// Abort
abortController.abort();
await event; // => throw Abort Error
```

on events with cancel

```js
import { EventEmitter } from "events";
import { on } from "events-to-async";

const events = new EventEmitter();
const abortController = new AbortController();
const asyncIterator = on((handler) => {
    events.on("change", handler);
    return () => {
        events.off("change", handler);
    }
}, { signal: abortController.signal });
// Abort
abortController.abort();
```

### TypeScript supports

`on<T>` and `once<T>` support generics that represent iterated value.

:memo: `on<T>` and `once<T>` always return an array

```ts
import { EventEmitter } from "events";
import { on } from "events-to-async";

const events = new EventEmitter();
type Event = number;
const asyncIterator = on<[Event]>((handler) => {
    events.on("change", handler);
    return () => events.off("change", handler)
});
setTimeout(() => {
    events.emit("change", 1);
    events.emit("change", 2);
    events.emit("change", 3);
});
for await(const event of asyncIterator) {
    console.log(event); // [1] → [2] → [3]
}
```

### Yet another EventEmitter supports

This library aim to support yet another `events` module like [eventmit](https://github.com/azu/eventmit).

```ts
import { eventmit } from "eventmit";
import { on } from "events-to-async";

type Event = { key: string };
const events = eventmit<Event>();
const asyncIterator = on<[Event]>((handler) => {
    events.on(handler);
    return () => events.off(handler);
});
setTimeout(() => {
    events.emit({ key: "value" });
});
for await (const event of asyncIterator) {
    assert.deepStrictEqual(event, [{ key: "value" }]);
    break;
}
```

## Changelog

See [Releases page](https://github.com/azu/events-to-async/releases).

## Running tests

Install devDependencies and Run `npm test`:

    npm test

## Contributing

Pull requests and stars are always welcome.

For bugs and feature requests, [please create an issue](https://github.com/azu/events-to-async/issues).

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

- azu: [GitHub](https://github.com/azu), [Twitter](https://twitter.com/azu_re)

## License

MIT © azu

## Related

- Node.js [`events.on`](https://nodejs.org/api/events.html#events_events_on_emitter_eventname_options)
  and [`event.once`](https://nodejs.org/api/events.html#events_events_once_emitter_name_options): <https://github.com/nodejs/node/blob/master/lib/events.js>
- [Async Iterable `EventEmitter.on(emitter, "event")` · Issue #27847 · nodejs/node](https://github.com/nodejs/node/issues/27847)
- [rolftimmermans/event-iterator: Convert event emitters and event targets to ES async iterators](https://github.com/rolftimmermans/event-iterator)
