---
repo: pilcrowonpaper/oslo
url: 'https://github.com/pilcrowonpaper/oslo'
homepage: 'https://oslo.js.org'
starredAt: '2023-12-29T02:32:53Z'
createdAt: '2023-10-15T12:58:22Z'
updatedAt: '2025-02-21T18:17:18Z'
language: TypeScript
license: MIT
branch: main
stars: 1166
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:40.826Z'
description: A collection of auth-related utilities
tags: []
---

# `oslo`

**This package has been deprecated. Please use the packages published under the [Oslo project](https://oslojs.dev) instead.**

A collection of auth-related utilities, including:

- `oslo/cookie`: Cookie parsing and serialization
- `oslo/crypto`: Generate hashes, signatures, and random values
- `oslo/encoding`: Encode base64, base64url, base32, hex
- `oslo/jwt`: Create and verify JWTs
- `oslo/oauth2`: OAuth2 helpers
- `oslo/otp`: HOTP, TOTP
- `oslo/password`: Password hashing
- `oslo/request`: CSRF protection
- `oslo/webauthn`: Verify Web Authentication API attestations and assertions

Aside from `oslo/password`, every module works in any environment, including Node.js, Cloudflare Workers, Deno, and Bun.

Documentation: https://oslo.js.org

## Installation

```
npm i oslo
pnpm add oslo
yarn add oslo
```

## Node.js

For Node.js 16 & 18, you need to polyfill the Web Crypto API. This is not required in Node.js 20.

```ts
import { webcrypto } from "node:crypto";

globalThis.crypto = webcrypto;
```

Alternatively, add the `--experimental-global-webcrypto` flag when running Node.

```
node --experimental-global-webcrypto index.js
```
