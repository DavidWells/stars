---
repo: npm/fstream-ignore
url: 'https://github.com/npm/fstream-ignore'
homepage: ''
starredAt: '2017-04-03T23:04:15Z'
createdAt: '2012-03-22T05:32:43Z'
updatedAt: '2023-09-08T16:32:43Z'
language: JavaScript
license: ISC
branch: master
stars: 37
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:45.944Z'
description: null
tags: []
---

# fstream-ignore

A fstream DirReader that filters out files that match globs in `.ignore`
files throughout the tree, like how git ignores files based on a
`.gitignore` file.

Here's an example:

```javascript
var Ignore = require("fstream-ignore")
Ignore({ path: __dirname
       , ignoreFiles: [".ignore", ".gitignore"]
       })
  .on("child", function (c) {
    console.error(c.path.substr(c.root.path.length + 1))
  })
  .pipe(tar.Pack())
  .pipe(fs.createWriteStream("foo.tar"))
```

This will tar up the files in __dirname into `foo.tar`, ignoring
anything matched by the globs in any .iginore or .gitignore file.
