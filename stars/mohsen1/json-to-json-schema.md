---
repo: mohsen1/json-to-json-schema
url: 'https://github.com/mohsen1/json-to-json-schema'
homepage: ''
starredAt: '2021-11-13T04:58:10Z'
createdAt: '2015-10-28T23:39:07Z'
updatedAt: '2025-02-08T12:43:04Z'
language: JavaScript
license: MIT
branch: master
stars: 33
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:39.140Z'
description: Convert a JSON to a JSON Schema describing that JSON
tags: []
---

# JSON to JSON Schema


[![Build Status](https://travis-ci.org/mohsen1/json-to-json-schema.svg?branch=master)](https://travis-ci.org/mohsen1/json-to-json-schema)

> Convert a JSON to a JSON Schema describing that JSON

## Usage

```js
import {convert} from 'json-to-json-schema';

const myJson = {name: 'Mohsen'};

const mySchema = convert(myJson);

console.log(mySchema); // => {type: 'object', properties: {name: {type: 'string'}}}
```

## Installation
Use npm or Bower to install this package

```
npm install --save json-to-json-schema
```
```
bower install --save json-to-json-schema
```
The browser module supports all UMD module systems. It exposes `JSONToJSONSchema` global object when there is no module system available.

## Development
To install dependencies

```
npm install
```

To run tests

```
npm test
```

To run tests continuously and watch for changes install [mocha](https://mochajs.org/) and run:

```
mocha --compilers js:babel/register -w
```

To make a new browser build run

```
npm run browserify
```

## License
[MIT](./LICENSE)
