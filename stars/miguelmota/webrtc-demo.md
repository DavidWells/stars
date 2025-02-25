---
repo: miguelmota/webrtc-demo
url: 'https://github.com/miguelmota/webrtc-demo'
homepage: 'https://lab.miguelmota.com/webrtc-demo'
starredAt: '2018-07-15T04:18:50Z'
createdAt: '2015-01-18T00:32:55Z'
updatedAt: '2023-01-28T00:32:20Z'
language: JavaScript
license: MIT
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:18.727Z'
description: WebRTC video chat and data channels
tags: []
---

# WebRTC demo

In this demo we connect to a peer using [RTCPeerConnection](https://developer.mozilla.org/en-US/docs/Web/API/RTCPeerConnection) and share a media stream accessed via [getUserMedia](https://developer.mozilla.org/en-US/docs/NavigatorUserMedia.getUserMedia). We can also send arbriary data to the peer using the [RTCDataChannel](https://developer.mozilla.org/en-US/docs/Web/API/RTCDataChannel). We have a simple [Node.js](http://nodejs.org/) server set up with [socket.io](http://socket.io/) as the signaling mechanism between the peer connections to exchange [ICECandidate](https://developer.mozilla.org/en-US/docs/Web/Events/icecandidate) information in order to be able to do the inital connection.

# Demo

[https://lab.miguelmota.com/webrtc-demo](https://lab.miguelmota.com/webrtc-demo)

# Usage

```bash
node server/server.js
```

```bash
cd client/

python -m SimpleHTTPServer 9999
```

Navigate to demo at `http://localhost:9999`

# License

MIT
