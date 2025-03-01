---
repo: WebReflection/codedent
url: 'https://github.com/WebReflection/codedent'
homepage: null
starredAt: '2025-02-27T01:47:39Z'
createdAt: '2023-09-05T12:30:27Z'
updatedAt: '2025-02-27T01:47:39Z'
language: JavaScript
license: NA
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-03-01T22:29:46.968Z'
description: A dedent alternative for just code.
tags: []
---

# codedent

[![build status](https://github.com/WebReflection/codedent/actions/workflows/node.js.yml/badge.svg)](https://github.com/WebReflection/codedent/actions) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/codedent/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/codedent?branch=main)


Usable both as template literal tag or just as callback for strings, removes all spaces found at the very first line of code encountered while sanitizing, keeping everything else around.

```js
import dedent from 'codedent';

dedent`
  def this_is_fine():
    return "fine"
`;

/**
def this_is_fine():
  return "fine"
*/
```

Differently from [dedent module](https://github.com/dmnd/dedent), this one doesn't care about code starting in one line then indented in others ... it's just code as you pass it along, no magic involved.
