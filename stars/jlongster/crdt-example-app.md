---
repo: jlongster/crdt-example-app
url: 'https://github.com/jlongster/crdt-example-app'
homepage: 'https://crdt.jlongster.com'
starredAt: '2020-01-12T21:13:42Z'
createdAt: '2019-12-03T03:33:50Z'
updatedAt: '2025-02-23T08:25:01Z'
language: JavaScript
license: NA
branch: master
stars: 630
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:09.048Z'
description: >-
  A full implementation of CRDTs using hybrid logical clocks and a demo app that
  uses it
tags: []
---


This is a demo app used for my dotJS 2019 talk ["CRDTs for Mortals"](https://www.youtube.com/watch?v=DEcwa68f-jY)

Slides here: https://jlongster.com/s/dotjs-crdt-slides.pdf

View this app here: https://crdt.jlongster.com

It contains a full implementation of [hybrid logical clocks](https://cse.buffalo.edu/tech-reports/2014-04.pdf) to generate timestamp for causal ordering of messages. Using these timestamps, CRDTs can be easily used to change local data that also syncs to multiple devices. This also contains an implementation of a merkle tree to check consistency of the data to make sure all clients are in sync.

It provides a server to store and retrieve messages, so that clients don't have to connect peer-to-peer.

The entire implementation is tiny, but provides a robust mechanism for writing distributed apps:

* Server: 132 lines of JS
* Client: 639 lines of JS

(This does not include `main.js` in the client which is the implementation of the app. This is just showing the tiny size of everything needed to build an app)


Links:

* Actual: https://actualbudget.com/
* Hybrid logical clocks: https://cse.buffalo.edu/tech-reports/2014-04.pdf
* CRDTs: https://bit.ly/2DMk0AD
* Live app: https://crdt.jlongster.com/
