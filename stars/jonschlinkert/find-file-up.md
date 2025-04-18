---
repo: jonschlinkert/find-file-up
url: 'https://github.com/jonschlinkert/find-file-up'
homepage: null
starredAt: '2016-12-25T06:51:14Z'
createdAt: '2015-11-28T02:56:23Z'
updatedAt: '2021-04-12T22:26:35Z'
language: JavaScript
license: MIT
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:50.146Z'
description: >-
  Find a file, starting with the given cwd and recursively searching up one
  directory until it's found (or we run out of directories). Async and sync.
tags:
  - file
  - find
  - find-up
  - find-up-sync
  - findup
  - glob
  - javascript
  - jonschlinkert
  - match
  - node
  - nodejs
  - resolve
---

# find-file-up [![NPM version](https://img.shields.io/npm/v/find-file-up.svg?style=flat)](https://www.npmjs.com/package/find-file-up) [![NPM monthly downloads](https://img.shields.io/npm/dm/find-file-up.svg?style=flat)](https://npmjs.org/package/find-file-up) [![NPM total downloads](https://img.shields.io/npm/dt/find-file-up.svg?style=flat)](https://npmjs.org/package/find-file-up) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/find-file-up.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/find-file-up)

> Find a file fast, by starting at the given cwd and recursing up one directory until the file is found or we run out of directories.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save find-file-up
```

## Usage

```js
const find = require('find-file-up');
```

## async

```js
find(filename, cwd, limit, callback);
```

**Example**

* `filename` **String** - (required) the name of the file to find.
* `cwd` **String** - (optional) the starting directory. This value can be prefixed with `~` to search from the user home directory.
* `limit` **Number** - (optional) limit the number of directories to recurse.
* `callback` **Functional** - (optional) A promise is returned when no callback is passed.

**Promise example**

```js
// use "~" to search user home
find('foo.txt', '~/a/b/c')
  .then(file => console.log(file)) //=> '/Users/jonschlinkert/foo.txt'
  .catch(console.error);
```

**With async-await**

```js
(async function() {
  const file = await find('foo.txt', '~/a/b/c');
  console.log(file);
  //=> '/Users/jonschlinkert/foo.txt'
})();
```

**Callback example**

```js
// find `foo.txt` starting at the given directory
find('foo.txt', 'a/b/c', function(err, file) {
  if (err) throw err;
  console.log(file);
  //=> /Users/jonschlinkert/dev/find-file-up/fixtures/foo.txt
});
```

### sync

```js
find.sync(filename, cwd, limit);
```

**Example**

* `filename` **String** - (required) the name of the file to find.
* `cwd` **String** - (optional) the starting directory.
* `limit` **Number** - (optional) limit the number of directories to recurse.

```js
const file = find.sync('foo.txt', 'a/b/c/');
```

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>

<details>
<summary><strong>Building docs</strong></summary>

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

</details>

### Related projects

You might also be interested in these projects:

* [find-pkg](https://www.npmjs.com/package/find-pkg): Find the first directory with a package.json, recursing up, starting with the given directory. Similar… [more](https://github.com/jonschlinkert/find-pkg) | [homepage](https://github.com/jonschlinkert/find-pkg "Find the first directory with a package.json, recursing up, starting with the given directory. Similar to look-up but does not support globs and only searches for package.json. Async and sync.")
* [findup-sync](https://www.npmjs.com/package/findup-sync): Find the first file matching a given pattern in the current directory or the nearest… [more](https://github.com/js-cli/node-findup-sync#readme) | [homepage](https://github.com/js-cli/node-findup-sync#readme "Find the first file matching a given pattern in the current directory or the nearest ancestor directory.")
* [global-modules](https://www.npmjs.com/package/global-modules): The directory used by npm for globally installed npm modules. | [homepage](https://github.com/jonschlinkert/global-modules "The directory used by npm for globally installed npm modules.")

### Contributors

| **Commits** | **Contributor** | 
| --- | --- |
| 26 | [jonschlinkert](https://github.com/jonschlinkert) |
| 1 | [pointnet](https://github.com/pointnet) |

### Author

**Jon Schlinkert**

* [LinkedIn Profile](https://linkedin.com/in/jonschlinkert)
* [GitHub Profile](https://github.com/jonschlinkert)
* [Twitter Profile](https://twitter.com/jonschlinkert)

### License

Copyright © 2018, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.6.0, on March 28, 2018._
