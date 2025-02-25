---
repo: dan-online/jwtrust
url: 'https://github.com/dan-online/jwtrust'
homepage: 'https://npmjs.com/package/jwtrust'
starredAt: '2022-12-09T01:37:48Z'
createdAt: '2022-11-30T23:53:12Z'
updatedAt: '2025-02-23T01:07:39Z'
language: TypeScript
license: NA
branch: main
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:00:05.745Z'
description: >-
  A tiny library to sign and verify JWT tokens using Rust bindings for pure
  performance.
tags:
  - jsonwebtoken
  - jwt
  - rust
  - speed
---

![npm version](https://img.shields.io/npm/v/jwtrust)

# JWTRust

A tiny library to sign and verify JWT tokens using **Rust** bindings for pure performance.

```ts
JWTRust Benchmark commencing, runs set at 100000 and 16 payload length.

✔ Benchmarking complete!
┌──────────────┬──────────────┬───────────────────┬───────────┐
│   (index)    │ Average (ms) │ Operations (op/s) │ Total (s) │
├──────────────┼──────────────┼───────────────────┼───────────┤
│   JWTRust    │   '0.010'    │     '104,020'     │  '0.96'   │
│   fast-jwt   │   '0.018'    │     '55,056'      │  '1.82'   │
│ jsonwebtoken │   '0.022'    │     '45,488'      │  '2.20'   │
└──────────────┴──────────────┴───────────────────┴───────────┘
```

> Benchmark run on Ryzen 3600X (6 cores, 12 threads) with 32GB RAM

## Table of contents

- [JWTRust](#jwtrust)
  - [Table of contents](#table-of-contents)
  - [Getting Started](#getting-started)
  - [Installation](#installation)
  - [API](#api)
    - [construct](#construct)
    - [sign](#sign)
      - [Parameters](#parameters)
    - [verify](#verify)
      - [Parameters](#parameters-1)
  - [Typescript](#typescript)
  - [Development](#development)
    - [Prerequisites](#prerequisites)
    - [Building the entire package](#building-the-entire-package)
    - [Running benchmarks](#running-benchmarks)
  - [Contributing](#contributing)
  - [Built With](#built-with)
  - [Versioning](#versioning)
  - [Authors](#authors)
  - [License](#license)

## Getting Started

## Installation

To install and set up the library, run:

```sh
$ yarn add jwtrust
```

Or if you still for some reason prefer npm:

```sh
$ npm i jwtrust
```

## API

### construct

```js
const { JWTR } = require('jwtrust');

const jwtrust = new JWTR('secret');
```

### sign

```js
const jwtrust = new JWTR('secret');

const token = jwtrust.sign({ hello: 'world' });
```

Supported options and result fields for the `sign` method are listed below.

#### Parameters

`payload`

| Type    | Default value |
| ------- | ------------- |
| unknown | required      |

The payload to sign. This is JSON serialized before signing.

`options`

| Option | Default value       | Description                                                              |
| ------ | ------------------- | ------------------------------------------------------------------------ |
| exp    | 7 days              | Expiry date in UTC timestamp for example: Date.now() / 1000 + (60 \* 60) |
| iat    | (Date.now() / 1000) | Issued at time in UTC format                                             |

To aid expiry date, a helper is exported named `convertTime`:

```js
const { convertTime } = require('jwtrust');

const exp = convertTime('1y');
const exp = convertTime('6h');
const exp = convertTime('2s');
```

Example:

```js
const token = jwtrust.sign({ hello: 'world' }, { exp: convertTime('1y'), iat: Date.now() });
```

### verify

```js
const jwtrust = new JWTR('secret');

const payload = jwtrust.verify(token);
```

Supported options and result fields for the `verify` method are listed below.

#### Parameters

`token`

| Type   | Default value |
| ------ | ------------- |
| string | required      |

The token to verify and decode.

## Typescript

This library is written in Typescript and includes type definitions. Here is an example that will be typed correctly:

```ts
import { JWTR, convertTime } from 'jwtrust';

type Payload = { hello: string }

const jwtrust = new JWTR<Payload>('secret');

const token = jwtrust.sign({ hello: 'world' });

const decoded: Payload = jwtrust.verify(token);
```

## Development

### Prerequisites

This project requires NodeJS (version 16 or later) and yarn.
[Node](http://nodejs.dan-online/) and [NPM](https://yarnpkg.com/) are really easy to install.
To make sure you have them available on your machine,
try running the following command.

```sh
$ yarn -v && node -v && rustc --version
3.3.0
v16.18.0
rustc 1.65.0
```

### Building the entire package

_Requirement: Rust is installed on your machine._

```sh
$ yarn build
```

This task will create a distribution version of the project
inside your local `dist/` folder and output a binary in `native/`

### Running benchmarks

```sh
$ yarn benchmark
```

## Contributing

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:

## Built With

- [Neon](https://neon-bindings.com/)
- VSCode
- TypeScript
- Rust

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/dan-online/jwtrust/tags).

## Authors

- **DanCodes** - [@dan-online](https://github.com/dan-online) - <dan@dancodes.online>

## License

[MIT License](https://dan-online.mit-license.org/2022) © DanCodes
