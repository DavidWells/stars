---
repo: shime/play-sound
url: 'https://github.com/shime/play-sound'
homepage: ''
starredAt: '2025-01-07T06:14:13Z'
createdAt: '2014-09-12T09:22:07Z'
updatedAt: '2025-01-15T16:48:41Z'
language: JavaScript
license: MIT
branch: master
stars: 215
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:51:19.723Z'
description: Play sounds by shelling out to one of the available audio players.
tags:
  - javascript
  - node
  - nodejs
  - sound
---

# play-sound

[![Downloads](https://img.shields.io/npm/dt/play-sound.svg)](https://npmjs.org/package/play-sound)

Play sounds by shelling out to one of the available audio players.

## Installation

    npm install play-sound

## Examples

```javascript
var player = require('play-sound')(opts = {})

// $ mplayer foo.mp3 
player.play('foo.mp3', function(err){
  if (err) throw err
})

// { timeout: 300 } will be passed to child process
player.play('foo.mp3', { timeout: 300 }, function(err){
  if (err) throw err
})

// configure arguments for executable if any
player.play('foo.mp3', { afplay: ['-v', 1 ] /* lower volume for afplay on OSX */ }, function(err){
  if (err) throw err
})

// access the node child_process in case you need to kill it on demand
var audio = player.play('foo.mp3', function(err){
  if (err && !err.killed) throw err
})
audio.kill()
```

## Options

* `players` – List of available audio players to check. Default:
  * [`mplayer`](https://www.mplayerhq.hu/)
  * [`afplay`](https://developer.apple.com/library/mac/documentation/Darwin/Reference/ManPages/man1/afplay.1.html)
  * [`mpg123`](http://www.mpg123.de/)
  * [`mpg321`](http://mpg321.sourceforge.net/)
  * [`play`](http://sox.sourceforge.net/)
  * [`omxplayer`](https://github.com/popcornmix/omxplayer)
  * [`aplay`](https://linux.die.net/man/1/aplay)
  * [`cmdmp3`](https://github.com/jimlawless/cmdmp3)
  * [`cvlc`](https://www.commandlinux.com/man-page/man1/cvlc.1.html)
  * [`powershell`](https://docs.microsoft.com/en-us/powershell/)
* `player` – Audio player to use (skips availability checks)

## Prior art

* [play.js](https://github.com/Marak/play.js) - play sound files from node.js to your speakers

## License

MIT
