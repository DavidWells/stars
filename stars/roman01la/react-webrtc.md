---
repo: roman01la/react-webrtc
url: 'https://github.com/roman01la/react-webrtc'
homepage: 'http://demo.romanliutikov.com/react-webrtc/'
starredAt: '2015-03-13T00:06:20Z'
createdAt: '2015-02-19T00:16:51Z'
updatedAt: '2025-01-16T18:11:42Z'
language: JavaScript
license: MIT
branch: master
stars: 83
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:49.182Z'
description: WebRTC React mixins for real-time communication in React components
tags: []
---

[![npm version](https://badge.fury.io/js/react-webrtc.svg)](http://badge.fury.io/js/react-webrtc)
![](https://img.shields.io/badge/maintainer%20needed-!-red.svg)

# React WebRTC

WebRTC React mixins for real-time communication in React components using [PeerJS](https://github.com/peers/peerjs) library. Read more on how [PeerJS](http://peerjs.com/docs) works.

[DEMO](http://demo.romanliutikov.com/react-webrtc/)

## WIP

This is WIP, check [Todo](#todo). More features will come soon.

## Installation

This package requires `webpack` and [`babel-loader`](https://github.com/babel/babel-loader). Check [`webpack.config.js`](./webpack.config.js) for build configuration.

`npm install react-webrtc`

## Mixins

### DataChannelMixin (P2P data transmission)

This mixin extends React component with API call functions and event handling interface.

Also component's state will be populated with `rtc_id` property, which is a session ID for current peer.

#### API

- `.connect(id)` — connect to remote peer by its `id`.
- `.send(data)` — send data to all connected peers.
- `.close(id)` — close all connections or specified by `id`.

#### Interface

- `._onData (data) {...}` — handle incoming data.
- `._onInbound (id) {...}` — handle inbound connection.
- `._onInboundClose (id) {...}` — handle closed inbound connection.
- `._onOutbound (id) {...}` — handle outbound connection.
- `._onOutboundClose (id) {...}` — handle closed outbound connection.

## Usage

Check [`examples`](https://github.com/roman01la/react-webrtc/blob/master/examples/) directory.

## Development

`npm install && npm start`

Go to [localhost:3000/examples/](http://localhost:3000/examples/)

## Todo

- [x] DataChannel
- [ ] MediaStream
