---
repo: mafintosh/debugment
url: 'https://github.com/mafintosh/debugment'
homepage: null
starredAt: '2019-06-25T18:43:14Z'
createdAt: '2019-06-25T11:36:36Z'
updatedAt: '2025-01-21T18:36:27Z'
language: JavaScript
license: MIT
branch: master
stars: 93
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:34.309Z'
description: A debug comment -> debugment
tags: []
---

# debugment

Embed debug code inside a `// @debug` comment that can be toggled from the command line

```
npm install debugment
```

A debug comment -> debugment

## Usage

Simply add debugging code to your program through comments

``` js
hello()

function hello () {
  // @debug console.log('calling hello')
  return 42
}
```

When running your program these are simply ... comments, but
they can be enabled by adding the debugment module.

```sh
npm install debugment
node -r debugment example.js // will now print 'calling hello'
```

The module includes a little CLI helper that does the above for you as well

```sh
npm install -g debugment
debugment example.js # same as node -r debugment example.js
```

## License

MIT
