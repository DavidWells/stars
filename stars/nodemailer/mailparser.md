---
repo: nodemailer/mailparser
url: 'https://github.com/nodemailer/mailparser'
homepage: ''
starredAt: '2018-12-15T08:11:50Z'
createdAt: '2010-10-07T14:05:03Z'
updatedAt: '2025-02-15T06:09:59Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 1606
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:55.275Z'
description: Decode mime formatted e-mails
tags:
  - mailparser
  - mime
---

# mailparser

![Nodemailer](https://raw.githubusercontent.com/nodemailer/nodemailer/master/assets/nm_logo_200x136.png)

Advanced email parser for Node.js. Everything is handled as a stream which should make it able to parse even very large messages (100MB+) with relatively low overhead.

## Looking for a front-end solution?

_mailparser_ is Node.js only library, so you can't use it reliably in the front-end or bundle with WebPack. If you do need a solution to parse emails in the front-end then use [PostalMime](https://www.npmjs.com/package/postal-mime).

## Installation

First install the module from npm:

```
$ npm install mailparser
```

next import the `mailparser` object into your script:

```js
const mailparser = require('mailparser');
```

## Usage

See [mailparser homepage](https://nodemailer.com/extras/mailparser/) for documentation and terms.

### License

Licensed under MIT
