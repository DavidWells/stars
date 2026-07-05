---
repo: TehShrike/is-mergeable-object
url: 'https://github.com/TehShrike/is-mergeable-object'
homepage: null
starredAt: '2019-06-28T16:31:20Z'
createdAt: '2017-05-22T20:06:04Z'
updatedAt: '2023-03-26T13:40:57Z'
language: JavaScript
license: NA
branch: master
stars: 12
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:32.664Z'
description: null
tags: []
---

# is-mergeable-object

<!--js
const isMergeableObject = require('./')
-->

The biggest difficulty deep merge libraries run into is figuring out which properties of an object should be recursively iterated over.

This module contains the algorithm used by [`deepmerge`](https://github.com/KyleAMathews/deepmerge/).

<!--js
const someReactElement = {
	$$typeof: Symbol.for('react.element')
}
-->

```js
isMergeableObject(null) // => false

isMergeableObject({}) // => true

isMergeableObject(new RegExp('wat')) // => false

isMergeableObject(undefined) // => false

isMergeableObject(new Object()) // => true

isMergeableObject(new Date()) // => false

isMergeableObject(someReactElement) // => false
```
