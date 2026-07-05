---
repo: mfix22/morphmorph
url: 'https://github.com/mfix22/morphmorph'
homepage: 'https://www.npmjs.com/package/morphmorph'
starredAt: '2019-09-17T04:53:22Z'
createdAt: '2017-07-31T00:11:11Z'
updatedAt: '2023-07-19T06:16:11Z'
language: JavaScript
license: MIT
branch: master
stars: 28
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:23.579Z'
description: >-
  :scream: Isomorphic transformations. Map, transform, filter, and morph your
  objects
tags:
  - filter
  - function-composition
  - functional
  - isomorphic
  - isomorphic-transformations
  - mapping
  - morph
  - reduce
  - transformations
---

# Morph Morph
##### Isomorphic transformations. Map, transform, filter, reduce, and morph your objects

[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![linted with XO](https://img.shields.io/badge/linted_with_-XO-5ed9c7.svg)](https://github.com/sindresorhus/xo)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

## Getting Started
```bash
$ npm i --save morphmorph
```
and then
```javascript
const Mapper = require('morphmorph')

const mapper = new Mapper(/* [config] */)

const old = {
  here: {
    there: {
      anywhere: 'Earth'
    }
  }
}

const mappings = [ 'here.there.anywhere:location' ]

const transformation = mapper.map(mappings, old)
// -> { location: 'Earth' }
```

## Creating Transformations
Every transformation can be represented by a mapping passed in as the first parameter
to `mapper.map()`. Mappings can either be of type `String` or `Object`. A mapping such as `'before:after'`
is equivalent to: `{ field: 'before:after' }`

### Basic
```javascript
const mappings = [
  'before:after',
  'egg:they.can.be.deeply.nested', // deeply nested target
  'data.user.updated:updated'      // deeply nested source
]
return mapper.map(mappings, obj)
```

### Functions
When creating a mapping, if you pass a function as the `type` parameter,
the function you passed will be called with the following properties to produce
the result:

```javascript
const mapping = {
  field: 'name',
  type: function (value, mapping, options, sourceObj, targetObj) {
    // value: the value grabbed from the source object
    // mapping: this specific mapping
    // options: config you specified by `new Mapper(options)`
    // sourceObj: object you passed as mapper.map(mapping, sourceObj)
    // targetObj: object you passed as mapper.map(m, sourceObj, targetObj). Default to `{}`
  }
}
```

#### Arrays
You can also pass an Array of functions and `MapLib` will perform a right-to-left
function composition:
```javascript
const mapping = {
  field: 'id:pin',
  type: [
    Number,                   // called last
    v => v.substr(0, 4)
    v => v.replace(/\D/g, '') // called first
  ]
}

mapper.map([mapping], { id: 'U1234342'}) // -> 1234
```

#### Function Compositions
If you want to do function compositions the traditional way, you can use `Mapper.compose(...myFilterFunctions)`. Again it will be a right-to-left composition.

### Reductions
By specifying your `field` property as an array, you can reduce multiple values into a single one. The values will be included as the first parameter of your `type` function. The target field is specified by the last mapping in your array

##### Example
```javascript
const response = {
  user: {
    firstName: 'Mike',
    lastName: 'Fix',
    professionInfo: {
      title: 'Mr',
      occupation: 'Software Engineer'
    }
  }
}

const mapping = {
  field: [
    'user.firstName',
    'user.lastName',
    'user.professionInfo.title',
    'user.professionInfo.occupation',
    'description'
  ],
  type: ([name1, name2, title, occ]) =>
    `${title}. ${name1} ${name2} is a ${occ}`
}

mapper.map([mapping], response).description // -> 'Mr. Mike Fix is a Software Engineer'
```

### Types
You can specify a type system by passing in the `types` option:
```javascript
const types = {
  number: Number,
  notNullString: v => (v || '')
}

const mapper = new Mapper({ types })
```

and then specify which type to use as a string for each mapping:
```javascript
const mappings = [
  { field: 'haircolor', type: 'notNullString' },
  { field: 'daysRemaining': type: 'number' }
]

return mapper.map(mappings, hairSubscriptionResponse)
```

**Note:** each function in the type specification is passed the same parameters as
the [normal type functions](#functions)

## Config
You can pass in a config object to `Mapper` to create your own mapping system:
##### Options

| Field          | Type           | Default        |
| :------------- | :------------- | :------------- |
| `types`        | `Object`       | `{}`           |
| `objDelimiter` | `String`       | `"."`          |
| `mapDelimiter` | `String`       | `":"`          |
| `preFilters`   | `Array`        | `[]`           |
| `postFilters`  | `Array`        | `[]`           |

##### Example
```javascript
const mapper = new Mapper({
  objDelimiter: '|',
  mapDelimiter: '->',
  types: { bool: Boolean },
  preFilters: [ FILTER_NULL ],
  postFilters: [ REMOVE_PASSWORD ]
  // add other fields to your config here
})
```

## Static methods
##### `Mapper.get`
Method used to grab a deeply nested field from an object.
```javascript
const get = Mapper.get('key'/*, delimiter */)
const field = get({ key: true })
// -> true
```
##### `Mapper.assign`
Method used to apply a deeply nested field to an object.
```javascript
const set = Mapper.assign('user.id'/*, delimiter */)
const targetObject = set({}, 1)
// -> { user: { id: 1 } }
```
##### `Mapper.compose`
Method used to apply function compositions
```javascript
const fun1 = v => `${v}!`
const fun2 = v => v.toUpperCase()
const fun3 = String

const exclaim = Mapper.compose(fun1, fun2, fun3)
exclaim('hey') // -> HEY!
```

## Bonus
Dependencies: None!<br>
Size: <2KB gzipped

## Examples
See [/examples](https://github.com/mfix22/morphmorph/tree/master/examples) or [`test/index.spec.js`](https://github.com/mfix22/morphmorph/tree/master/test/index.spec.js) for many examples of how to use `MorphMorph`.

### Thanks
* [Mostly Adequate Guide to Functional Programming](https://mostly-adequate.gitbooks.io/) for examples and reference implementations
