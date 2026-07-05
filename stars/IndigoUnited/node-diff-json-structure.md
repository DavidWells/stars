---
repo: IndigoUnited/node-diff-json-structure
url: 'https://github.com/IndigoUnited/node-diff-json-structure'
homepage: null
starredAt: '2016-11-21T23:41:32Z'
createdAt: '2015-12-29T21:44:30Z'
updatedAt: '2023-04-17T16:13:55Z'
language: JavaScript
license: MIT
branch: master
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:15.572Z'
description: Get the structural diff of two JSON objects
tags: []
---

# diff-json-structure

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url] [![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]


[npm-url]:https://npmjs.org/package/diff-json-structure
[downloads-image]:http://img.shields.io/npm/dm/diff-json-structure.svg
[npm-image]:http://img.shields.io/npm/v/diff-json-structure.svg
[travis-url]:https://travis-ci.org/IndigoUnited/node-diff-json-structure
[travis-image]:http://img.shields.io/travis/IndigoUnited/node-diff-json-structure/master.svg
[david-dm-url]:https://david-dm.org/IndigoUnited/node-diff-json-structure
[david-dm-image]:https://img.shields.io/david/IndigoUnited/node-diff-json-structure.svg
[david-dm-dev-url]:https://david-dm.org/IndigoUnited/node-diff-json-structure?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/IndigoUnited/node-diff-json-structure.svg
[greenkeeper-image]:https://badges.greenkeeper.io/IndigoUnited/node-diff-json-structure.svg
[greenkeeper-url]:https://greenkeeper.io/

Get the structural diff of two JSON objects, using [diff](https://www.npmjs.com/package/diff)'s internally which is a module used by several test frameworks.


It is considered a structural difference whenever:

  - items are added or removed to objects and arrays
  - the type of the item changes


## Installation

`$ npm install diff-json-structure`


## Usage

`diff(oldObj, newObj, [options])`

Calculates the structural diff between `oldObj` and `newObj`, returning an array of parts.

Available options:

- typeMapper - A function that lets you override types for specific paths
- .. and any option that [diff](https://www.npmjs.com/package/diff)'s `.diffJson()` method supports


### Examples

Simple usage:

```js
var diff = require('diff-json-structure');
var chalk = require('chalk');

// Utility function to visually print the diff
// Tweak it at your own taste
function printDiff(parts) {
    parts.forEach(function (part) {
        part.value
        .split('\n')
        .filter(function (line) { return !!line; })
        .forEach(function (line) {
            if (part.added) {
                process.stdout.write(chalk.green('+  ' + line) + '\n');
            } else if (part.removed) {
                process.stdout.write(chalk.red('-  ' + line) + '\n');
            } else {
                process.stdout.write(chalk.dim('   ' + line) + '\n');
            }
        });
    });

    process.stdout.write('\n');
}

var oldObject = {
    environment: 'dev',
    googleAppId: 'UA-3234432-22',
    socialProviders: ['facebook'],
    libraries: {
        jquery: './node_modules/jquery',
    },
};

var newObj = {
    environment: 'prod',
    dbHost: '127.0.0.1:9000',
    socialProviders: ['facebook', 'twitter'],
    libraries: {
        jquery: './node_modules/jquery/jquery',
        moment: './node_modules/moment/moment',
    },
};

printDiff(diff(oldObj, newObj));
```

<img src="./doc/basic.png" width="300">


Usage with `options.typeMapper` to ignore differences of socialProvider items of the previous example:

```js
printDiff(diff(oldObj, newObj, {
    typeMapper: function (path, value, prop, subject) {
        // path is a string that contains the full path to this value
        // e.g.: 'libraries.jquery' and 'socialProviders[0]'

        // You may return custom types here.. if nothing is returned, the normal
        // flow of identifying the structure recursively will continue
        if (path === 'socialProviders') {
            return 'array';
        }
    },
}));
```

<img src="./doc/mapper.png" width="300">


## Tests

`$ npm test`


## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
