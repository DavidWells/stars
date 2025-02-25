---
repo: gunar/go-for-it
url: 'https://github.com/gunar/go-for-it'
homepage: >-
  https://medium.com/@gunar/async-control-flow-without-exceptions-nor-monads-b19af2acc553
starredAt: '2019-04-22T18:22:03Z'
createdAt: '2017-10-12T21:05:02Z'
updatedAt: '2023-08-21T21:49:22Z'
language: JavaScript
license: NA
branch: master
stars: 16
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:39.923Z'
description: Error-handling à la golang.
tags: []
---

# go-for-it

[![CircleCI](https://circleci.com/gh/gunar/go-for-it.svg?style=svg)](https://circleci.com/gh/gunar/go-for-it)

Error handling à la golang.

Read the blog post:
> [Async Control Flow without Exceptions nor Monads](https://medium.com/@gunar/async-control-flow-without-exceptions-nor-monads-b19af2acc553)


## Installation
```
npm install go-for-it
```

## Example

```js
const go = require('go-for-it')

const toUpper = async string => {
  if (string === 'invalid') throw Error('Invalid input')
  return string.toUpperCase()
}
const errorHandler = () => { console.log('There has been an error. I\'ll handle it.') }
const print = console.log

const foo = async input => {
  const [err, value] = await go(toUpper(input))
  if (err) return errorHandler(err)
  print(value)
}

// Works normally.
foo('gunar')
// "GUNAR"

// Business Logic Error gets handled by errorHandler().
foo('invalid')
// "There has been an error. I'll handle it."

// Runtime Exceptions DO NOT get handled by errorHandler(),
foo(555555).catch(e => {
  // but can be caught.
  console.log(e)
  // TypeError: string.toUpperCase is not a function
})
```

## License

MIT [http://gunar.mit-license.org]()
