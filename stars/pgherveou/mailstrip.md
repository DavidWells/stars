---
repo: pgherveou/mailstrip
url: 'https://github.com/pgherveou/mailstrip'
homepage: 'http://pgherveou.github.com/mailstrip/'
starredAt: '2015-03-13T00:29:55Z'
createdAt: '2012-05-25T12:44:22Z'
updatedAt: '2024-09-12T16:54:00Z'
language: CoffeeScript
license: NA
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:48.324Z'
description: node.js email reply parser
tags: []
---

mailstrip
=========

simple function that intent to strip signature and history from an email
to return only the content body.
Its just a simple list of regexp that defines where the email need to be truncated
each regexp has its own test.

Feel free to contribute by adding, a regexp and a testcase (tests are built with [mocha] [1] & [chai] [2])

install
-------

```
npm install mailstrip
```

usage
-----

```javascript
var mailstrip = require('mailstrip')
  , content = mailstrip(emailBody);
```

test
-----

```
# build first
$ cake build

# run mocha
$ mocha
```


[1]: http://visionmedia.github.com/mocha/   "mocha"
[2]: http://chaijs.com/                     "chai"
