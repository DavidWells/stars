---
repo: jserme/cclog-parser
url: 'https://github.com/jserme/cclog-parser'
homepage: ''
starredAt: '2021-11-21T20:55:38Z'
createdAt: '2017-04-25T11:23:02Z'
updatedAt: '2021-11-21T20:55:38Z'
language: JavaScript
license: NA
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:37.089Z'
description: conventional-changelog log parser
tags: []
---

# cclog-parser [![npm][npm-img]][npm-url] [![standard][standard-image]][standard-url] [![downloads][downloads-img]][npm-url]

conventional-changelog log parser

parse changelog file format same as  https://github.com/karma-runner/karma/blob/master/CHANGELOG.md

## Install

```
npm install cclog-parser
```

## Useage

### INPUT
```markdown
<a name="0.1.0"></a>
# some thing 


### Bug Fixes

* fixa ([17c2c43](https://abc/commit/abc))
* fixb ([17c2c43](https://abc/commit/abc))


### Features

* feata ([17c2c43](https://abc/commit/abc))
* featb ([17c2c43](https://abc/commit/abc))


<a name="0.0.1"></a>
# some thing 

### Bug Fixes

* fixc ([17c2c43](https://abc/commit/abc))
* fixd ([17c2c43](https://abc/commit/abc))


### Features

* featc ([17c2c43](https://abc/commit/abc))
* featd ([17c2c43](https://abc/commit/abc))
```
### CODE
```javascript
const parser = require('cclog-parser')
const result = parser(changelog)
```

### OPTIONS

* includeDetails: true 

toggle commit message detail include

### OUTPUT

```javascript
{
  "versions": [
    "0.1.0",
    "0.0.1"
  ],
  "changes": {
    "0.1.0": {
      "fixes": [
        "fixa ([17c2c43](https://abc/commit/abc))",
        "fixb ([17c2c43](https://abc/commit/abc))"
      ],
      "features": [
        "feata ([17c2c43](https://abc/commit/abc))",
        "featb ([17c2c43](https://abc/commit/abc))"
      ]
    },
    "0.0.1": {
      "fixes": [
        "fixc ([17c2c43](https://abc/commit/abc))",
        "fixd ([17c2c43](https://abc/commit/abc))"
      ],
      "features": [
        "featc ([17c2c43](https://abc/commit/abc))",
        "featd ([17c2c43](https://abc/commit/abc))undefined"
      ]
    }
  }
}
```

## License

MIT


[npm-img]: https://img.shields.io/npm/v/cclog-parser.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/cclog-parser
[travis-img]: https://img.shields.io/travis/hypermodules/cclog-parser.svg?style=flat-square
[travis-url]: https://travis-ci.org/hypermodules/cclog-parser
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://standardjs.com/
[downloads-img]: https://img.shields.io/npm/dm/cclog-parser.svg?style=flat-square
