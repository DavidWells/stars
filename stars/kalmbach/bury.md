---
repo: kalmbach/bury
url: 'https://github.com/kalmbach/bury'
homepage: null
starredAt: '2018-11-17T18:49:37Z'
createdAt: '2017-12-19T16:22:24Z'
updatedAt: '2024-09-15T02:19:49Z'
language: JavaScript
license: NA
branch: master
stars: 82
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:02.611Z'
description: Safely set a dot-notated path within a nested object.
tags: []
---

# `bury(obj, keypath, value)`
[![Code Climate](https://codeclimate.com/github/kalmbach/bury.png)](https://codeclimate.com/github/kalmbach/bury)
> Safely set a dot-notated path within a nested object, return undefined if the full key path does not exist, otherwise return the value set.

### NPM

https://www.npmjs.com/package/bury

### Usage

`bury(object, keypath, value)`

```js
import bury from 'bury';

let obj = {
	a: {
		b: {
			c: 1
			d: undefined
			e: null
		}
	}
};

//use string dot notation for keys
bury(obj, 'a.b.c', 2) === 2;

//or use an array key
bury(obj, ['a', 'b', 'c'], 2) === 2;

//returns undefined if the full key path does not exist
bury(obj, 'a.b.c.f', "foo") === undefined;
```

### Tests

https://github.com/kalmbach/bury/blob/master/test.js

### License

MIT
