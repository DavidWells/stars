---
repo: bahmutov/self-addressed
url: 'https://github.com/bahmutov/self-addressed'
homepage: null
starredAt: '2015-01-18T01:26:35Z'
createdAt: '2015-01-16T01:47:39Z'
updatedAt: '2023-09-08T16:53:51Z'
language: JavaScript
license: NA
branch: master
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:54.085Z'
description: Transform postMessage calls to return a promise
tags: []
---

# self-addressed

> Transform postMessage calls to return a promise

[![NPM][self-addressed-icon] ][self-addressed-url]

[![Build status][self-addressed-ci-image] ][self-addressed-ci-url]
[![dependencies][self-addressed-dependencies-image] ][self-addressed-dependencies-url]
[![devdependencies][self-addressed-devdependencies-image] ][self-addressed-devdependencies-url]

Available on NPM and bower under name `self-addressed`.

Provides single function `stamp(mailman, address, data)`, that returns a Promise.

## Example

```js
var stamp = require('self-addressed');
var mailman = function (address, envelope) {
    address.postMessage(envelope, '*');
};
stamp(mailman, window, { foo: 'foo' })
    .then(function (response) {
        console.log('got response to our letter', response);
    });
```

## Api

Single function `selfAddressed` can do 3 things at once

* `selfAddressed(mailman, address, data)` - can deliver data via `mailman` to `address` and then
returns a promise that resolves with response.
* `selfAddressed(envelope, letter)` - puts `letter` into valid `enveloper` to be delivered back as 
a response.
* `selfAddressed(envelope)` - returns either the letter stored in the `envelope` or `undefined` if this
is an invalid envelope.

### Extras

You can see verbose log messages by setting `selfAddressed.options.verbose = true;`

## Typical workflow

**iframed page.html** that wants to communicate with the parent can `postMessage` and receive a reply

```js
function mailman(address, msg) {
  address.postMessage(msg, '*');
}
window.onmessage = function (event) {
  selfAddressed(event.data);
};
selfAddressed(mailman, parent, 'foo')
  .then(function (response) {
    console.log(response); // "bar"
  });
```

**index page** that iframes `page.html` inside and uses `onmessage` to open the envelope,
place new letter inside and send the response back to the source.

```js
function mailman(address, msg) {
  address.postMessage(msg, '*');
}
window.onmessage = function (event) {
  var letter = selfAddressed(event.data);
  // if letter === undefined => not an envelope, handle differently!
  var returnAddress = event.source;
  selfAddressed(event.data, 'bar'); // places the letter into the same envelope
  selfAddressed(mailman, returnAddress, event.data);
};
```

## Combined with other data

Often we have other sources of data to be handled inside `onmessage` callback.
One can ask if the received data is self-addressed to determine if it has been handled
by `self-addressed` or not using `selfAddressed.is(envelope)`.

```js
window.onmessage = function (event) {
  // event could be self-addressed envelope or not
  if (selfAddressed.is(event.data)) {
    var letter = selfAddressed(event.data);
    if (!letter) {
      // nothing to do - it has been handled via promise resolution
    } else {
      // handle letter, maybe reseal and send response?
    }
  } else {
    // not an envelope - handle yourself
  }
}
```

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](http://glebbahmutov.com)
* [blog](http://bahmutov.calepin.co/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/self-addressed/issues) on Github

## MIT License

Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[self-addressed-icon]: https://nodei.co/npm/self-addressed.png?downloads=true
[self-addressed-url]: https://npmjs.org/package/self-addressed
[self-addressed-ci-image]: https://travis-ci.org/bahmutov/self-addressed.png?branch=master
[self-addressed-ci-url]: https://travis-ci.org/bahmutov/self-addressed
[self-addressed-dependencies-image]: https://david-dm.org/bahmutov/self-addressed.png
[self-addressed-dependencies-url]: https://david-dm.org/bahmutov/self-addressed
[self-addressed-devdependencies-image]: https://david-dm.org/bahmutov/self-addressed/dev-status.png
[self-addressed-devdependencies-url]: https://david-dm.org/bahmutov/self-addressed#info=devDependencies
