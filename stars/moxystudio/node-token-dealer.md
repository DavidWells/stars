---
repo: moxystudio/node-token-dealer
url: 'https://github.com/moxystudio/node-token-dealer'
homepage: null
starredAt: '2016-11-21T23:37:29Z'
createdAt: '2016-02-20T19:44:06Z'
updatedAt: '2025-02-11T15:48:29Z'
language: JavaScript
license: MIT
branch: master
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:15.672Z'
description: >-
  Circumvent API rate limits by having several API tokens and let the dealer
  manage and give them to you
tags:
  - api
  - dealer
  - limits
  - nodejs
  - rate-limit
  - rate-limiting
  - token
---

# token-dealer

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][codecov-image]][codecov-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url]

[npm-url]:https://npmjs.org/package/token-dealer
[npm-image]:https://img.shields.io/npm/v/token-dealer.svg
[downloads-image]:https://img.shields.io/npm/dm/token-dealer.svg
[travis-url]:https://travis-ci.org/moxystudio/node-token-dealer
[travis-image]:https://img.shields.io/travis/moxystudio/node-token-dealer/master.svg
[codecov-url]:https://codecov.io/gh/moxystudio/node-token-dealer
[codecov-image]:https://img.shields.io/codecov/c/github/moxystudio/node-token-dealer/master.svg
[david-dm-url]:https://david-dm.org/moxystudio/node-token-dealer
[david-dm-image]:https://img.shields.io/david/moxystudio/node-token-dealer.svg
[david-dm-dev-url]:https://david-dm.org/moxystudio/node-token-dealer?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/moxystudio/node-token-dealer.svg

Circumvent API rate limits by having several API tokens and let the dealer manage and give them to you.

Several public APIs, such as GitHub and Twitter, have rate limits applied per account. To multiply these rate limits, you must have a farm of tokens associated to multiple accounts, either donated or created by you. This is where `token-dealer` comes in, making it easy to
manage these tokens and their usage.


## Installation

`$ npm install token-dealer`


## Usage

### tokenDealer(tokens, fn, [options])

Calls `fn(token, exhaust)` with the most appropriate `token` from `tokens` and a `exhaust` function that you may call to signal that the token is exhausted.

Basically the only thing you must do is call `exhaust(reset, [retry])` whenever you know that the token may not be used again until `reset` (timestamp in ms). Additionally, you may retry if the operation you were trying to do failed because the token was exhausted, causing `fn` to be called again with another token.

Here's an example from a request to the [GitHub API](https://developer.github.com/v3/#rate-limiting) using [got](https://www.npmjs.com/package/got):

```js
const tokenDealer = require('tokenDealer');
const got = require('got');

const tokens = [
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
];

tokenDealer(tokens, (token, exhaust) => {
    const handleRateLimit = (response, err) => {
        if (response.headers['x-ratelimit-remaining'] === '0') {
            const isRateLimitError = err && err.statusCode === 403 && /rate limit/i.test(response.body.message);

            exhaust(Number(response.headers['x-ratelimit-reset']) * 1000, isRateLimitError);
        }
    };

    return got('https://api.github.com/repos/moxystudio/node-cross-spawn', {
        json: true,
        headers: { Authorization: `token ${token}` },
    })
    .then((response) => {
        handleRateLimit(response);
        return response;
    }, (err) => {
        err.response && handleRateLimit(err.response, err);
        throw err;
    });
})
.then((response) => {
    // ...
}, (err) => {
    // If all tokens are exhausted, err.code will be 'EALLTOKENSEXHAUSTED'
});
```

Available options:

- `group`: The group associated to the tokens; this effectively groups tokens to prevent conflicts (e.g. `github`, defaults to `default`).
- `wait`: True to wait for a token to be free in case all are exhausted (defaults to `false`); alternatively you may pass a function that will be called with `[token, duration]` so that you can decide to wait dynamically.
- `lru`: A custom [LRU cache](https://www.npmjs.com/package/lru-cache) instance to be used internally.
- `onExhausted`: Called with `(token, reset)` whenever a token become exhausted (defaults to `null`).


If `tokens` is nullish or an empty array, the given `token` will be an empty string.


### tokenDealer.getTokensUsage(tokens, [options])

Get the tokens usage for `tokens`. The available options are `group` and `lru` which are the same as `tokenDealer()`.

```js
const tokenDealer = require('tokenDealer');

const tokens = [
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
];

const usage = tokenDealer.getTokensUsage(tokens);

// `usage` looks like this:
// {
//     'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa': {
//         exhausted: true,       // true if exhausted, false otherwise
//         reset: 1455996883369,  // the timestamp in which the token will become available again
//         inflight: 0,           // the number of deliveries (`fn` calls) that still haven't completed
//     },
//     'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb': {
//         // ...
//     }
// }
```


## Tests

`$ npm test`   
`$ npm test -- --watch` during development


## License

Released under the [MIT License](https://www.opensource.org/licenses/mit-license.php).
