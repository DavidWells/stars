---
repo: kevva/compare-size
url: 'https://github.com/kevva/compare-size'
homepage: null
starredAt: '2020-12-20T06:08:26Z'
createdAt: '2014-10-11T14:10:14Z'
updatedAt: '2024-12-06T01:44:24Z'
language: JavaScript
license: MIT
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:15.519Z'
description: Compare size between two files
tags: []
---

# compare-size [![Build Status](http://img.shields.io/travis/kevva/compare-size.svg?style=flat)](https://travis-ci.org/kevva/compare-size)

> Compare size between two files


## Install

```
$ npm install --save compare-size
```


## Usage

```js
const compareSize = require('compare-size');

compareSize('foo.zip', 'bar.zip').then(data => {
	console.log(data);
	//=> {foo.zip: 439, bar.zip: 325, difference: 114}
});

compareSize.sync('foo.zip', 'bar.zip');
//=> {foo.zip: 439, bar.zip: 325, difference: 114}
```


## API

### compareSize(a, b)

Compares size between two files. Returns a promise for an object with the stats difference.

#### a

Type: `string`

Path to the first file.

#### b

Type: `string`

Path to the second file.


## Related

* [compare-size-cli](https://github.com/kevva/compare-size-cli) - CLI for this module


## License

MIT © [Kevin Mårtensson](https://github.com/kevva)
