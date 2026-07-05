---
repo: b4dnewz/node-pwned
url: 'https://github.com/b4dnewz/node-pwned'
homepage: null
starredAt: '2020-06-24T23:25:23Z'
createdAt: '2017-10-16T11:34:37Z'
updatedAt: '2022-01-11T03:01:00Z'
language: JavaScript
license: MIT
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:47.654Z'
description: A very simple javascript client for HaveIBeenPwned API.
tags:
  - haveibeenpwned
  - javascript-client
---

# pwned-api

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> Unofficial javascript client for HaveIBeenPwned API

## Installation

You can use it as a nodejs module:

```
npm install --save pwned-api
```

Or also install it globally and use it as cli tool:

```
npm install --global pwned-api
```

## Usage

Load the __pwned-api__ module into your script than init the class to use its methods. It accept a callback but also return a promise so you can use it also with async.

```js
const Pwned = require('pwned-api');
const pwner = new Pwned();

pwner.breaches({}, (err, results) => {
  console.log('Results:', results);
});
```

Using new __await/async__ functionalities:

```js
import Pwned from 'pwned-api'
const pwner = new Pwned();

(async () => {
  const res = await pwner.breaches();
  // Do whatever you need to do
})()
```

The pwner constructor takes two arguments, so you can customize the requests beheviour:

```js
const pwner = new Pwned({
  timeout: 2500,
  headers: {
    'User-Agent': 'My App'
  }
});
```

---

## Methods

#### breaches

List all the available breaches

```js
pwner.breaches({}, (err, results) => {
  console.log('Results:', results);
});
```

#### breachedAccount

Return a list of all breaches a particular account has been involved in.

```js
pwner.breachedAccount('john.doe@example.com', {}, (err, results) => {
  console.log('Results:', results);
});
```

#### breach

Return single breach retrieved by the breach "name".

```js
pwner.breach('AshleyMadison', (err, results) => {
  console.log('Results:', results);
});
```

#### dataClasses

Return all the data classes in the system.

```js
pwner.dataClasses((err, results) => {
  console.log('Results:', results);
});
```

#### pasteAccount

Return all pastes for an account, takes a single parameter which is the email address to be searched for.

```js
pwner.pasteAccount('john.doe@example.com', (err, results) => {
  console.log('Results:', results);
});
```

#### pwnedPassword

Check if a password been exposed in data breaches and exists on HIBP database.

```js
pwner.pwnedPassword('admin1234', {}, (err) => {
  console.log('Error;', err );
});
```

For details in depth about the API please consult the official [HaveIBeenPwned](https://haveibeenpwned.com/API/v2) page.

---

## License

MIT © b4dnewz


[npm-image]: https://badge.fury.io/js/pwned-api.svg
[npm-url]: https://npmjs.org/package/pwned-api
[travis-image]: https://travis-ci.org/b4dnewz/node-pwned.svg?branch=master
[travis-url]: https://travis-ci.org/b4dnewz/node-pwned
[daviddm-image]: https://david-dm.org/b4dnewz/node-pwned.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/b4dnewz/node-pwned
[coveralls-image]: https://coveralls.io/repos/b4dnewz/node-pwned/badge.svg
[coveralls-url]: https://coveralls.io/r/b4dnewz/node-pwned
