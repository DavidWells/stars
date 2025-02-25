---
repo: sindresorhus/one-thing
url: 'https://github.com/sindresorhus/one-thing'
homepage: 'https://sindresorhus.com/one-thing'
starredAt: '2022-01-21T05:18:57Z'
createdAt: '2022-01-16T09:19:52Z'
updatedAt: '2025-02-17T07:42:51Z'
language: JavaScript
license: MIT
branch: main
stars: 141
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:19.428Z'
description: Set the text for the One Thing app
tags:
  - cli-app
  - command-line-tool
  - macos
  - nodejs
  - npm-package
  - one-thing
---

# one-thing

> Set the text for the [One Thing](https://sindresorhus.com/one-thing) app

<img src="screenshot.jpg" width="503">

**Requires [Node.js 12](https://nodejs.org) and the [One Thing](https://sindresorhus.com/one-thing) app to be installed.**

## CLI

```sh
npm install --global one-thing
```

```
$ one-thing --help

  Usage
    $ one-thing <text>
    $ one-thing --get

  Example
    $ one-thing 'Prepare for important meeting'
```

## API

```sh
npm install one-thing
```

```js
import oneThing, {getOneThing} from 'one-thing';

await oneThing('Prepare for important meeting');

console.log(await getOneThing());
//=> 'Prepare for important meeting'
```
