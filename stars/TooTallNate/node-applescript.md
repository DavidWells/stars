---
repo: TooTallNate/node-applescript
url: 'https://github.com/TooTallNate/node-applescript'
homepage: ''
starredAt: '2022-04-02T20:28:29Z'
createdAt: '2010-08-05T01:08:24Z'
updatedAt: '2025-02-10T20:12:11Z'
language: JavaScript
license: MIT
branch: master
stars: 388
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:52.139Z'
description: A Node.js module to easily execute arbitrary AppleScript code on Mac OS X.
tags: []
---

node-applescript
================

A high-level way to execute AppleScript code through Node.js, and retrieve
the result as a native JavaScript object. Underneath the hood, this
module is just a simple wrapper around the macOS `osascript` command.

### Why?
AppleScripts are the only way to communicate and interact with certain
external macOS processes, for example [iTunes](http://www.itunes.com).

Easy Install
------------

``` bash
$ npm install applescript
```

Requirements
------------

 * Mac (or Hackintosh) running [macOS](https://www.apple.com/macos) (tested with High Sierra)
 * [Node.js](https://nodejs.org) (v0.2.0 or newer)

Usage
-----

The `node-applescript` module provides `execString` and `execFile` functions
to easily execute AppleScript commands and buffer the output into a calback.

``` js
const applescript = require('applescript');

// Very basic AppleScript command. Returns the song name of each
// currently selected track in iTunes as an 'Array' of 'String's.
const script = 'tell application "iTunes" to get name of selection';

applescript.execString(script, (err, rtn) => {
  if (err) {
    // Something went wrong!
  }
  if (Array.isArray(rtn)) {
    for (const songName of rtn) {
      console.log(songName);
    }
  }
});
```

`execFile` works the exact same way, except you pass the _path_ of the AppleScript
(`*.applescript`) file as the first argument instead of the command itself, and you
may pass an optional Array of String arguments to send to the applescript file.

Licence
-------

The `node-applescript` module is licensed under the MIT license, of course!
