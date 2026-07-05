---
repo: QubitProducts/secret-door
url: 'https://github.com/QubitProducts/secret-door'
homepage: ''
starredAt: '2016-03-29T19:56:58Z'
createdAt: '2014-09-30T09:28:33Z'
updatedAt: '2024-05-23T03:32:39Z'
language: JavaScript
license: MIT
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:29.688Z'
description: >-
  An RPC implementation on top of window.postMessage for cross context
  communication in the browser :secret: :door:
tags:
  - ceh
  - implement
---

# secret-door

secret-door is an RPC implementation on top of `window.postMessage` for cross context communication in the browser. It can be used, for example, to call functions in a cross domain iframe.

secret-door returns promises when executing remote functions and therefore assumes that `window.Promise` is available.



## Install

npm install --save secret-door



## Usage

In parent window.

```js
var Channel = require("secret-door");

var channel = new Channel({
  targetWindow: document.querySelectorAll(".some-iframe")[0].contentWindow
}).setHandler({
  foo: function () {},
  bar: function () {}
}, this);

// set an additional handler
channel.setHandler("getAnswer", function (arg1, arg2) {
  // we can return a promise
  return new Promise(function (resolve) {
    return doSomething(arg1 + arg2);
  })
}, this)

// set a catch all handler
channel.setHandler("*", function (command, arg1, arg2, arg3) {
  // all remote command calls that don't have a registered
  // named handler can be handled here
});

// unset a handler
channel.clearHandler("bar");

//call a function within the iframe
channel.execute("getURL").then(function (url) {
  console.log(url);
});
```

In an iframe.

```js
var channel = new Channel({
  targetWindow: window.parent
}).setHandler({
  getURL: function () {
    return window.location.href;
  }
});
channel.execute("getAnswer", 2, 5).then(function (answer) {
  console.log(answer);
});
```


## API


### var channel = new Channel(options)

* **options.targetWindow** - The window to send messages to (e.g. iframeEl.contentWindow, window.parent)
* **options.targetOrigin** - What the origin of the other window must be for sending messages
* **options.namespace** - Allows using multiple instances of secret door on the same page
* **options.filterIncoming** - A function that can reject an incoming message by inspecting parsed data and raw messageEvent


### channel.setHandler()

```js
channel.setHandler(name, fn, context);
channel.setHandler(obj, context);
```

Set the handler for incoming commands.

The handler can be named via the first argument.
e.g. channel.setHandler('foo', function () {});

The handler can also be an object mapping names to functions.
e.g. channel.setHandler({foo: function () {}, bar: function () {}});

Both can be used in combination. Further calls to either will extend the list of channel's handlers.

If a handler with that name already exists, it will be overwritten with the new one.

The last argument can be used to pass the context that the handler functions will be applied in.

To handle all incoming commands for which a named handler is not available, register a handler with name "*".
e.g. channel.setHandler('*', function (command, arg1) { console.log('handling all commands')} );

Handlers can return promises.


### channel.execute(fnName, ...args)

Execute a function on the other side of the channel. First argument is the name of the remote function. The rest of the arguments will be passed as arguments to the remote function.


### channel.clearHandler(name)

Remove a handler.


### channel.clearAllHandlers(name)

Remove all handlers.

Returns a promise.


### channel.tap(fn)

Listen in on all requests/responses going through this channel. The callback will be called with 1 object describing the request or response. Only messages that actually go via the channel will be tapped, in other words if the message is in the wrong namespace, wrong origin or is filtered by `filterIncoming` it won't show up in the tap.


### channel.destroy()

Remove handler references and stop listening to events.



## Test

```
npm test
```

## Release

```
npm run release
```

Follow semver rules when specifying a new version.

## Want to work on this for your day job?

This project was created by the Engineering team at [Qubit](http://www.qubit.com). As we use open source libraries, we make our projects public where possible.

We’re currently looking to grow our team, so if you’re a JavaScript engineer and keen on ES2016 React+Redux applications and Node micro services, why not get in touch? Work with like minded engineers in an environment that has fantastic perks, including an annual ski trip, yoga, a competitive foosball league, and copious amounts of yogurt.

Find more details on our [Engineering site](https://eng.qubit.com). Don’t have an up to date CV? Just link us your Github profile! Better yet, send us a pull request that improves this project.
