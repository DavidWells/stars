---
repo: xxorax/node-shell-escape
url: 'https://github.com/xxorax/node-shell-escape'
homepage: ''
starredAt: '2022-03-17T21:15:59Z'
createdAt: '2013-06-06T16:13:57Z'
updatedAt: '2025-01-26T12:00:09Z'
language: JavaScript
license: NA
branch: master
stars: 71
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:57.653Z'
description: Escape and stringify an array of arguments to be executed on the shell
tags:
  - node
  - shell-escape
---

shell-escape
============

Escape and stringify an array of arguments to be executed on the shell

Install
-------

    npm install shell-escape

Example
-------

### simple

``` js
var shellescape = require('shell-escape');

var args = ['curl', '-v', '-H', 'Location;', '-H', 'User-Agent: dave#10', 'http://www.daveeddy.com/?name=dave&age=24'];

var escaped = shellescape(args);
console.log(escaped);
```

yields

```
curl -v -H 'Location;' -H 'User-Agent: dave#10' 'http://www.daveeddy.com/?name=dave&age=24'
```

A command suitable for being executed by the shell

### advanced

``` js
var shellescape = require('shell-escape');

var args = ['echo', 'hello!', 'how are you doing $USER', '"double"', "'single'"];

var escaped = shellescape(args);
console.log(escaped);
```

yields

```
echo 'hello!' 'how are you doing $USER' '"double"' \''single'\'
```

and when run on the shell

```
$ echo 'hello!' 'how are you doing $USER' '"double"' \''single'\'
hello! how are you doing $USER "double" 'single'
```

License
-------

MIT
