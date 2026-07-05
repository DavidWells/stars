---
repo: tinyhttp/jwt
url: 'https://github.com/tinyhttp/jwt'
homepage: ''
starredAt: '2021-07-04T23:23:31Z'
createdAt: '2021-07-04T18:15:55Z'
updatedAt: '2023-10-27T18:11:01Z'
language: TypeScript
license: NA
branch: master
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:51.863Z'
description: "\U0001F510 tiny JWT middleware for Node.js"
tags:
  - jwt
  - jwt-middleware
  - middleware
  - nodejs
  - tinyhttp
---

<div align="center">

# @tinyhttp/jwt

[![NPM][npm-badge]][npm-url] [![NPM][dl-badge]][npm-url] [![GitHub Workflow Status][actions-img]][github-actions] [![Coverage][cov-img]][cov-url]

JWT middleware for HTTP servers.

</div>

## Install

```sh
bun i @tinyhttp/jwt
```

## API

```ts
import { jwt } from '@tinyhttp/jwt'
```

### Options

#### `jwt(options)`

- `secret`: can be an array of strings (in case you are using private / public key encryption), or just a string if you are using basic HMAC signing (see the examples below)
- `algorithm? ("HS256")`: the algorithm used to sign and verify the token
- `audience?`: the expected "audience" of the jwt token
- `issuer?`: who issued this token
- `expiresIn?`: expiration time of the token (ex: `1d` for 1 day)
- `notBefore?`: not before date of the token (ex: `20m` for 20 minutes)
- `requestHeaderName? ("Authorization")`: the name of the header contaning the Bearer token
- `responseHeaderName? ("X-Token")`: the name of the response header containing the new signed token that will be used later on
- `getToken(string)?: string`: the method used for ex

## Example

### Basic secret

```ts
import { App } from '@tinyhttp/app'
import { jwt } from '@tinyhttp/jwt'

new App()
  .use(jwt({ secret: 'secret', algorithm: 'HS256' }))
  .get('/', (req, res) => res.send(`Data inside the payload: ${req['user']}`))
  .listen(8080)
```

### Private / Public key

```ts
import { App } from '@tinyhttp/app'
import { jwt } from '@tinyhttp/jwt'

new App()
  .use(jwt({ secret: ['PRIVATE KEY', 'PUBLIC KEY'], algorithm: 'RS256' }))
  .get('/', (req, res) => res.send(`Data inside the payload: ${req['user']}`))
  .listen(8080)
```

[npm-badge]: https://img.shields.io/npm/v/@tinyhttp/jwt?style=for-the-badge&color=hotpink&label=&logo=npm
[npm-url]: https://npmjs.com/package/@tinyhttp/jwt
[dl-badge]: https://img.shields.io/npm/dt/@tinyhttp/jwt?style=for-the-badge&color=hotpink
[actions-img]: https://img.shields.io/github/actions/workflow/status/tinyhttp/jwt/main.yml?style=for-the-badge&logo=github&label=&color=hotpink
[github-actions]: https://github.com/tinyhttp/jwt/actions
[cov-img]: https://img.shields.io/coveralls/github/tinyhttp/jwt?style=for-the-badge&color=hotpink&a
[cov-url]: https://coveralls.io/github/tinyhttp/jwt
