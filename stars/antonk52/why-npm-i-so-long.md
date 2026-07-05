---
repo: antonk52/why-npm-i-so-long
url: 'https://github.com/antonk52/why-npm-i-so-long'
homepage: 'https://npm.im/why-npm-i-so-long'
starredAt: '2020-01-21T05:14:48Z'
createdAt: '2020-01-08T22:57:24Z'
updatedAt: '2024-12-21T20:07:29Z'
language: JavaScript
license: NA
branch: master
stars: 224
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:07.504Z'
description: Checks project's dependencies size AKA why npm install so long
tags:
  - dependencies
  - javascript
  - npm
---

# why-npm-i-so-long

<p align="center"><img src="https://user-images.githubusercontent.com/5817809/72022944-b5798a00-3282-11ea-8d15-d38b6bb9929e.png" width="500" alt="illustration of a person asking why npm install take so long?"></p>

Little utility to ease troubleshooting why installing npm dependencies takes too long.

## What is "publish size" vs "install size"?

The "publish size" is the size of the source code published to npm. This number is easy to detect and should be pretty small.

The "install size" is the size your hard drive will report after running npm install. This includes the package, all of the dependencies, and its dependency's dependencies...and so on.

## Use without installing

```sh
npx why-npm-i-so-long path/to/package.json
```

## Installation

```sh
npm install --global why-npm-i-so-long
```

## Usage

See install size of dependencies
```sh
why-npm-i-so-long path/to/package.json
```
See install size of devDependencies
```sh
why-npm-i-so-long path/to/package.json --dev
```

## Acknowledgments

- [packagephobia](https://github.com/styfle/packagephobia)
