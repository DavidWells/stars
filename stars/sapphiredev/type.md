---
repo: sapphiredev/type
url: 'https://github.com/sapphiredev/type'
homepage: 'https://www.sapphirejs.dev/'
starredAt: '2021-11-11T06:02:30Z'
createdAt: '2019-09-12T15:55:22Z'
updatedAt: '2025-02-23T02:57:21Z'
language: TypeScript
license: MIT
branch: main
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:39.554Z'
description: A type detection utility for JavaScript
tags:
  - hacktoberfest
  - internals
  - javascript
  - sapphire
  - type
  - typescript
---

<div align="center">

![Sapphire Logo](https://raw.githubusercontent.com/sapphiredev/assets/main/banners/SapphireCommunity.png)

# @sapphire/type

**A type detection utility for JavaScript.**

[![GitHub](https://img.shields.io/github/license/sapphiredev/type)](https://github.com/sapphiredev/type/blob/main/LICENSE.md)
[![npm bundle size](https://img.shields.io/bundlephobia/min/@sapphire/type?logo=webpack&style=flat-square)](https://bundlephobia.com/result?p=@sapphire/type)
[![npm](https://img.shields.io/npm/v/@sapphire/type?color=crimson&logo=npm&style=flat-square)](https://www.npmjs.com/package/@sapphire/type)

</div>

---

**Table of Contents**

- [Description](#description)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
- [Buy us some doughnuts](#buy-us-some-doughnuts)
- [Contributors](#contributors)

## Description

Sometimes there is a need to know what a value's type of something is, this package exists to satisfy those needs by
implementing a parser that can retrieve the type of the value recursively and process a string similar to TypeScript's
types.

## Features

- Written in TypeScript
- Bundled with Rollup so it can be used in NodeJS and browsers
- Offers CommonJS, ESM and UMD bundles
- Fully tested

## Installation

```sh
yarn add @sapphire/type
# npm install @sapphire/type
```

## Usage

**Note:** While this section uses `require`, the imports match 1:1 with ESM imports. For example
`const { Type } = require('@sapphire/type')` equals `import { Type } from '@sapphire/type'`.

**Note:** When using ESM syntax you can also default-import `Type` class: `import Type from '@sapphire/type'`.

**Note:** The internal functions of `getPromiseDetails` and `getProxyDetails` are also exported. If you don't know what
these are, then you need not be concerned about this.

### Basic Usage

```typescript
// Import the Type class
const { Type } = require('@sapphire/type');

// Define a Type with an array of two numbers
const type = new Type([1, 2]);

console.log(type.toString());
// Logs: Array<number>
```

---

## Buy us some doughnuts

Sapphire Community is and always will be open source, even if we don't get donations. That being said, we know there are
amazing people who may still want to donate just to show their appreciation. Thank you very much in advance!

We accept donations through Open Collective, Ko-fi, PayPal, Patreon and GitHub Sponsorships. You can use the buttons
below to donate through your method of choice.

|   Donate With   |                       Address                       |
| :-------------: | :-------------------------------------------------: |
| Open Collective | [Click Here](https://sapphirejs.dev/opencollective) |
|      Ko-fi      |      [Click Here](https://sapphirejs.dev/kofi)      |
|     Patreon     |    [Click Here](https://sapphirejs.dev/patreon)     |
|     PayPal      |     [Click Here](https://sapphirejs.dev/paypal)     |

## Contributors

Please make sure to read the [Contributing Guide][contributing] before making a pull request.

Thank you to all the people who already contributed to Sapphire!

<a href="https://github.com/sapphiredev/type/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=sapphiredev/type" />
</a>

[contributing]: https://github.com/sapphiredev/.github/blob/main/.github/CONTRIBUTING.md
