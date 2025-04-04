---
repo: NathanPB/progress.js
url: 'https://github.com/NathanPB/progress.js'
homepage: 'https://progress.nathanpb.dev'
starredAt: '2022-01-06T01:56:38Z'
createdAt: '2021-11-18T05:14:12Z'
updatedAt: '2025-01-03T23:20:57Z'
language: TypeScript
license: MIT
branch: main
stars: 88
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:23.203Z'
description: Library for creating highly customizable CLI-like progress bars in javascript
tags:
  - dependency-free
  - nodejs
  - progress
  - solid
---

[![npm version](https://img.shields.io/npm/v/@nathanpb/progress.svg)](https://www.npmjs.com/package/@nathanpb/progress)
[![Tests Status](https://github.com/NathanPB/progress.js/workflows/Test/badge.svg)](https://github.com/NathanPB/progress.js/actions/workflows/tests.yml)
[![Coverage Status](https://img.shields.io/coveralls/NathanPB/progress.js.svg)](https://coveralls.io/github/NathanPB/progress.js?branch=main)


Simple highly customized CLI-like progress bar for Javascript

**If you get any questions or suggestions just open a [discussion](https://github.com/NathanPB/progress.js/discussions) or an [issue](https://github.com/NathanPB/progress.js/issues)**

## Installation

This package is published in [npmjs](https://www.npmjs.com/package/@nathanpb/progress):

``npm i @nathanpb/progress`` or ``yarn add @nathanpb/progress``

If you want to try the unstable features, use the ``next`` tag: ``npm i @nathanpb/progress@next``.


## Basic example

```ts
import { initSimpleBar, ProgressBar, Tokens } from '@nathanpb/progress'

const bar = new ProgressBar({ total: 100 })
initSimpleBar({ 
  bar,
  template: '[$bar$] $progress$% | eta $eta$ s | elapsed $elapsed$ s',
  stream: process.stdout,
  tokens: {
    bar: Tokens.bar({ length: 30 }),
    eta: Tokens.eta({ interval: 1000 }),
    elapsed: Tokens.elapsedTime({ interval: 1000 }),
    progress: Tokens.progress({ decimalDigits: 2 })
  }
})

bar.on(Events.COMPLETED, () => console.log('Bar completed'))

setInterval(() => bar.tick(1), 500)
```
![](https://i.imgur.com/m8u1gFX.gif)

You can also group multiple progress bars:

```ts
initMultiBar({
  bars: [bar1, bar2, bar3],
  template: '$title$ [$bar$] $progress$% | eta $eta$ s | elapsed $elapsed$ s',
  tokens: {
    bar: Tokens.bar({ length: 30 }),
    eta: Tokens.eta({ interval: 1000 }),
    elapsed: Tokens.elapsedTime({ interval: 1000 }),
    progress: Tokens.progress({ decimalDigits: 2 }),
    title: Tokens.title()
  },
  stream: process.stdout
})
```

The above code is a shortcut to the full version.
If you want to take control over the customization, check the [Under the Hood page](https://progress.nathanpb.dev/#/under-the-hood).


Also, check the [examples page](https://progress.nathanpb.dev/#/examples).

## Downsides

Compared to other similar libraries (special thanks to [node-progress](https://github.com/visionmedia/node-progress) which was my inspiration), this lib is a bit **overcomplicated**. So if you want something dead simple, their solution might suit better for your use case.


## License

```
Copyright 2021 Nathan P. Bombana

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```

Do whatever you want with my code just don't make it boring
