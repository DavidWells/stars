---
repo: mrodrig/doc-path
url: 'https://github.com/mrodrig/doc-path'
homepage: ''
starredAt: '2023-05-15T16:54:28Z'
createdAt: '2015-04-20T21:33:59Z'
updatedAt: '2024-07-13T02:00:13Z'
language: TypeScript
license: NA
branch: main
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:49.676Z'
description: A document path library for Node.JS
tags:
  - coverage
  - hacktoberfest
  - javascript
  - json-document
  - nested-paths
  - setpath
---

# A Document Path Library for Node

[![NPM version](https://img.shields.io/npm/v/doc-path.svg)](https://www.npmjs.org/package/doc-path)
[![Downloads](https://img.shields.io/npm/dm/doc-path)](https://www.npmjs.org/package/doc-path)
[![Minzipped Size](https://img.shields.io/bundlephobia/minzip/doc-path)](https://bundlephobia.com/result?p=doc-path)
[![Build Status](https://img.shields.io/github/actions/workflow/status/mrodrig/doc-path/automated-tests-workflow.yml)](https://github.com/mrodrig/doc-path/actions/workflows/automated-tests-workflow.yml)
[![Coverage Status](https://coveralls.io/repos/github/mrodrig/doc-path/badge.svg?branch=main)](https://coveralls.io/github/mrodrig/doc-path?branch=main)
[![Typings](https://img.shields.io/npm/types/doc-path)](https://www.npmjs.org/package/doc-path)

This module will take paths in documents which can include nested paths specified by '.'s and can evaluate the path
to a value, or can set the value at that path depending on the function called.

## Installation

```bash
$ npm install doc-path
```

## Usage

```javascript
let path = require('doc-path');
```

### API

#### path.evaluatePath(document, key)

* `document` - `Object` - A JSON document that will be iterated over.
* `key` - `String` - A path to the existing key whose value will be returned.
  * Note: If your key has a dot in it (eg. `a.b`) then be sure to escape the dot with a blackslash (eg. `a\\.b`).

If the key does not exist, `undefined` is returned.

If the object's structure is extremely deep, then an error may be thrown if the maximum call stack size is exceeded while traversing the object.

##### path.evaluatePath Example:

```javascript
const path = require('doc-path');

let document = {
    Make: 'Nissan',
    Model: 'Murano',
    Year: '2013',
    Specifications: {
        Mileage: '7106',
        Trim: 'S AWD'
    },
    Features: [
		{
		    feature: 'A/C',
			packages: [
				{name: 'Base'},
				{name: 'Premium'}
			]
		},
		{
		    feature: 'Radio',
			packages: [
				{name: 'Convenience'},
				{name: 'Premium'}
			]
		}
	]
};

console.log(path.evaluatePath(document, 'Make'));
// => 'Nissan'

console.log(path.evaluatePath(document, 'Specifications.Mileage'));
// => '7106'

console.log(path.evaluatePath(document, 'Features.feature'));
// => [ 'A/C', 'Radio' ]

console.log(path.evaluatePath(document, 'Features.packages.name'));
// => [ ['Base', 'Premium'], ['Convenience', 'Premium'] ]
```

#### path.setPath(document, key, value)

* `document` - `Object` - A JSON document that will be iterated over.
* `key` - `String` - A path to the existing key whose value will be set.
  * Note: If your key has a dot in it (eg. `a.b`) then be sure to escape the dot with a blackslash (eg. `a\\.b`).
* `value` - `*` - The value that will be set at the given key.

If the key does not exist, then the object will be built up to have that path.
If no document is provided, an error will be thrown.
If the object's structure is extremely deep, then an error may be thrown if the maximum call stack size is exceeded while traversing the object.

#### path.setPath Example:

 ```javascript
 const path = require('doc-path');

 let document = {
     Make: 'Nissan',
     Features: [
         { feature: 'A/C' }
     ]
 };

 console.log(path.setPath(document, 'Color.Interior', 'Tan'));
 /*
	{ 
		Make: 'Nissan',
		Features: [
			{ feature: 'A/C' }
		]
		Color: { 
			Interior: 'Tan'
		}
	}
 */

 console.log(path.setPath(document, 'StockNumber', '34567'));
 /*
	{ 
		Make: 'Nissan',
		Features: [
			{ feature: 'A/C' }
		]
		Color: { 
			Interior: 'Tan'
		},
		StockNumber: '34567'
	}
 */
 
 console.log(path.setPath(document, 'Features.cost', '$0 (Standard)'));
  /*
 	{ 
		Make: 'Nissan',
		Features: [
			{
				feature: 'A/C',
				cost: '$0 (Standard)'
			}
		]
		Color: { 
			Interior: 'Tan'
		},
		StockNumber: '34567'
 	}
  */
 ```

## Tests

```bash
$ npm test
```

_Note_: This requires `mocha`, `should`, `async`, and `underscore`.

To see test coverage, please run:
```bash
$ npm run coverage
```

Current Coverage is:
```
Statements   : 100% ( 33/33 )
Branches     : 100% ( 24/24 )
Functions    : 100% ( 3/3 )
Lines        : 100% ( 29/29 )
```

## Features

- Supports keys with escaped `.` characters (as of v3.0.0)
- Supports nested paths
  - Including keys of objects inside arrays! (as of v2.0.0)
- Same common path specification as other programs such as MongoDB
