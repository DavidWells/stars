---
repo: gcanti/io-ts
url: 'https://github.com/gcanti/io-ts'
homepage: 'https://gcanti.github.io/io-ts/'
starredAt: '2022-02-27T21:03:06Z'
createdAt: '2017-01-28T16:23:37Z'
updatedAt: '2025-02-21T11:25:16Z'
language: TypeScript
license: MIT
branch: master
stars: 6741
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:04.444Z'
description: Runtime type system for IO decoding/encoding
tags:
  - inference
  - runtime
  - types
  - typescript
  - validation
---

[![build status](https://img.shields.io/travis/gcanti/io-ts/master.svg?style=flat-square)](https://travis-ci.org/gcanti/io-ts)
![npm downloads](https://img.shields.io/npm/dm/io-ts.svg)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
  - [Stable features](#stable-features)
  - [Experimental features (version `2.2+`)](#experimental-features-version-22)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# Installation

To install the stable version

```sh
npm i io-ts fp-ts
```

**Note**. [`fp-ts`](https://github.com/gcanti/fp-ts) is a peer dependency for `io-ts`

# Usage


## Stable features

- [Documentation of the main stable features (`index.ts` module)](index.md)

## Experimental modules (version `2.2+`)

Experimental modules (\*) are published in order to get early feedback from the community, see these tracking [issues](https://github.com/gcanti/io-ts/issues?q=label%3Av2.2+) for further discussions and enhancements.

The experimental modules are **independent and backward-incompatible** with stable ones.

- [`Decoder.ts` module](Decoder.md)
- [`Encoder.ts` module](Encoder.md)
- [`Codec.ts` module](Codec.md)
- [`Eq.ts` module](Eq.md)
- [`Schema.ts` module (advanced feature)](Schema.md)

(\*) A feature tagged as _Experimental_ is in a high state of flux, you're at risk of it changing without notice.
