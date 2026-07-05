---
repo: TooTallNate/pcre-to-regexp
url: 'https://github.com/TooTallNate/pcre-to-regexp'
homepage: null
starredAt: '2022-04-02T20:25:17Z'
createdAt: '2014-07-09T05:45:01Z'
updatedAt: '2024-09-17T03:38:12Z'
language: JavaScript
license: MIT
branch: master
stars: 22
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:52.380Z'
description: Converts PCRE regexp strings to JavaScript RegExp instances
tags: []
---

pcre-to-regexp
==============
### Converts PCRE regexp strings to JavaScript RegExp instances
[![Build Status](https://github.com/TooTallNate/pcre-to-regexp/workflows/Node%20CI/badge.svg)](https://github.com/TooTallNate/pcre-to-regexp/actions?workflow=Node+CI)

Creates a JavaScript `RegExp` instance from a PCRE regexp string.
Not currently feature-complete, but works enough for my needs. Send
pull requests for additional functionality!

Works with Node.js and in the browser via a CommonJS bundler like browserify.


Installation
------------

``` bash
$ npm install pcre-to-regexp
```

Example
-------

A basic example of a Twitter URL parsing PCRE regexp:

``` js
var url = "%^https?:\/\/twitter\\.com(\/\\#\\!)?\/(?P<username>[a-zA-Z0-9_]{1,20})\\\/status(es)?\/(?P<id>\\d+)\/?$%ig";

// parse the PCRE regexp into a JS RegExp
var keys = [];
var re = PCRE(url, keys);

console.log(keys);
// [ , 'username', , 'id' ]

console.log(re);
// /^https?://twitter\.com(/\#\!)?/([a-zA-Z0-9_]{1,20})\/status(es)?/(\d+)/?$/gi

var match = re.exec('https://twitter.com/tootallnate/status/481604870626349056');
console.log(match);
// [ 'https://twitter.com/tootallnate/status/481604870626349056',
//   undefined,
//   'tootallnate',
//   undefined,
//   '481604870626349056',
//   index: 0,
//   input: 'https://twitter.com/tootallnate/status/481604870626349056' ]
```

Use code like this if you would like to transfer the "named captures" to the
`match` object:

``` js
// example of copying the named captures as keys on the `match` object
for (var i = 0; i < keys.length; i++) {
  if ('string' === typeof keys[i]) {
    match[keys[i]] = match[i + 1];
  }
}

console.log(match.username);
// 'tootallnate'

console.log(match.id);
// '481604870626349056'
```

API
---

### PCRE(String pattern[, Array keys]) → RegExp

Returns a JavaScript RegExp instance from the given PCRE-compatible string.
Flags may be passed in after the final delimiter in the `format` string.

An empty array may be passsed in as the second argument, which will be
populated with the "named capture group" names as Strings in the Array,
once the RegExp has been returned.
