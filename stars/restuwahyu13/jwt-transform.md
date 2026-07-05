---
repo: restuwahyu13/jwt-transform
url: 'https://github.com/restuwahyu13/jwt-transform'
homepage: ''
starredAt: '2021-10-30T01:49:24Z'
createdAt: '2021-10-25T09:40:41Z'
updatedAt: '2024-09-06T00:15:22Z'
language: TypeScript
license: MIT
branch: main
stars: 18
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:41.283Z'
description: Transform your real jwt token into fake jwt token.
tags:
  - algorithm
  - base64
  - browser
  - cryptography
  - decrypt
  - encrypt
  - hex
  - javascript
  - jwt
  - jwt-transform
  - node
  - nodejs
  - security
  - security-tools
  - typescipt
  - typescript
---

# JWT Transform

[![Build Status](https://scrutinizer-ci.com/g/restuwahyu13/jwt-transform/badges/build.png?b=main)](https://scrutinizer-ci.com/g/restuwahyu13/jwt-transform/build-status/main) [![CodeFactor](https://www.codefactor.io/repository/github/restuwahyu13/jwt-transform/badge)](https://www.codefactor.io/repository/github/restuwahyu13/jwt-transform) [![codebeat badge](https://codebeat.co/badges/56d95df5-235b-4988-8a4e-b1b5aad6d796)](https://codebeat.co/projects/github-com-restuwahyu13-jwt-transform-main) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/b55a9532f9f84ebd94b37b52c32d7472)](https://www.codacy.com/gh/restuwahyu13/jwt-transform/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=restuwahyu13/jwt-transform&amp;utm_campaign=Badge_Grade) ![node-current](https://img.shields.io/node/v/jwt-transform?style=flat-square) ![npm](https://img.shields.io/npm/dm/jwt-transform) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/restuwahyu13/jwt-transform/blob/main/CONTRIBUTING.md)

**jwt-transform** is a simple utility tool for your transforming a real *jwt token* into a fake *jwt token*, because if you store *jwt token* into a `cookie` or `local storage` very unsafe, your *jwt token* can be seen data using [jwt.io](https://jwt.io) website or chrome extension, if you use **jwt-transform** you real *jwt token* cannot seen using  [jwt.io](https://jwt.io) website or chrome extension, because what you save is fake *jwt token*, you can get back real *jwt token* using decrypt method for parse fake *jwt token*.

## Table Of Content

- [JWT Transform](#jwt-transform)
  - [Table Of Content](#table-of-content)
  - [Installation](#installation)
  - [API Reference](#api-reference)
  - [Example Usage](#example-usage)
    + [transfrom](#transfromsecretkey-string-plaintext-string-rotate-number-string) 
    + [untransform](#untransformsecretkey-string-ciphertext-string-rotate-number-string)
  - [Testing](#testing)
  - [Bugs](#bugs)
  - [Contributing](#contributing)
  - [License](#license)

## Installation

```bash
npm install jwt-transform -S or yarn add jwt-transform -S
```

## API Reference

- #### transfrom(secretKey: string, plainText: string, rotate: number): string

  encrypt jwt token using caesar cipher cryptography from real jwt token into fake jwt token

- #### untransform(secretKey: string, cipherText: string, rotate: number): string

  decrypt jwt token using caesar cipher cryptography from fake jwt token into real jwt token

## Example Usage

Follow this **[express tutorial](https://github.com/restuwahyu13/express-rest-api-clean-architecture)** for example usage using express, make this as middleware for transform your fake jwt token to real token, because jwt .verify need real token, if you pass fake token jwt.verify identification your token is not valid and if you not using express, make this as middleware.

- ##### Example Usage Using CommonJs With JavaScript

  ```javascript
   const { JwtTransform } = require('jwt-transform')

    const secretKey = 'ptLDDOU5ejqqLjlk4CpSNxvwZVxQFRmF'
   const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

   const resultEncrypt = JwtTransform.transform(secretKey, accessToken, secretKey.length)
   console.log(resultEncrypt)

   // fake jwt token
   // kePnhMioUoPOAfO1ToOyOtX5iIO6OqvDBIP9.kePfjCOoUoOdSpS0TZE3UJqcOocohsLzFYO6OqvbgM4mXM9rOocogCL0OpudTZK2SpS5SJOelWvzRJJUA5kpwwRprq4IvYTdbcFBdWLXsL.YlrQdcXPYSkQQL2WZ4lcvSkPl36VUq6ePB_gjWyyc5i

   const resultDecrypt = JwtTransform.untransform(secretKey, resultEncrypt, secretKey.length)
   console.log(resultDecrypt)

   // real jwt token
   // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
  ```

- ##### Example Usage Using ESM With JavaScript / TypeScript

  ```javascript
   import { JwtTransform } from 'jwt-transform'

    const secretKey = 'ptLDDOU5ejqqLjlk4CpSNxvwZVxQFRmF'
   const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

   const resultEncrypt = JwtTransform.transform(secretKey, accessToken, secretKey.length)
   console.log(resultEncrypt)

   // fake jwt token
   // kePnhMioUoPOAfO1ToOyOtX5iIO6OqvDBIP9.kePfjCOoUoOdSpS0TZE3UJqcOocohsLzFYO6OqvbgM4mXM9rOocogCL0OpudTZK2SpS5SJOelWvzRJJUA5kpwwRprq4IvYTdbcFBdWLXsL.YlrQdcXPYSkQQL2WZ4lcvSkPl36VUq6ePB_gjWyyc5i

   const resultDecrypt = JwtTransform.untransform(secretKey, resultEncrypt, secretKey.length)
   console.log(resultDecrypt)

   // real jwt token
   // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
  ```

## Testing

- Testing Via Local

  ```sh
  npm test or make test
  ```

- Testing Via Local And Build

  ```sh
  make build
  ```

- Testing Via Docker

  ```sh
  docker build -t jwt-transform or make dkb tag=jwt-transform
  ```

## Bugs

For information on bugs related to package libraries, please visit [here](https://github.com/restuwahyu13/jwt-transform/issues)

## Contributing

Want to make **jwt-transform** more perfect ? Let's contribute and follow the [contribution guide.](https://github.com/restuwahyu13/jwt-transform/blob/main/CONTRIBUTING.md)

## License

- [MIT License](https://github.com/restuwahyu13/jwt-transform/blob/main/LICENSE.md)

<p align="right" style="padding: 5px; border-radius: 100%; background-color: red; font-size: 2.5rem;">
  <b><a href="#jwt-transform">BACK TO TOP</a></b>
</p>
