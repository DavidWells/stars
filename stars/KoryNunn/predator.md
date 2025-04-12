---
repo: KoryNunn/predator
url: 'https://github.com/KoryNunn/predator'
homepage: null
starredAt: '2025-04-07T20:19:34Z'
createdAt: '2013-08-07T06:47:08Z'
updatedAt: '2025-04-07T20:19:35Z'
language: JavaScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-04-12T22:30:06.885Z'
description: finds the exposed portion of an element
tags: []
---

# predator

Finds the exposed box, if there is one, of a child DOM element.

Useful if you want to check if an element is visible to the user, and how much of it.

## Usage

```shell
npm install predator
```

Then:

```js
var predator = require('predator');

var box = predator(someElement);

->

{
    top: offset from top of screen
    left: offset from left of screen
    right: right edge offset from left of screen
    bottom: bottom edge offset from top of screen
    height: height of the exposed region
    width: width of the exposed region
    hidden: true if the element is completely obscured from view
    original: the original result of child.getBoundingClientRect()
}
```

## Performance

`predator` should be fast enough to use in a render loop, even on mobile devices.
