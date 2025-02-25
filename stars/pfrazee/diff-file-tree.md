---
repo: pfrazee/diff-file-tree
url: 'https://github.com/pfrazee/diff-file-tree'
homepage: null
starredAt: '2021-04-01T21:41:47Z'
createdAt: '2017-04-22T18:23:33Z'
updatedAt: '2024-11-07T19:58:32Z'
language: JavaScript
license: NA
branch: master
stars: 26
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:55.600Z'
description: 'Compare two file-trees, get a list of changes, then apply left or right'
tags: []
---

# diff-file-tree

Compare two file-trees, get a list of changes, then apply left or right.

```
npm install diff-file-tree
```

## Usage

```js
var dft = require('diff-file-tree')

var changes = await dft.diff('/home/alice/stuff', '/home/alice/things')
console.log(changes) /* => [
  {change: 'mod', type: 'file', path: '/hello.txt'},
  {change: 'add', type: 'dir',  path: '/pics'},
  {change: 'add', type: 'file', path: '/pics/kitty.png'},
  {change: 'del', type: 'file', path: '/backup/hello.txt'},
  {change: 'del', type: 'dir',  path: '/backup'},
  {change: 'del', type: 'file', path: '/hello.txt'},
]*/

// make 'things' a copy of 'stuff' 
await dft.applyRight('/home/alice/stuff', '/home/alice/things', changes)
// -or-
// make 'stuff' a copy of 'things'
await dft.applyLeft('/home/alice/stuff', '/home/alice/things', changes)
```

## Known issues

Files with equal size and mtimes will show as equal, even if their content is different. This is caused by an optimization which can sometimes give false positives.

## API

#### `var changes = await dft.diff(left, right[, opts])`

Get the differences between `left` and `right`.

Options include:

```js
{
  filter: null // optional function to ignore files (function (path) => bool)
  shallow: false // dont recurse into folders that need to be added or removed
  sizeLimit: {
    maxSize: undefined // max number of bytes before comparison aborts
    assumeEq: false // assume == (true) or assume != (false)
  }
  compareContent: false // set to true to compare by content instead of mtime & size
  compareContentCache: undefined // provide an object to cache file equality tests in memory
}
```

If you are using a custom fs module (like [graceful-fs](https://github.com/isaacs/node-graceful-fs) or [hyperdrive](https://github.com/mafintosh/hyperdrive)) you can pass that in with the left or right like this:

```js
dft.diff({path: '/Users/alice/stuff', fs: customFs}, {path: '/', fs: hyperdriveArchive})
```

#### `await dft.applyRight(left, right, changes)`

Make `right` equivalent to `left` using the given `changes`. Both `left` and `right` can be an object with custom `{path:, fs:}` as with `diff()`.

#### `await dft.applyLeft(left, right, changes)`

Make `left` equivalent to `right` using the given `changes`. Both `left` and `right` can be an object with custom `{path:, fs:}` as with `diff()`.

#### `dft.applyRightStream(left, right, changes)`

Make `right` equivalent to `left` using the given `changes`. Both `left` and `right` can be an object with custom `{path:, fs:}` as with `diff()`.

Returns a stream which emits each operation as `{op: String, path: String}`. You can cancel the merge-operation by destroying the stream.
