---
repo: DavidWells/safe-await
url: 'https://github.com/DavidWells/safe-await'
homepage: ''
starredAt: '2021-01-27T23:15:17Z'
createdAt: '2019-07-07T18:07:43Z'
updatedAt: '2025-01-16T21:10:03Z'
language: JavaScript
license: NA
branch: master
stars: 205
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:04.791Z'
description: Safely use async await without all the try/catch blocks
tags: []
---

# Safe Await

Safely use async/await without all the try catch blocks

- `[error, data]` promise signatures
- Throws on [native errors](https://bit.ly/2VsoCGE)

## Usage

```js
const safeAwait = require('safe-await')

async function fooBar() {
  const [error, data] = await safeAwait(promiseOne())

  if (error) {
    // handle error, retry, ignore, whatever
  }

  console.log(data)
}
```

See [usage](./usage.js) and [tests](./tests) for more examples.

## Research

- [gist](https://gist.github.com/DavidWells/54f9dd1af4a489e5f1358f33ce59e8ad)
- https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/
- http://jessewarden.com/2017/11/easier-error-handling-using-asyncawait.html
- https://medium.freecodecamp.org/avoiding-the-async-await-hell-c77a0fb71c4c
- https://medium.com/@dominic.mayers/async-await-without-promises-725e15e1b639
- https://medium.com/@dominic.mayers/on-one-hand-the-async-await-framework-avoid-the-use-of-callbacks-to-define-the-main-flow-in-812317d19285
- https://dev.to/sadarshannaiynar/capture-error-and-data-in-async-await-without-try-catch-1no2
- https://medium.com/@pyrolistical/the-hard-error-handling-case-made-easy-with-async-await-597fd4b908b1
- https://gist.github.com/woudsma/fe8598b1f41453208f0661f90ecdb98b

## Other libraries

- https://github.com/onderonur/go-try
- https://github.com/craigmichaelmartin/fawait
- https://github.com/gunar/go-for-it
- https://github.com/majgis/catchify
- https://github.com/scopsy/await-to-js
- https://github.com/KyleRoss/await-handler
- https://github.com/open-draft/until

## Other handy error utils

- https://github.com/vitalets/throw-utils
