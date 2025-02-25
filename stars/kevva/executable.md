---
repo: kevva/executable
url: 'https://github.com/kevva/executable'
homepage: ''
starredAt: '2019-02-03T01:38:13Z'
createdAt: '2014-02-06T11:01:46Z'
updatedAt: '2024-04-16T09:30:39Z'
language: JavaScript
license: MIT
branch: master
stars: 31
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:48.886Z'
description: Check if a file is executable
tags: []
---

# executable [![Build Status](https://travis-ci.org/kevva/executable.svg?branch=master)](https://travis-ci.org/kevva/executable)

> Check if a file is executable


## Install

```
$ npm install --save executable
```


## Usage

```js
const executable = require('executable');

executable('bash').then(exec => {
	console.log(exec);
	//=> true
});
```


## API

### executable(file)

Returns a Promise for a boolean.

### executable.sync(file)

Returns a boolean of whether the file is executable.

#### file

Type: `string`

Path of the file.

### executable.checkMode(mode, [gid], [uid])

Returns a boolean of whether the mode passed as first argument means that the file is executable.

#### mode

Type: `number`

Property `mode` of `fs.Stats` instance returned by `fs.stat()` (or `fs.statSync()`) function.

#### gid, uid

Type: `number`

Respectively the group identity and user identity of the file. If not set, permissions will be evaluated without considering owner or group of the file.

## Related

* [executable-cli](https://github.com/kevva/executable-cli) - CLI for this module


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
