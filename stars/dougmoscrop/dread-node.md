---
repo: dougmoscrop/dread-node
url: 'https://github.com/dougmoscrop/dread-node'
homepage: null
starredAt: '2022-09-29T17:49:58Z'
createdAt: '2019-03-20T01:36:31Z'
updatedAt: '2023-01-23T11:22:07Z'
language: JavaScript
license: MIT
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:27.915Z'
description: yet another retry library
tags: []
---

# dread

When you just know things will fail

## Usage

```js
const dread = require('dread');
```

The most basic, batteries-included example:

```js
// this will retry 10 times with fully randomized and truncated exponential backoff
dread(function() {
  // do stuff
});
```

You can also provide options to override retry logic:

```js
dread({ attempts: 3 }, function() {
  // same as above, but with only 3 attempts just for this task
});
```

You can also provide options as the _only_ argument, which returns a reconfigured instance of `dread`:

```js
const retry = dread({ attempts: 3 });

retry(function() {
  // this is a task, 3 attempts
})
retry(function() {
  // this is a different task, still 3 attempts
});
dread(function() {
  // this still uses the default configuratiopn
});
```

The order that you provide arguments does not matter - you can call `dread(task, options)` or `dread(options, task)`.

## Options

The default configuration is equivalent to:

```js
dread({
  attempts: 10,
  condition: dread.prop('retryable'),
  backoff: dread.exp(),
  timeout: undefined,
});
```

### attempts

The number of attempts inclusive of the first one

```js
// fewer attempts than default
dread({ attempts: 5 });
```

You can also call it `retries` instead, but note this is not inclusive. So `dread({ attempts: 5})` is the same as `dread({ retries: 4 })`

### condition

A function `Error => Boolean` that determines whether or not to retry a failed attempt.

You can provide any function you want, including async.

`dread` exports helpers:

- `dread.prop(name)` rery if `err.prop` is truthy
- `dread.code(String)` retry if `err.code === String`
- `dread.is(Class)` retry if `err instanceof Class`
- `dread.always()` always retry every error

### backoff

A function `(Integer, Error) => Integer` that returns the amount of time to wait before the next attempt.

You can provide any function you want, including async. The `Error` is provided in case you want to have different retry periods for different error cases, or, as in the case of `aws-sdk`, it already provides a backoff duration on its errors.

`dread` exports a helper:

```js
// this is the default - a fully randomized, truncated exponential value
dread.exp({
    base: Number(100),
    factor: Number(2),
    limit: Number(10000),
    jitter: JitterType.FULL
});
```
`jitter` may be one of:

- `JitterType.NONE` the full backoff value is used
- `JitterType.FULL` a randomized value between 0 and the full backoff
- `JitterType.HALF` a randomized valued between full backoff / 2 and full backoff

### timeout

`dread` supports a timeout for the entire operation

```js
const retry = dread({ timeout: 10000 });
// the operation will timeout after 10 seconds
// regardless of the number of attempts or how long the current attempt takes
retry(function() {
  // ...
});
```

## Attempt Object

Your task is invoked with an `attempt` object as the only argument.

```js
dread(attempt => {
  console.log('attempt number', attempt.number);
  attempt.cancel('things are going haywire!'); // will retry
});
```

### number

`number` is the number of the current attempt (1, 2, 3, etc.) - it can also be accessed via the property `attempt.attempt`, which seems like a strange name, but it's so that you can destructure it like:

```js
dread(({ attempt }) => {
  logger.info({ attempt }, 'trying something'); // { attempt: 1, msg: 'trying something' }
});
```

### timeout(value)

```js
// this attempt will timeout after 1 second, inclusive of the backoff delay
attempt.timeout(5000);
// you could also set a timeout based on the attempt nuber
attempt.timeout(attempt.number * 2000);
```

> Setting a timeout after an attempt has succeeded has no effect;

### cancel(reason)

You can cancel an attempt manually by calling `attempt.cancel(reason)` optionally providing either an Error or a String, which will be used as the error message.

```js
dread(attempt => {
  // will reject with new Error('Cancelled')
  attempt.cancel();
  // will reject with new Error('Try again')
  attempt.cancel('Try again');
  // will reject with MyCustomError
  attempt.cancel(new MyCustomError());
});
```

> Calling cancel after an attempt has succeeded has no effect.
