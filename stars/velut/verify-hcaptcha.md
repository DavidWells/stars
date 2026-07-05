---
repo: velut/verify-hcaptcha
url: 'https://github.com/velut/verify-hcaptcha'
homepage: ''
starredAt: '2021-12-14T02:19:01Z'
createdAt: '2021-09-30T21:02:07Z'
updatedAt: '2025-02-21T17:39:38Z'
language: TypeScript
license: MIT
branch: main
stars: 8
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:29.031Z'
description: >-
  A fully typed library to verify hCaptcha.com tokens submitted by users when
  solving captcha challenges.
tags:
  - captcha
  - hcaptcha
  - jsdocs
  - node
  - typescript
---

# ✅ verify-hcaptcha

[![Build status](https://img.shields.io/github/actions/workflow/status/velut/verify-hcaptcha/main.yml?branch=main)](https://github.com/velut/verify-hcaptcha/actions?query=workflow%3ACI)
[![Coverage](https://img.shields.io/codecov/c/gh/velut/verify-hcaptcha)](https://codecov.io/gh/velut/verify-hcaptcha)
[![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-blue)](https://www.jsdocs.io/package/verify-hcaptcha)
![Language](https://img.shields.io/github/languages/top/velut/verify-hcaptcha)
[![npm](https://img.shields.io/npm/v/verify-hcaptcha)](https://www.npmjs.com/package/verify-hcaptcha)
[![License](https://img.shields.io/github/license/velut/verify-hcaptcha)](https://github.com/velut/verify-hcaptcha/blob/main/LICENSE)

A fully typed library to verify hCaptcha.com tokens submitted by users when solving captcha challenges.

> [!WARNING]
> This is an **unofficial** library; we are not affiliated with hCaptcha.com.

## Useful resources

- [**Explore the API on jsDocs.io**](https://www.jsdocs.io/package/verify-hcaptcha)
- View package contents on [**unpkg**](https://unpkg.com/verify-hcaptcha/)
- View repository on [**GitHub**](https://github.com/velut/verify-hcaptcha)
- Read the changelog on [**GitHub**](https://github.com/velut/verify-hcaptcha/blob/main/CHANGELOG.md)
- Read the official documentation on [**hCaptcha**](https://docs.hcaptcha.com/)

## Install

Using `npm`:

```
npm add verify-hcaptcha
```

Using `yarn`:

```
yarn add verify-hcaptcha
```

Using `pnpm`:

```
pnpm add verify-hcaptcha
```

Using `bun`:

```
bun add verify-hcaptcha
```

## Usage Examples

Verify a token submitted by a user:

```typescript
import { verifyHcaptchaToken } from "verify-hcaptcha";

const result = await verifyHcaptchaToken({
	token: "USER-SUBMITTED-RESPONSE-TOKEN",
	secretKey: "YOUR-SECRET-KEY",
	siteKey: "YOUR-SITE-KEY",
});

if (result.success) {
	console.log("User is human");
} else {
	console.log("User is robot");
}
```

## License

```
MIT
```

Copyright (c) 2025 Edoardo Scibona

See [LICENSE](./LICENSE) file.
