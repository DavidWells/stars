---
repo: mariocasciaro/spawned
url: 'https://github.com/mariocasciaro/spawned'
homepage: null
starredAt: '2016-11-15T05:41:19Z'
createdAt: '2013-11-26T20:09:46Z'
updatedAt: '2016-11-15T05:41:19Z'
language: JavaScript
license: MIT
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:16.163Z'
description: Smart wrapper around child_process.spawn using promises
tags: []
---

[![NPM version](https://badge.fury.io/js/spawned.png)](http://badge.fury.io/js/spawned)
[![Build Status](https://travis-ci.org/mariocasciaro/spawned.png)](https://travis-ci.org/mariocasciaro/spawned)
[![Coverage Status](https://coveralls.io/repos/mariocasciaro/spawned/badge.png)](https://coveralls.io/r/mariocasciaro/spawned)
[![Dependency Status](https://gemnasium.com/mariocasciaro/spawned.png)](https://gemnasium.com/mariocasciaro/spawned)
# spawned

Smart wrapper around `child_process.spawn` using promises.

## Usage

```javascript
var spawned = require('spawned');
spawned('echo', ['test'])
  .then(function(proc) {
    console.log("Did it work? " + ((proc.out.match(/test/))? "yes" : "no"));
  })
  .catch(function(err) {
    console.log("Boooooom");
    console.error(err.err);
  });
```


## API


#### spawn(command, [args], [options])

Spawn a new process and returns a promise.

* `command`: `String` the command to execute
* `args`: `Array` a list of arguments to pass to the command
* `options`: `Object` inherits the options from [child_process.spawn](http://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options)
  plus these:
  * out: A `WriteableStream` receiving the `stdout` data
  * err: A `WriteableStream` receiving the `stderr` data

**Returns** a promise which:
* when **fullfilled** resolves to an object like:
  * `err`: `String` containing `stderr`
  * `out`: `String` containig `stdout`
  * `combined`: `String` containing the intermingled contents of `stdout` and `stderr`
  * `code`: `Number` the return code of the program
* when **rejected** resolves to an `Error` having the same properties as above.
