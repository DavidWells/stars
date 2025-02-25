---
repo: regexhq/function-regex
url: 'https://github.com/regexhq/function-regex'
homepage: 'http://j.mp/1xV5fzk'
starredAt: '2016-11-22T02:20:17Z'
createdAt: '2015-01-25T22:00:14Z'
updatedAt: '2023-03-26T02:10:02Z'
language: JavaScript
license: MIT
branch: master
stars: 30
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:15.204Z'
description: >-
  Function regex. Regular expression for matching function parts. Expose match
  groups for function name, arguments and function body.
tags: []
---

## [![npm][npmjs-img]][npmjs-url] [![mit license][license-img]][license-url] [![build status][travis-img]][travis-url] [![coverage status][coveralls-img]][coveralls-url] [![deps status][daviddm-img]][daviddm-url]


> Function regex. Regular expression for matching function parts. Expose match groups for function name, arguments and function body.

## Install
```bash
npm install function-regex
npm test
```


## Usage
> For more use-cases see the [tests](./test.js)

```js
var functionRegex = require('function-regex');

var fixture = function testing(args, opts, dest, cb) {
  return cb ? {
    opts: [1,2,3]
  } : true;
};

fixture.toString().match(functionRegex());
//=> [1] = 'testing'
//=> [2] = 'args, opts, dest, cb'
//=> [3] = '\n    return cb ? {\n      opts: [1,2,3],\n      args: args\n    } : true;\n  '


'function(val, re) { return true; }'.match(functionRegex());
//=> [1] = ''
//=> [2] = 'val, re'
//=> [3] = ' return true; '
```


### Matching groups
+ `[0]` full function (`'function(val, re) { return true; }'`)
+ `[1]` function name (`'testing'`)
+ `[2]` function arguments (`'args, opts, dest, cb'`)
+ `[3]` function body (`' return true; '`)


## Author
**Charlike Mike Reagent**
+ [gratipay/tunnckoCore][author-gratipay]
+ [twitter/tunnckoCore][author-twitter]
+ [github/tunnckoCore][author-github]
+ [npmjs/tunnckoCore][author-npmjs]
+ [more ...][contrib-more]


## License [![MIT license][license-img]][license-url]
Copyright (c) 2014-2015 [Charlike Mike Reagent][contrib-more], [contributors][contrib-graf].  
Released under the [`MIT`][license-url] license.


[npmjs-url]: http://npm.im/function-regex
[npmjs-img]: https://img.shields.io/npm/v/function-regex.svg?style=flat&label=function-regex

[coveralls-url]: https://coveralls.io/r/regexps/function-regex?branch=master
[coveralls-img]: https://img.shields.io/coveralls/regexps/function-regex.svg?style=flat

[license-url]: https://github.com/regexps/function-regex/blob/master/license.md
[license-img]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat

[travis-url]: https://travis-ci.org/regexps/function-regex
[travis-img]: https://img.shields.io/travis/regexps/function-regex.svg?style=flat

[daviddm-url]: https://david-dm.org/regexps/function-regex
[daviddm-img]: https://img.shields.io/david/dev/regexps/function-regex.svg?style=flat

[author-gratipay]: https://gratipay.com/tunnckoCore
[author-twitter]: https://twitter.com/tunnckoCore
[author-github]: https://github.com/tunnckoCore
[author-npmjs]: https://npmjs.org/~tunnckocore

[contrib-more]: http://j.mp/1stW47C
[contrib-graf]: https://github.com/regexps/function-regex/graphs/contributors

***

_Powered and automated by [kdf](https://github.com/tunnckoCore), January 27, 2015_
