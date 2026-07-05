---
repo: locutusjs/locutus
url: 'https://github.com/locutusjs/locutus'
homepage: 'https://locutus.io'
starredAt: '2014-05-20T15:48:52Z'
createdAt: '2009-09-03T09:52:00Z'
updatedAt: '2025-02-24T20:58:11Z'
language: JavaScript
license: MIT
branch: main
stars: 3735
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:04.193Z'
description: >-
  Bringing stdlibs of other programming languages to JavaScript for educational
  purposes
tags:
  - javascript
  - ports
  - programming-language
---

# Locutus

> All your standard libraries will be assimilated into our JavaScript collective. Resistance is futile.

Welcome to Locutus, where the boundaries of coding languages blur. We're a dedicated collective developers on a mission
to explore the possibilities of porting standard libraries from various programming language (Go, Ruby, PHP, C) to
JavaScript. Our journey is one of discovery, innovation, and sometimes, delightful chaos.

From the complex to the quirky, we assimilate libraries with a spirit of curiosity and a penchant for experimentation.
Our creations typically start as rainy Sunday afternoon puzzles, and end up ranging from groundbreaking functions that
enhance the JavaScript ecosystem, to unique oddities that challenge the norms of coding.

As we navigate through this uncharted territory, we invite you to join us. Whether to contribute, learn, or simply
marvel at the wonders of cross-language integration and portability, your presence on GitHub is valued.

Embark on this journey with us at [locutus.io](https://locutus.io/).

Use our creations at your own risk, and may they inspire you to push the boundaries of what's possible with JavaScript.

## Table of contents

- [Install](#install)
- [Use](#use)
- [Development](#development)

## Install

```bash
yarn add locutus
```

## Use

```bash
$ vim php.js
```

```javascript
const sprintf = require('locutus/php/strings/sprintf')
const echo = require('locutus/php/strings/echo')
const effectiveness = 'futile'
echo(sprintf('Resistance is %s', effectiveness))
```

```bash
$ node php.js
Resistance is futile
```

```bash
$ vim go.js
```

```javascript
const strings = require('locutus/golang/strings')
console.log(strings.Contains('Locutus', 'cut'))
```

```bash
$ node go.js
true
```

## Development

Some guidelines and instructions can be found in [CONTRIBUTING.md](CONTRIBUTING.md)
