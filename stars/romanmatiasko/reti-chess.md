---
repo: romanmatiasko/reti-chess
url: 'https://github.com/romanmatiasko/reti-chess'
homepage: 'http://www.retichess.com'
starredAt: '2015-03-21T03:03:25Z'
createdAt: '2013-07-07T02:36:02Z'
updatedAt: '2024-08-02T14:13:02Z'
language: JavaScript
license: MIT
branch: master
stars: 197
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:46.445Z'
description: >-
  A lightweight, real-time chess app built in Node, Express, Socket.IO, React,
  Flux and Immutable.
tags: []
---

Reti Chess
==========

A lightweight, real-time chess app built in [Node](http://nodejs.org/), [Express](http://expressjs.com/), [Socket.IO](http://socket.io/), [React](http://facebook.github.io/react/), [Flux](http://facebook.github.io/flux/) and [Immutable](http://facebook.github.io/immutable-js/). Reti Chess also uses [chess.js](https://github.com/jhlywa/chess.js) for move validation and check/mate/draw detection.

You can play the game on [www.retichess.com](http://www.retichess.com/).

Warning
-------

The app is no longer being developed.
It works with node v4, but many things are outdated (it uses react 0.13.1 and mixins, no hot reloading, etc.)

If you want to run it locally (with node **v4.2**):

* Clone the repo

* Install dependencies
```sh
npm install
# create empty logfile for winston logger
mkdir logs
touch logs/games.log
```

* Run the server
```sh
npm start
```

* Preferred way is to run the server with nodemon
```sh
npm install -g nodemon # if you don't have nodemon installed yet
export NODE_ENV=development
nodemon bin/www
```

* If you want to recompile static assets when you save a file
```sh
npm run build
```

* Running tests
```sh
npm test
```

* App will run on **localhost:3000**

License
-------

Available under [the MIT License (MIT)](./LICENSE.md).
