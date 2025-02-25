---
repo: mafintosh/npm-auto
url: 'https://github.com/mafintosh/npm-auto'
homepage: null
starredAt: '2020-10-10T04:12:23Z'
createdAt: '2020-10-06T13:19:33Z'
updatedAt: '2025-02-11T15:51:13Z'
language: JavaScript
license: MIT
branch: master
stars: 48
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:27.900Z'
description: >-
  Auto installs npm dependencies from the script you want to run and runs the
  script
tags: []
---

# npm-auto

Auto installs npm dependencies from the script you want to run and runs the script

```
npm install npm-auto
```

## Usage

First install npm-auto

``` sh
npm install -g npm-auto
```

Then make a script that uses some dependencies

``` js
const hypercore = require('hypercore')
console.log('hypercore is', hypercore)
```

Then simply run the script with `npm-auto`.
It will `npm install` any deps used by the script if they are not resolvable already.

``` sh
npm-auto my-script.js
```

No more manual npm installs for gists!

## License

MIT
