---
repo: ryanflorence/react-magic-move
url: 'https://github.com/ryanflorence/react-magic-move'
homepage: null
starredAt: '2015-03-10T17:46:15Z'
createdAt: '2014-11-25T15:53:20Z'
updatedAt: '2024-09-11T06:51:08Z'
language: JavaScript
license: MIT
branch: master
stars: 445
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:50.205Z'
description: null
tags: []
---

React Magic Move
================

Magic Move for React.JS

NOT A PRODUCTION MODULE
-----------------------

This was just a fun experiment, with some love, it could definitely be a real
thing, but I don't have time. I will merge pull requests to keep it working,
but I don't maintain this right now.

Usage
-----

1. Wrap some ordered elements in `<MagicMove/>`
2. Add a key to each element
3. Add some CSS transitions and border-box sizing (so the code can
   measure it more easily)

```css
.Something {
  transition: all 500ms ease;
  box-sizing: border-box;
}
```

```js
<MagicMove>
  {this.sortedElementsWithKeys(this.state.sortBy)}
</MagicMove>
```

