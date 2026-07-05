---
repo: heineiuo/isomorphic-ws
url: 'https://github.com/heineiuo/isomorphic-ws'
homepage: ''
starredAt: '2018-07-26T21:08:44Z'
createdAt: '2017-10-05T04:22:24Z'
updatedAt: '2025-02-13T16:44:16Z'
language: JavaScript
license: MIT
branch: master
stars: 404
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:17.762Z'
description: 'Isomorphic implementation of WebSocket (https://www.npmjs.com/package/ws)'
tags:
  - browser
  - isomorphic
  - nodejs
  - websocket
  - websockets
  - ws
---

# isomorphic-ws

Isomorphic implementation of WebSocket.

It uses:
- [ws](https://github.com/websockets/ws) on Node
- [global.WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket) in browsers

## Limitations

Before using this module you should know that
[`ws`](https://github.com/websockets/ws/blob/master/doc/ws.md#class-websocket)
is not perfectly API compatible with
[WebSocket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket),
you should always test your code against both Node and browsers.

Some major differences:

- no `Server` implementation in browsers
- no support for the constructor
  [`options`](https://github.com/websockets/ws/blob/master/doc/ws.md#new-websocketaddress-protocols-options)
  argument in browsers

## Usage

You need to install both this package and [ws](https://github.com/websockets/ws):

```
> npm i isomorphic-ws ws
```

Then just require this package:

```js
const WebSocket = require('isomorphic-ws');

const ws = new WebSocket('wss://websocket-echo.com/');

ws.onopen = function open() {
  console.log('connected');
  ws.send(Date.now());
};

ws.onclose = function close() {
  console.log('disconnected');
};

ws.onmessage = function incoming(data) {
  console.log(`Roundtrip time: ${Date.now() - data.data} ms`);

  setTimeout(function timeout() {
    ws.send(Date.now());
  }, 500);
};
```

## License

[MIT](LICENSE)
