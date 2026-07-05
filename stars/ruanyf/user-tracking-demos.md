---
repo: ruanyf/user-tracking-demos
url: 'https://github.com/ruanyf/user-tracking-demos'
homepage: null
starredAt: '2021-09-19T21:50:03Z'
createdAt: '2019-04-14T14:09:11Z'
updatedAt: '2025-01-16T01:31:31Z'
language: JavaScript
license: NA
branch: master
stars: 90
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:45.244Z'
description: demos of tracking users with JavaScript
tags: []
---

A couple of demos of user tracking with JavaScript. 

I show some methods how to send user data back into the server. More details in my [blog article](http://www.ruanyifeng.com/blog/2019/04/user-tracking.html) (in Chinese).

- [Sync AJAX](demos/sync.html)
- [Async AJAX + sync operations](demos/loop.html)
- [Async AJAX + setTimeout](demos/settimeout.html)
- [Beacon API](demos/beacon.html)
- [ping attribute of `<a>` tag](demos/ping.html)

## How to play

First, clone the repo.

```bash
$ git clone https://github.com/ruanyf/user-tracking-demos.git
$ cd user-tracking-demos
```

Install the dependences, then launch the server.

```bash
$ npm install
$ node server.js
```

Visit http://localhost:3000 in your browser. Follow the instruction on the page, then watch what happens in the commandline.
