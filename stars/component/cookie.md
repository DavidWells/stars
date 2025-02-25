---
repo: component/cookie
url: 'https://github.com/component/cookie'
homepage: null
starredAt: '2017-07-19T15:24:38Z'
createdAt: '2012-09-05T21:54:33Z'
updatedAt: '2023-08-16T11:59:58Z'
language: JavaScript
license: NA
branch: master
stars: 69
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:43.572Z'
description: Cookie component
tags: []
---

# cookie

  Cookie component.

## Installation

    $ component install component/cookie

## Example

```js
// set
cookie('name', 'tobi')
cookie('name', 'tobi', { path: '/' })
cookie('name', 'tobi', { maxage: 60000 }) // in milliseconds
cookie('species', 'ferret')

// get
var name = cookie('name')
// => "tobi"

var cookies = cookie()
// => { name: "tobi", species: "ferret" }

// clear
cookie('name', null)
```

## License

  MIT
