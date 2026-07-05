---
repo: 47ng/simple-e2ee
url: 'https://github.com/47ng/simple-e2ee'
homepage: null
starredAt: '2020-10-10T05:38:33Z'
createdAt: '2020-09-26T06:07:46Z'
updatedAt: '2025-01-17T01:25:45Z'
language: TypeScript
license: MIT
branch: next
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:27.546Z'
description: Simple end-to-end encryption for webapps
tags: []
---

# `@47ng/simple-e2ee`

[![NPM](https://img.shields.io/npm/v/@47ng/simple-e2ee?color=red)](https://www.npmjs.com/package/@47ng/simple-e2ee)
[![MIT License](https://img.shields.io/github/license/47ng/simple-e2ee.svg?color=blue)](https://github.com/47ng/simple-e2ee/blob/next/LICENSE)
[![Continuous Integration](https://github.com/47ng/simple-e2ee/workflows/Continuous%20Integration/badge.svg?branch=next)](https://github.com/47ng/simple-e2ee/actions)
[![Coverage Status](https://coveralls.io/repos/github/47ng/simple-e2ee/badge.svg?branch=next)](https://coveralls.io/github/47ng/simple-e2ee?branch=next)
[![Dependabot Status](https://api.dependabot.com/badges/status?host=github&repo=47ng/simple-e2ee)](https://dependabot.com)

Simple end-to-end encryption for web apps. Inspired from [Excalidraw](https://excalidraw.com) and [Firefox Send](https://github.com/mozilla/send) (RIP).

## How it works

You encrypt your data in the browser, send the encrypted data
to a server, and use the hash part of the URL (which never
hits the server) to share the key with someone else.

On the other side, the recipient obtains the key from the URL,
the payload from the server and decrypts the data.

This library does not handle any of the server upload/download
side, it's up to you. It only deals with encryption, decryption
and moving keys in and out of URLs.

## Installation

```shell
$ yarn add @47ng/simple-e2ee
# or
$ npm i @47ng/simple-e2ee
```

## Usage

```ts
import {
  encrypt,
  decrypt,
  applyKeyToURL,
  getKeyFromURL,
  generateKey
} from '@47ng/simple-e2ee'

// Before sending data to the server, encrypt it:
const { payload, key } = encrypt(
  "whatever you want, as long as it's JSON-serialisable"
)

// Upload `payload` to the server
// Stick the key onto the current URL:
const shareURL = applyKeyToURL(key)

// Optionally, apply the key to another URL
// (example, with an ID returned from the server):
const shareURL = applyKeyToURL(key, `https://example.com/share/${id}`)

// On the other side, get the key from the current URL,
// and the payload from the server:
const key = getKeyFromURL()
const message = decrypt(payload, key)

// Optionally, obtain the key from any URL:
const key = getKeyFromURL(
  `https://example.com/share/foo#KatLceVEOM2znzX_FGPKu6Zz1adWkhlq9b2R9WRjUsM=`
)

// Encrypt related pieces of content with the same key:
const payload = encrypt('some more data', key)

// Generate a key for later use:
const key = generateKey()
```

## License

[MIT](https://github.com/47ng/simple-e2ee/blob/master/LICENSE) - Made with ❤️ by [François Best](https://francoisbest.com).

Using this package at work ? [Sponsor me](https://github.com/sponsors/franky47) to help with support and maintenance.
