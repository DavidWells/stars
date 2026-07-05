---
repo: alphanull/jsdoc-plugin-esnext
url: 'https://github.com/alphanull/jsdoc-plugin-esnext'
homepage: ''
starredAt: '2025-08-07T18:48:52Z'
createdAt: '2025-07-06T12:29:11Z'
updatedAt: '2025-08-10T19:11:19Z'
language: JavaScript
license: MIT
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-08-23T22:30:26.767Z'
description: >-
  JSDoc plugin that adds full ES2022+ class-feature support – private fields,
  static members, arrow-bound methods, as well as ES6 default export fixes.
tags:
  - esnext
  - jsdoc
  - jsdoc-plugin
---

![License](https://img.shields.io/github/license/alphanull/jsdoc-plugin-esnext)
![Version](https://img.shields.io/npm/v/@alphanull/jsdoc-plugin-esnext)

# JSDoc ESNext Plugin

**JSDoc plugin that adds full ES2022+ class-feature support – private fields, static members, arrow-bound methods, as well as ES6 default export fixes.**

Modern JavaScript syntax isn’t always accurately recognized by JSDoc. This plugin enables accurate recognition of modern ECMAScript class structures and enhances the resulting documentation.

## Features

* Restores accurate naming for native `#privateFields` and `#methods()`.
* Automatically tags private members with `@private`.
* Detects `static` class members and applies `@static` and `scope: static`.
* Treats arrow-bound methods as `@function`.
* Detects assignments like `this.#foo = ...` in constructors.
* **Fixes various ES6 default export issues** - corrects wrong names and structures for exported classes, functions, object literals, and their members.
* Works seamlessly with JSDoc's default parser.
* Works with all themes (but see note below!).
* Perfectly integrates with [VisionTheme](https://github.com/alphanull/jsdoc-vision-theme) for a modern UI (optional).
* Tested with JSDoc 3.6.11 and 4.0.4.

## Installation

```bash
npm install --save-dev @alphanull/jsdoc-plugin-esnext
```

Then, add the plugin to your JSDoc configuration file:

```json
{
    "plugins": [
        "@alphanull/jsdoc-plugin-esnext"
    ]
}
```

## ES2022 Example

```js
export default class Example {

    /**
     * Static counter
     * @type {number}
     */
    static counter = 0;

    /**
     * Private field
     * @type {string}
     */
    static #secret = 'abc';

    /**
     * Bound handler
     * @function
     */
    #handleClick = () => {
        console.log('clicked');
    }

    constructor() {
        this.#local = 123;
    }

    /**
     * Private method
     */
    #compute() {
        return true;
    }
}
```

### Resulting Documentation

| ![before](assets/private-before.jpg) | ![after](assets/private-after.jpg) |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|                      **Without plugin**                      |                **Using jsdoc-plugin-esnext**                 |

* `counter` appears with `@static` and type.
* `#secret` is listed as `private static`.
* `#handleClick` is listed as a private function.
* `#compute()` is listed as a private method.

## Exports Example

```js
/**
 * Exported as default class.
 */
export default class FooClass {
    /**
     * FooClass constructor.
     * @param {string} message - Additional message.
     */
    constructor(message) { }
    /**
     * This is a class method.
     * @param {any} someArg - An arg you need to pass.
     */
    classMethod(someArg) {
    this.fooAClassMethod(this.message);
    }
}
```

### Resulting Documentation

| ![before](assets/exports-before.jpg) | ![after](assets/exports-after.jpg) |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
|                      **Without plugin**                      |                **Using jsdoc-plugin-esnext**                 |

* `FooClass` is named correctly (not `exports`).
* Class members (constructor, properties, methods) are correctly linked to their parent class and do not appear in `Global`.

## Limitations

While there are no limitations with this plugin per se, for private members (which start with "#")  there can be resulting hash links containing two hashes, like: `<a href="##privateMember">#privateMember</a>` which can lead to broken links. Unfortunately, this cannot be handled by the plugin itself and needs to be managed by the theme.

The good news is that documenting modern code typically requires a modern theme anyway. Consider using the brand-new [JSDoc VisionTheme](https://github.com/alphanull/jsdoc-vision-theme), which addresses this issue and is fully tested and optimized for compatibility with this plugin.

## License

[MIT License](https://opensource.org/license/MIT)

Copyright © 2025–present Frank Kudermann @ [alphanull.de](https://alphanull.de)
