---
repo: mrjoelkemp/jsdoc3-parser
url: 'https://github.com/mrjoelkemp/jsdoc3-parser'
homepage: ''
starredAt: '2019-09-25T03:47:36Z'
createdAt: '2014-07-02T23:38:45Z'
updatedAt: '2023-04-18T13:11:37Z'
language: JavaScript
license: NA
branch: master
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:23.167Z'
description: Get the AST of a file using JSDoc3's parser
tags: []
---

# JSDoc3 Parser [![npm](http://img.shields.io/npm/v/jsdoc3-parser.svg)](https://npmjs.org/package/jsdoc3-parser) [![npm](http://img.shields.io/npm/dm/jsdoc3-parser.svg)](https://npmjs.org/package/jsdoc3-parser)

JSDoc is not currently available as a library, so there's no clean way to access
its parser. You can't `require('jsdoc')`, so you have to hack around it by using
the jsdoc binary's `-X` option and parsing the output.

This is a wrapper around that process.

### Usage

```javascript
var parser = require('jsdoc3-parser');

parser('myfile.js', function(error, ast) {

});
```

### License

MIT
