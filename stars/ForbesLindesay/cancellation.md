---
repo: ForbesLindesay/cancellation
url: 'https://github.com/ForbesLindesay/cancellation'
homepage: null
starredAt: '2021-04-03T17:51:27Z'
createdAt: '2012-12-04T15:00:22Z'
updatedAt: '2021-05-07T14:09:18Z'
language: JavaScript
license: MIT
branch: master
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:54.296Z'
description: A method for making async operations cancellable
tags: []
---


# cancellation

  A method for making async operations cancellable

## Installation

Component:

    $ component install ForbesLindesay/cancellation

NPM:

    $ npm install cancellation

## API

### tokenSource()

  Returns a new CancellationTokenSource:

```javascript
var tokenSource = require('cancellation');
var source = tokenSource();
callAsyncOperation(arg1, arg2, arg3, source.token);
setTimeout(function () {
  source.cancel('Operation timed out');
}, 1000);
```

### tokenSource.empty

  Returns an 'empty' CancellationToken (one that will never be cancelled).

```javascript
var tokenSource = require('cancellation');
function asyncOperation(arg1, arg2, arg3, cancellationToken) {
  cancellationToken = cancellationToken || tokenSource.empty;

  //Continue with function knowing there is a cancellation token
}
```

### CancellationToken.isCancelled()

  Returns true if the token has been cancelled:

```javascript
//In ES6
function asyncOperation(cancellationToken) {
  return spawn(function* () {
    while(!cancellationToken.isCancelled()) {
      yield NextAsyncOp();
    }
  })
}
```

### CancellationToken.throwIfCancelled()

  Throws the rejection reason if the token has been cancelled:

```javascript
//In ES6
function asyncOperation(cancellationToken) {
  return spawn(function* () {
    while(true) {
      cancellationToken.throwIfCancelled()
      yield NextAsyncOp();
    }
  })
}
```

### CancellationToken.onCancelled(cb)

  Calls cb when the cancellation token is cancelled (this is probably currently the most useful of these methods).

```javascript
function get(url, cancellationToken) {
  var def = defer();
  
  var req = request(url, function (err, res) {
    if (err) def.reject(err);
    else def.resolve(res);
  });

  cancellationToken
    .onCancelled(function (reason) {
      def.reject(reason);
      req.abort();
    });

  return def.promise;
}
```

## License

  MIT
