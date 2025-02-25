---
repo: IndigoUnited/js-deep-filter
url: 'https://github.com/IndigoUnited/js-deep-filter'
homepage: null
starredAt: '2016-11-21T23:38:41Z'
createdAt: '2015-01-11T21:59:08Z'
updatedAt: '2022-10-23T16:50:53Z'
language: JavaScript
license: MIT
branch: master
stars: 17
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:15.729Z'
description: Recursively filters collections (arrays and objects)
tags: []
---

# deep-filter

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency status][david-dm-image]][david-dm-url] [![Dev Dependency status][david-dm-dev-image]][david-dm-dev-url] [![Greenkeeper badge][greenkeeper-image]][greenkeeper-url]

[npm-url]:https://npmjs.org/package/deep-filter
[downloads-image]:http://img.shields.io/npm/dm/deep-filter.svg
[npm-image]:http://img.shields.io/npm/v/deep-filter.svg
[travis-url]:https://travis-ci.org/IndigoUnited/js-deep-filter
[travis-image]:http://img.shields.io/travis/IndigoUnited/js-deep-filter/master.svg
[david-dm-url]:https://david-dm.org/IndigoUnited/js-deep-filter
[david-dm-image]:https://img.shields.io/david/IndigoUnited/js-deep-filter.svg
[david-dm-dev-url]:https://david-dm.org/IndigoUnited/js-deep-filter?type=dev
[david-dm-dev-image]:https://img.shields.io/david/dev/IndigoUnited/js-deep-filter.svg
[greenkeeper-image]:https://badges.greenkeeper.io/IndigoUnited/node-p-throttler.svg
[greenkeeper-url]:https://greenkeeper.io/

Recursively filters collections (arrays and objects).


## Installation

`$ npm install deep-filter` - `NPM`   
`$ bower install deep-filter` - `bower`

The browser file is named `index.umd.js` which supports CommonJS, AMD and globals (`deepFilter`).
If you want to run this module on old browsers, you must include [es5-shim](https://github.com/es-shims/es5-shim).


## Usage

Examples bellow are based on `nodejs`.

```js
// Example 1 - Remove all strings equal to 'foo'
var deepfilter = require('deep-filter');

deepfilter({
    prop1: 'foo',
    prop2: ['foo', 'bar'],
    prop3: ['foo', 'foo'],
    prop4: {
        prop5: 'foo',
        prop6: 'bar'
    }
}, function (value, prop, subject) {
    // prop is an array index or an object key
    // subject is either an array or an object
    return value !== 'foo';
});

/*
{
    prop2: [ 'bar' ],
    prop3: [],
    prop4: {
        prop6: 'bar'
    }
}
 */

// Example 2 - Filter empty values
var deepfilter = require('deep-filter');

function notEmpty(value, prop, subject) {
    var key;

    if (Array.isArray(value)) {
        return value.length > 0;
    } else if (!!value && typeof value === 'object' && value.constructor === Object) {
        for (key in value) {
            return true;
        }

        return false;
    } else if (typeof value === 'string') {
        return value.length > 0;
    } else {
        return value != null;
    }
}

deepfilter({
    something: [
        {
            colors: ['red', 'green', ''],
            cars: { audi: 'nice', vw: 'good', aston: '' }
        },
        undefined,
        ''
    ],
    foo: 'bar'
}, notEmpty);

/*
{
    something: [
        {
            colors: ['red', 'green'],
            cars: { audi: 'nice', vw: 'good' }
        }
    ],
    foo: 'bar'
});
*/

// Example 3 - Filter empty values + trim strings
// Just to demonstrate that subject properties can be manipulated while filtering
var deepfilter = require('deep-filter');

function notEmpty(value, prop, subject) {
    var key;

    if (Array.isArray(value)) {
        return value.length > 0;
    } else if (!!value && typeof value === 'object' && value.constructor === Object) {
        for (key in value) {
            return true;
        }

        return false;
    } else if (typeof value === 'string') {
        subject[prop] = value = value.trim();

        return value.length > 0;
    } else {
        return value != null;
    }
}

deepfilter({
    something: [
        {
            colors: ['red', ' green ', ''],
            cars: { audi: 'nice', vw: 'good', aston: '  ' }
        },
        undefined,
        ''
    ],
    foo: 'bar'
}, notEmpty);

/*
{
    something: [
        {
            colors: ['red', 'green'],
            cars: { audi: 'nice', vw: 'good' }
        }
    ],
    foo: 'bar'
});
*/
```

## Tests

`$ npm test`


## License

Released under the [MIT License](http://www.opensource.org/licenses/mit-license.php).
