---
repo: estrattonbailey/w2t
url: 'https://github.com/estrattonbailey/w2t'
homepage: null
starredAt: '2023-11-25T20:27:46Z'
createdAt: '2018-05-20T18:09:48Z'
updatedAt: '2023-12-08T07:11:04Z'
language: TypeScript
license: NA
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:43.572Z'
description: Tiny asynchronous action timer.
tags: []
---

# w2t
Tiny asynchronous action timer. **150 bytes gzipped.**

### Install
```
npm i w2t --save
```

### What is this?
Sometimes UI actions feel more human if we delay them instead of allowing them to
be completed at computer time. `w2t` allows you to specify actions and a *minimum*
time for them to be completed before the `Promise` is resolved.

If your specified action(s) take longer than the minimum, `w2t` will wait for
all actions to complete before resolving.

# Usage
`w2t` is a thin wrapper around `Promise.all`, so the API is essentially the
same: resolved values are returned on an array, with order preserved.

Below, `w2t` will resolve `foo` and `baz`, but wait 500 ms before returning.
```javascript
import wait from 'w2t'

const foo = async () => 'bar'
const baz = async () => 'qux'

wait(500, [ foo, baz ]).then(([ resolvedFoo, resolvedBaz ]) => {
  console.log(resolvedFoo, resolveBaz) // 'bar qux'
})
```

If no actions are provided, `w2t` becomes useful as a "sleep" function.
```javascript
// do something

await wait(600)

// do something 600ms later
```

# Changelog
- `v2.0.0` - Typescript rewrite, add tests
- `v1.0.0` - initial release

### License
MIT License © [Eric Bailey](https://estrattonbailey.com)
