---
repo: SocketCluster/socketcluster
url: 'https://github.com/SocketCluster/socketcluster'
homepage: 'https://socketcluster.io'
starredAt: '2015-07-06T19:26:30Z'
createdAt: '2013-09-23T12:11:47Z'
updatedAt: '2025-02-21T10:34:50Z'
language: JavaScript
license: MIT
branch: master
stars: 6154
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:39.641Z'
description: Highly scalable realtime pub/sub and RPC framework
tags:
  - docker
  - framework
  - javascript
  - kubernetes
  - nodejs
  - pubsub
  - realtime
  - scalable
  - socketcluster
  - websocket
  - websockets
---

# SocketCluster

Toolset and boilerplate for quickly creating systems using SocketCluster.
See the client and server repos for documentation:

- https://github.com/SocketCluster/socketcluster-client
- https://github.com/SocketCluster/socketcluster-server

Documentation for SCC (horizontally scalable cluster) is available at https://github.com/SocketCluster/socketcluster/blob/master/scc-guide.md

## Installation

Setup the `socketcluster` command:

```bash
npm install -g socketcluster
```

or:

```bash
sudo npm install -g socketcluster
```

then:

```bash
socketcluster create myapp
```

Once it's installed, go to your new myapp/ directory and launch with:

```bash
node server
```

Access at URL http://localhost:8000/

Node.js `v10.0.0` or above is recommended but you can also use SocketCluster with older Node.js versions if you use `while` loops instead of `for-await-of` loops.

## Compatibility mode

For compatibility with existing SocketCluster clients, set the `protocolVersion` to `1` and make sure that the `path` matches your old client path:

```js
let agServer = socketClusterServer.attach(httpServer, {
  protocolVersion: 1,
  path: '/socketcluster/'
});
```

## Change log

See the 'releases' section for changes: https://github.com/SocketCluster/socketcluster/releases

## License

(The MIT License)

Copyright (c) 2013-2023 SocketCluster.io

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
