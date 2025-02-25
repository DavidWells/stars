---
repo: privatenumber/chainset
url: 'https://github.com/privatenumber/chainset'
homepage: ''
starredAt: '2022-07-21T23:33:58Z'
createdAt: '2022-07-21T18:52:11Z'
updatedAt: '2022-08-10T06:29:24Z'
language: TypeScript
license: MIT
branch: develop
stars: 21
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:38.977Z'
description: Set object values using property chaining syntax
tags:
  - chain
  - deep
  - object
  - property
  - set
---

# chainset

Set object values using property chaining syntax.

<sub>Support this project by ⭐️ starring and sharing it. [Follow me](https://github.com/privatenumber) to see what other cool projects I'm working on! ❤️</sub>

## Why?

Setting a value on an arbitrary nested path can be cumbersome to do correctly.

For example, `someObject.propA.propB.propC = 'value'` on a potentially empty `someObject` requires a guard for each nested property.


#### Without `chainset`
```ts
const someObject = {}

if (!Object.hasOwn(someObject, 'propA')) {
    someObject.propA = {}
}

if (!Object.hasOwn(someObject.propA, 'propB')) {
    someObject.propA.propB = {}
}

someObject.propA.propB.propC = 'value'
```

#### With `chainset`

```ts
const someObject = chainset()

someObject.propA.propB.propC = 'value'
```

## Usage

### Create a new object
```ts
import chainset from 'chainset'

const object = chainset() // => {}

// Automatically initializes 'propB' & 'propC' to objects
object.propA.propB.propC = 'value'

console.log(object)
/*
{
    propA: {
        propB: {
            propC: 'value'
        }
    }
}
*/
```

### Use an existing object
```ts
const object = chainset({
    foo: {
        bar: {}
    }
})

// Automatically initializes 'propA' & 'propB' to objects
object.foo.bar.propA.propB = 'value'

console.log(object)
/*
{
    foo: {
        bar: {
            propA: {
                propB: 'value'
            }
        }
    }
}
*/
```

## API

### chainset(object, options)

#### object
Type: `object`

Default: `Object.create(null)` (a pure, prototype-less object)

The object to ehance with "chain-setting" support.

#### options

##### deep

Type: `boolean | number`

Default: `true`

How deep to add automatic object initialization support on access. Set to `true` to add support infinitely. Set a number to limit the depth of objects to add support to. Set to `false` to only add support to the immediate object.

##### allowedKeys

Type: `RegExp | (string|RegExp)[] | (path, object) => boolean`

A regular expression pattern, array of strings/patterns, or function that restrict what property names will be initialized on access.


##### defaultObject

Type: `(key?: string) => object`

Default: `() => Object.create(null)`

A function that creates a new object to use when a property is accessed.
