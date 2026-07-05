---
repo: uhop/cognito-toolkit
url: 'https://github.com/uhop/cognito-toolkit'
homepage: ''
starredAt: '2021-08-20T22:35:31Z'
createdAt: '2019-05-03T15:21:03Z'
updatedAt: '2023-06-06T18:17:42Z'
language: JavaScript
license: NA
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:47.567Z'
description: >-
  Helpers for AWS Cognito to build web applications with
  authentication/authorization
tags:
  - aws-cognito
  - cognito-pools
  - user-pools
---

# `cognito-toolkit` [![NPM version][npm-img]][npm-url]

[npm-img]: https://img.shields.io/npm/v/cognito-toolkit.svg
[npm-url]: https://npmjs.org/package/cognito-toolkit


Helpers to authenticate and authorized users using [AWS Cognito](https://aws.amazon.com/cognito/)
[user pools](https://docs.aws.amazon.com/cognito/latest/developerguide/cognito-user-identity-pools.html).
A JWT token (either an id or access token) is validated and returned in a decrypted form.
Simple helpers are provided to make decisions on accessibility of API endpoints for a given user.

# Examples

```js
const makeGetUser = require('cognito-toolkit');

// run getUser() on every request
const getUser = makeGetUser({
  region: 'us-east-1',
  userPoolId: 'us-east-1_MY_USER_POOL'
});

// ...somewhere in our endpoint we have a context variable: ctx

const authHeader = ctx.headers.authorization;
const authCookie = ctx.cookies.get('auth');

const user = getUser(authHeader || authCookie);

if (user) {
  console.log('Our user:\r\n' + JSON.stringify(user, null, 2));
} else {
  console.log('User was not authenticated.');
}
```

# How to install

```txt
npm install --save cognito-toolkit
# yarn add cognito-toolkit
```

# Documentation

All provided functions are explained below. See the examples above for usage patterns.

## `makeGetUser(options)`

This is the main function directly returned from the main module. It returns an asynchronous function, which is used to decode a user.

It takes one argument `options`, which is an object with the following properties or an array of such objects:

* `region` &mdash **required** string, which specifies an AWS region, such as `'us-east-1'`. Default: **none**.
* `userPoolId` &mdash **required** string, which specifies a user pool ID, such as `'us-east-1_MY_USER_POOL'`. Default: **none**.

The returned function takes a token as a string (possible sources are a header or a cookie) and returns a decoded JWT token or `null` (cannot positively authenticate).

## Utilities: `utils/lazyAccessToken`

It is a helper to retrieve an access token lazily on demand.

### `setCredentials(url, clientId, secret)`

This synchronous function sets credentials for future authentications. It takes a URL (usually in the form of *Cognito user pool DNS*`/oauth2/token`),
an app client ID and an app client secret (all as strings) and retrieves an access token
(see [TOKEN Endpoint](https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html), the part on `client_credentials`).

### `getToken()`

This synchronous function returns the current token whatever it is. If it was not retrieved yet, it will return `null`.

### `authorize()`

This **asynchronous** function checks if there is an unexpired token and retrieves it, if required. It uses credentials set by `setCredentials()` (see above).
As a result it returns a token or `null`, if credentials were not set. After running this function the current token can be obtained with `getToken()` (see above).

Examples:

```js
const {setCredentials, authorize} = require('cognito-toolkit/utils/lazyAccessToken');

// ...

setCredentials(
  'https://auth.my-custom-domain/oauth2/token',
  process.env.AUTH_CLIENT_ID,
  process.env.AUTH_CLIENT_SECRET
);

// ...

const doIt = async () => {
  // every time we call it, it retrieves a token from a server
  const token = await authorize();
  // use the token immediately: it can be changed next time you need it
  const options = {
    protocol: 'https',
    hostname: 'api.my-custom-domain.com',
    path: '/items',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: token.access_token
    }
  };
  // do a call ...
};
```

## Utilities: `utils/renewableAccessToken`

It is a helper to retrieve an access token on demand, then renew it by a timer automatically.

### `retrieveToken(url, clientId, secret)`

This **asynchronous** function takes a URL (usually in the form of *Cognito user pool DNS*`/oauth2/token`), an app client ID and an app client secret (all as strings)
and retrieves an access token (see [TOKEN Endpoint](https://docs.aws.amazon.com/cognito/latest/developerguide/token-endpoint.html), the part on `client_credentials`).

Warning: the function always uses `https` protocol, which is a default for Cognito pools.

The function schedules itself to run when a token is about to expire. The exact algorithm is `expires_in` (defined in the token structure) minus 5 minutes.
If the result is negative, it will run in a half of `expires_in` time.

While the function resolves its return in a token structure, do not save it because it can be updated over time. Always use `getToken()` function (described below) before using a token.

Example:

```js
const {retrieveToken} = require('cognito-toolkit/utils/renewableAccessToken');

// ...

const doIt = async () => {
  // every time we call it, it retrieves a token from a server
  const token = await retrieveToken(
    'https://auth.my-custom-domain/oauth2/token',
    process.env.AUTH_CLIENT_ID,
    process.env.AUTH_CLIENT_SECRET
  );
  // use the token immediately: it can be changed next time you need it
  const options = {
    protocol: 'https',
    hostname: 'api.my-custom-domain.com',
    path: '/items',
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: token.access_token
    }
  };
  // do a call ...
};
```

### `getToken()`

This synchronous function returns the current token whatever it is. If it was not retrieved yet, it will return `null`.

Example:

```js
// rewriting the previous example

const {retrieveToken, getToken} = require('cognito-toolkit/utils/renewableAccessToken');

const authorize = () => {
  // this function can be called multiple times
  // it calls the retrieveToken() only when necessary
  // and getToken() always returns the fresh token
  if (!getToken()) {
    return retrieveToken(
      'https://auth.my-custom-domain/oauth2/token',
      process.env.AUTH_CLIENT_ID,
      process.env.AUTH_CLIENT_SECRET
    );
  }
};

// ...

const doIt = async () => {
  await authorize(); // we can call it many times without taxing the auth system
  const token = getToken(); // totally safe to get a token like that
  // like in the previous example ...
};
```

# Versions

- 1.0.5 *Updated dependencies.*
- 1.0.4 *Updated dependencies.*
- 1.0.3 *Updated dependencies.*
- 1.0.2 *Updated dependencies.*
- 1.0.1 *Added support for multiple pools.*
- 1.0.0 *The initial public release.*

# License

[The 3-Clause BSD License](https://opensource.org/licenses/BSD-3-Clause)
