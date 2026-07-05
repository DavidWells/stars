---
repo: yashag/jsdoctor
url: 'https://github.com/yashag/jsdoctor'
homepage: null
starredAt: '2021-11-14T04:13:07Z'
createdAt: '2017-10-03T13:08:09Z'
updatedAt: '2022-06-12T14:20:38Z'
language: JavaScript
license: MIT
branch: master
stars: 3
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:38.427Z'
description: A smart jsdoc generator
tags:
  - code-parser
  - comments
  - generated
  - jsdoc
  - jsdoc-comments
---

JSDoctor
========

<p align="center">
  <img alt="jsdoctor" src="https://raw.githubusercontent.com/yashag/jsdoctor/master/assets/images/JSDoctor%20-%20main.png" width="500">
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/jsdoctor"><img alt="NPM Version" src="https://img.shields.io/npm/v/jsdoctor.svg?style=flat"></a>
  <a href="https://www.npmjs.org/package/jsdoctor"><img alt="NPM downloads" src="https://img.shields.io/npm/dt/jsdoctor.svg?style=flat"></a>
  <a href="https://david-dm.org/yashag/jsdoctor"><img alt="Dependency status" src="https://david-dm.org/yashag/jsdoctor.svg?style=flat"></a>
  <a href="https://github.com/yashag/jsdoctor/blob/master/LICENSE"><img src="https://img.shields.io/github/license/yashag/jsdoctor.svg"></a>
</p>

> A smart jsdoc generator

## Why should I heal my code?
Well, it's not like your code is sick or broken or anything of the sort. It's just that documenting it might be a real pain and it is something we want to waste as little time on as possible. Wouldn't it be better if we had a magical tool, that can:

* infer data types
* write jsdoc comments
* update jsdoc comments
* perform more behind the scenes jsdoc operations

JSDoctor is definitely  not there yet, but the idea is to continue developing and improving it. So far it is capible of basic type inferences and basic documentation. So if you would like to write as less as possible, JSDoctor is a great solution for you even at this stage of development!

## Install
Install with [npm](https://www.npmjs.com/package/jsdoctor):

```sh
$ npm install --save jsdoctor
```

OR

```sh
$ npm install -g jsdoctor
```

## Usage

### Programmatically 
```js
const jsdoctor = require('jsdoctor');

jsdoctor('./lib/path/**/*.js').then(result => {
  console.log(result.status); // success
});
```

### Cli
```sh
$ jsdoctor "./lib/path/**/*.js" -w
```

## API
------

### Programmatically 
`jsdoctor(path, [options])`

#### Params:
* path - Either a `filepath` or a `glob`
* options (optional) - An `object` that may include the following properties:

| Option | Deafult | Description |
| ------ | ------- | ----------- |
| overrideComments | `false` | Whether JSDoctor should override existing comments or leave them be |
| watch | `false` | Whether JSDoctor should launch in watch mode (persistent) |

_Note_: The **overrideComments** option is very unrecommended as you can accidentally write over existing documentation you want to keep

#### Returns:

JSDoctor returns a promise but the value within that promise depends on the options provided.
Usually:

```js
jsdoctor(path).then(result => {
  console.log(result.status); // Either "success" or "failure"
  if (result.status === "failure") {
    console.log(result.error); // If doctoring was unsuccessful, the result will contain an error
  }
});
```

If the **watch** option is provided:

```js
jsdoctor(path,  {watch: true}).then(monitor => {
  console.log(monitor.files); // The monitored files
  monitor.killPatient(); // Stops files monitorig
  monitor.watchPatient(); // Start files monitoring again
});
```

### Cli
`jsdoctor <path> [options]`

* path - Either a `filepath` or a `glob`
* options (optional) - Additional `flag`s that change the functionality in the following ways:

| Option | Short | Description |
| ------ | ------- | ----------- |
| --overrideComments | -o | Whether JSDoctor should override existing comments or leave them be |
| --watch | -w | Whether JSDoctor should launch in watch mode (persistent) |

_Note_: The **overrideComments** flag is very unrecommended as you can accidentally write over existing documentation you want to keep

## Examples

#### Class
From this:

```js
class Point {

  constructor(x, y) {
      this.coordinates = {x, y};
  }

  toString() {
    return "(1,2)";
  }
}
```

To this:

```js
/**
 * A Point implementation
 */
class Point {

  /**
    * Creates a Point
    * @constructor
    * @param {*} x
    * @param {*} y
    */
  constructor(x, y) {
      this.coordinates = {x, y};
  }

  /**
   * @returns {string}
   */
  toString() {
    return "(1,2)";
  }
}
```

#### Function
From this:

```js
function diff(a, b = 1, opposite = false) {
    if (!a) throw new Error("The first argument wasn't provided");
    if (opposite) return b - a;
    return a - b;
}
```

To this:

```js
/**
 * @param {*} a
 * @param {number} b
 * @param {boolean} opposite
 * @returns {*}
 * @throws {Error} The first argument wasn't provided
 */
function diff(a, b = 1, opposite = false) {
    if (!a) throw new Error("The first argument wasn't provided");
    if (opposite) return b - a;
    return a - b;
}
```

#### Property
From this:

```js
get X() {
    return this.coordinates.x;
}

set X(x) {
    this.coordinates.x = x;
}
```

To this:

```js
/**
  * Get the value of the X property
  * @type {*}
  */
get X() {
    return this.coordinates.x;
}

/**
  * Set the value of the X property
  * @type {*}
  */
set X(x) {
    this.coordinates.x = x;
}
```

## Bugs

Please look at the [CONTRIBUTING.md](https://github.com/yashag/jsdoctor/blob/master/CONTRIBUTING.md) **Issues** section and if you are certain the package has a bug or something of the sort, please file it here https://github.com/yashag/jsdoctor/issues

## Contributing

All contributions are very welcome and encouraged!
Please look at the [CONTRIBUTING.md](https://github.com/yashag/jsdoctor/blob/master/CONTRIBUTING.md)

## TODO

There is still a lot of work, so every helping hand and suggestion is welcome! :)
The following assignments are among the most important for future releases:

* fix test failure when the result folder is empty
* improve the watch option test (replace setTimeout)
* replace file rewriting with file modification when inserting comments
* Improve type infence
* Add more options (like tags filtering)
* Add more tests (and possibly coverage statistics)
* Support more jsdoc tags

## Credits

The following libraries had a major influence on the project and I would like to thank their contributors:

* [esprima](https://github.com/jquery/esprima) - For code parsing

## License

Copyright © 2017 Yasha Gootkin

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
