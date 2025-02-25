---
repo: silverwind/file-extension
url: 'https://github.com/silverwind/file-extension'
homepage: ''
starredAt: '2015-05-28T23:04:39Z'
createdAt: '2015-05-03T01:34:44Z'
updatedAt: '2023-07-23T18:51:16Z'
language: Makefile
license: BSD-2-Clause
branch: master
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:42.717Z'
description: Get the extension of a given filename or path
tags: []
---

# file-extension
[![](https://img.shields.io/npm/v/file-extension.svg?style=flat)](https://www.npmjs.org/package/file-extension) [![](https://img.shields.io/npm/dm/file-extension.svg)](https://www.npmjs.org/package/file-extension) [![](https://api.travis-ci.org/silverwind/file-extension.svg?style=flat)](https://travis-ci.org/silverwind/file-extension)
> Get the extension of a given filename or path

Differences to [`path.extname`](https://nodejs.org/api/path.html#path_path_extname_path):

* Treats dotfiles as extension (`.eslintrc` => `eslintrc`)
* Treats extensionless files as extension (`Makefile` => `makefile`)
* Doesn't include the dot in the extension (`package.json` => `json`)
* Returns lowercase by default (`LICENCE` => `licence`)

Works in Node.js and the browser. The module's size is currently 267 bytes gzipped.

## Installation
#### Node.js
```
$ npm install --save file-extension
```
#### Browser
```html
<script src="file-extension.js"></script>
<!-- Available as global `fileExtension` -->
```
## Example
```js
var fileExtension = require('file-extension'); // Skip this in the browser

// Case insensitive
fileExtension('file.zip');          //=> 'zip'
fileExtension('.Dockerfile');       //=> 'dockerfile'
fileExtension('file');              //=> 'file'
fileExtension('.file.tar');         //=> 'tar'

// Or with case preserved
fileExtension('.Vagrantfile', {preserveCase: true}); //=> 'Vagrantfile'
fileExtension('INDEX.HTML', {preserveCase: true});   //=> 'HTML'
```

## API
### fileExtension(filename, [options])
- `filename` {String} The file name. Required.
- `options` {Object} Options object.

#### Options
- `preserveCase` {Boolean} Whether case should be preserved. Default: false.

© [silverwind](https://github.com/silverwind), distributed under BSD licence
