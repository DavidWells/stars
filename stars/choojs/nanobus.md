---
repo: choojs/nanobus
url: 'https://github.com/choojs/nanobus'
homepage: ''
starredAt: '2018-08-30T18:46:08Z'
createdAt: '2017-03-04T00:44:50Z'
updatedAt: '2025-02-08T11:06:50Z'
language: JavaScript
license: MIT
branch: master
stars: 227
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:15.125Z'
description: "\U0001F68E - Tiny message bus"
tags: []
---

# nanobus [![stability][0]][1]
[![npm version][2]][3] [![build status][4]][5] [![test coverage][6]][7]
[![downloads][8]][9] [![js-standard-style][10]][11]

Tiny message bus.

## Usage
```js
var nanobus = require('nanobus')
var bus = nanobus()

bus.on('foo', function (color) {
  console.log('color is', color)
})

bus.emit('foo', 'blue')
```

## FAQ
### Why not use the Node API?
We had the requirement for a `*` event to catch all calls, and figured we could
improve the file size at the same time. This library is about 1/3rd the size of
Node's version. And it was easy to build, so yeah good enough of an excuse hah.

### How do I listen for replies?
You can do this by using the `.once()` listener and establishing a convention
around naming schemas.

```js
bus.on('foo', function (color) {
  console.log('foo called')
  bus.emit('foo:res')
})

bus.once('foo:res', function () {
  console.log('response received')
})
bus.emit('foo')
```

### When shouldn't I use this package?
If you're only writing code that runs inside Node and don't need a `'*'`
listener, consider using the built-in event emitter API instead.

### Are the emitters asynchronous?
No. If you're interested in doing that, use something like
[nanotick](https://github.com/yoshuawuyts/nanotick) to batch events and ensure
they run asynchronously.

## API
### `bus = nanobus([name])`
Create a new `nanobus` instance. Optionally takes a name that will be used for
tracing in the browser using the `performance.mark` / `performance.measure`
API.

### `bus.emit(eventName, [data])`
Emit an event. Arbitrary data can optionally be passed as an argument. `'*'`
listeners run after named listeners.

### `bus.on(eventName, listener([data]))`
### `bus.addListener(eventName, listener([data]))`
Listen to an event. If the event name is `'*'` the listener signature is
`listener(eventName, [data], [performanceTimingId])`.

### `bus.prependListener(eventName, listener([data]))`
Listen to an event, but make sure it's pushed to the start of the listener
queue. If the event name is `'*'` the listener signature is
`listener(eventName, [data])`.

### `bus.once(eventName, listener([data]))`
Listen to an event, and clear it after it's been called once.  If the event
name is `'*'` the listener signature is
`listener(eventName, [data], [performanceTimingId])`.

### `bus.prependOnceListener(eventName, listener([data]))`
Listen to an event, and clear it after it's been called once.  If the event
name is `'*'` the listener signature is `listener(eventName, [data])`.

### `bus.removeListener(eventName, listener)`
Remove a specific listener to an event.

### `listeners = bus.listeners(eventName)`
Return all listeners for a given event. `'*'` listeners are not included in
this list. Use `bus.listeners('*')` to get a list of `'*'` listeners.

### `bus.removeAllListeners([eventName])`
Remove all listeners to an event. If no event name is passed, removes all
listeners on the message bus. `'*'` listeners are not removed unless
`eventName` is `*` or no event name is passed.

## TypeScript

Optional event typing is available in TypeScript by passing an object type with 
event names as keys and event listener function signatures as values.

```ts
// if compilerOptions.esModuleInterop = true
import Nanobus from "nanobus"
// else
import Nanobus = require("nanobus") 

type Events = {
    foo: (color: string) => void
    bar: (count: number) => void
}

const bus = new Nanobus<Events>()

bus.on("foo", color => {
    // color: string
    console.log("color is", color)
})

bus.on("bar", count => {
    // count: number
    console.log("count is", count)
})

bus.on("*", (eventName, data) => {
    // eventName: "foo" | "bar"
    // data: any[]
    if (eventName === "foo") {
        const [color] = data as Parameters<Events["foo"]>
        // color: string
    } else if (eventName === "bar") {
        const [count] = data as Parameters<Events["bar"]>
        // count: number
    }
})

bus.emit("foo", "blue")  // required arguments: [string]
bus.emit("bar", 100)  // required arguments: [number]
```

## License
[MIT](https://tldrlegal.com/license/mit-license)

[0]: https://img.shields.io/badge/stability-experimental-orange.svg?style=flat-square
[1]: https://nodejs.org/api/documentation.html#documentation_stability_index
[2]: https://img.shields.io/npm/v/nanobus.svg?style=flat-square
[3]: https://npmjs.org/package/nanobus
[4]: https://img.shields.io/travis/choojs/nanobus/master.svg?style=flat-square
[5]: https://travis-ci.org/choojs/nanobus
[6]: https://img.shields.io/codecov/c/github/choojs/nanobus/master.svg?style=flat-square
[7]: https://codecov.io/github/choojs/nanobus
[8]: http://img.shields.io/npm/dm/nanobus.svg?style=flat-square
[9]: https://npmjs.org/package/nanobus
[10]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[11]: https://github.com/feross/standard
