---
repo: schibsted/node-token-introspection
url: 'https://github.com/schibsted/node-token-introspection'
homepage: null
starredAt: '2021-06-04T01:49:18Z'
createdAt: '2017-02-20T11:46:35Z'
updatedAt: '2024-05-15T08:28:32Z'
language: JavaScript
license: NA
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:36.464Z'
description: 'Library to introspect token of service following RFC-7662 '
tags: []
---

# node-token-introspection

Node token introspection package introspects a token towards an oauth service that follows the [RFC 7662](https://tools.ietf.org/html/rfc7662).

## Install

```bash
npm install token-introspection --save
```

# Node version

Currently we only support latest Node LTS.
If you want to use an earlier version of node, please use
[babel register](https://babeljs.io/docs/usage/babel-register/).

## Usage

Introspect package is configured with endpoint and client credentials, and a function is returned.
Calling that function with token, and optional token_type_hint will return a
[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

```javascript
const tokenIntrospection = require('token-introspection')({
    endpoint: 'https://example.com/introspect',
    client_id: '<Client ID>',
    client_secret: '<Client Secret>',
});

tokenIntrospection(token).then(console.log).catch(console.warn);
```

## Configuration

| Field                     | Required | Comment |
| ------------------------- | :------: | ------- |
| jwks                      | (X)      | Static JWKS of trusted keys, for example `{keys: [{kty:'RSA',n:'4-4mhUVhY2k',e:'AQAB'}]}` |
| jwks_uri                  | (X)      | URL of a trusted JWKS, for example `https://example.com/jwks` |
| endpoint                  | (X)      | URL to call, for instance https://example.com/introspect |
| allowed_algs              |          | List of allowed signing algorithms, defaults to `['RS256']` |
| jwks_cache_enabled        |          | If jwks response should be cached, defaults to true |
| jwks_cache_maxentries     |          | How many jwk's to cache, defaults to 10 |
| jwks_cache_time           |          | How long a jwk is cached, in ms, defaults to 5 min |
| jwks_timeout              |          | Timeout in ms for fetching jwks, defaults to 10s |
| jwks_ratelimit_enabled    |          | If ratelimit of calls to jwks endpoint, defaults to true |
| jwks_ratelimit_per_minute |          | Limits of jwks calls, defaults to 60 rpm |
| jwks_client_fetcher       |          | Fetcher function that is used by the [Jwks Client library](https://www.npmjs.com/package/jwks-rsa). It must resolve to the Jwks response. Some `jwks_*` options do not apply when using the custom jwks client fetcher |
| client_id                 |          | Client ID used to introspect |
| client_secret             |          | Client secret used to introspect |
| access_token              |          | Access token used to introspect, instead of client credentials |
| user_agent                |          | Defaults to `token-introspection` |
| fetch                     |          | Defaults to [node-fetch](https://github.com/bitinn/node-fetch), but you can inject [zipkin-instrumentation-fetch](https://www.npmjs.com/package/zipkin-instrumentation-fetch). |

At least one of the required configuration parameters `jwks`, `jwks_uri` or `endpoint` must be specified.

### Flexibility in fetch
As you can provide your own `fetch` implementation, it is possible override the agent `fetch` uses for various purposes.
These purpose can be things like zipkin/tracing, self signed certificates, client TLS authentication, proxy, adding a keepAlive, etc.

```js
const HttpsProxy = require('https-proxy-agent');
const proxy = new HttpsProxy(proxySettings);

const customFetch = (endpoint, options) => {
    options.agent = proxy;
    process.env.HTTPS_PROXY = proxy;
    return fetch(endpoint, options);
};

const tokenIntrospection = require('token-introspection');
const introspector = tokenIntrospection({endpoint, ..., fetch: customFetch});
```

## Errors
This is a promise/async library, and will resolve with success or reject with an Error subclass.

* `IntrospectionError`: Base error, thrown when introspection fails for some reason.
* `ConfigurationError`: Thrown when configuration is wrong.
* `MalformedTokenError`: Thrown when token is malformed, currently not publicly exposed.
* `TokenNotActiveError`: Thrown when token is not active, base error for `TokenExpiredError` and `NotBeforeError`.
* `TokenExpiredError`: Thrown in local introspection when token has expired.
* `NotBeforeError`: Thrown in local introspection when token is not yet valid

## Showing debug output

Set the environment variable `DEBUG=token-introspection`.
