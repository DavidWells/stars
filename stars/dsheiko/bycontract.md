---
repo: dsheiko/bycontract
url: 'https://github.com/dsheiko/bycontract'
homepage: 'https://dsheiko.gitbook.io/bycontract/'
starredAt: '2021-11-12T20:06:42Z'
createdAt: '2016-01-08T17:41:13Z'
updatedAt: '2024-06-16T15:23:50Z'
language: JavaScript
license: NA
branch: master
stars: 31
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:39.221Z'
description: Argument validation library based on JSDOC syntax
tags:
  - interface
  - jsdoc
  - static-types
  - validate
  - validation
---

ByContract 2
==============
[![NPM](https://nodei.co/npm/bycontract.png)](https://nodei.co/npm/bycontract/)
[![Build Status](https://travis-ci.org/dsheiko/bycontract.png)](https://travis-ci.org/dsheiko/bycontract)
[![Join the chat at https://gitter.im/dsheiko/bycontract](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/dsheiko/bycontract?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

`byContract` is a small argument validation library based on [JSDOC syntax](https://jsdoc.app/tags-type.html). The library is available as a UMD-compatible module. Besides, it exposes `byContract` function globally when `window` object available, meaning you can still use it in non-modular programming.

# Highlights

- Validation syntax based on JSDoc expressions
- Entry and exit point contract validation
- Explanatory exceptions in the style of [aproba](https://github.com/iarna/aproba)
- Recursive structure (object) validation
- Interface validation
- Template tag flavor
- Property decorators flavor
- Can be disabled or completely cut off for production

# Table of contents
* [Welcome ByContract](#welcome-bycontract)
* [Where to use it](#where-to-use-it)
* [Syntax Overview](#syntax-overview)
* [Types](#types)
* [Custom Types](#custom-types)
* [Custom Validators](#custom-validators)
* [Production Environment](#production-environment)


# Welcome ByContract

## Main flavor
```js
function pdf( path, w, h, options, callback ) {
  validate( arguments, [
    "string",
    "!number",
    "!number",
    PdfOptionsType,
    "function=" ] );
}
```

## Template tag flavor
```js
function pdf( path, w, h, options, callback ) {
  validateContract`
    {string}          ${ path }
    {!number}         ${ w }
    {!number}         ${ h }
    {#PdfOptionsType} ${ options }
    {function=}       ${ callback }
    `;
}
```

## Property decorator flavor
```js
class Page {
  @validateJsdoc(`
    @param {string}          path
    @param {!number}         w
    @param {!number}         h
    @param {#PdfOptionsType} options
    @param {function=}       callback
    @returns {Promise}
  `)
  pdf( path, w, h, options, callback ) {
    return Promise.resolve();
  }
}
```


# Where to use it

## Node.js

```bash
npm install bycontract
```

```js
const { validate } = require( "bycontract" );
validate( 1, "number|string" );
```

## Browser

```js
<script src="dist/byContract.min.js"></script>
<script>
  const { validate } =  byContract;
  validate( 1, "number|string" );
</script>
```

## ES6 Module / Webpack

```bash
npm install bycontract
```

```js
import { validate } from "bycontract";
validate( 1, "number|string" );
```


# Syntax Overview

## Main flavor

##### Validate arguments
```js
validate( arguments, [ "JSDOC-EXPRESSION", "JSDOC-EXPRESSION" ] );  // ok or exception
```

##### Validate a single value (e.g. return value)
```js
validate( value, "JSDOC-EXPRESSION" ); // ok or exception

```

##### Example

```js
import { validate } from "bycontract";

const PdfOptionsType = {
  scale: "?number"
}

/**
 * Example
 * @param {string} path
 * @param {!number} w
 * @param {!number} h
 * @param {PdfOptionsType} options
 * @param {function=} callback
 */
function pdf( path, w, h, options, callback ) {
  validate( arguments, [
    "string",
    "!number",
    "!number",
    PdfOptionsType,
    "function=" ] );
  //...
  const returnValue = Promise.resolve();
  return validate( returnValue, "Promise" );
}

pdf( "/tmp/test.pdf", 1, 1, { scale: 1 } );

// Test it

pdf( "/tmp/test.pdf", "1", 1, { scale: 1 } ); // ByContractError: Argument #1: expected non-nullable but got string

```

## Template Tag flavor


```js
validateContract`
    {JSDOC-EXPRESSION} ${ var1 }
    {JSDOC-EXPRESSION} ${ var2 }
`;
```


##### Example
```js
import { validate, typedef } from "bycontract";

typedef("#PdfOptionsType", {
  scale: "number"
});

function pdf( path, w, h, options, callback ) {
  validateContract`
    {string}          ${ path }
    {!number}         ${ w }
    {!number}         ${ h }
    {#PdfOptionsType} ${ options }
    {function=}       ${ callback }
    `;
}
```
or you can copy/paste from JSDoc:

```js
function pdf( path, w, h, options, callback ) {
  validateContract`
    @param {string}          ${ path }
    @param {!number}         ${ w }
    @param {!number}         ${ h }
    @param {#PdfOptionsType} ${ options }
    @param {function=}       ${ callback }
    `;
}
```


## Property Decorator flavor

```js
@validateJsdoc`
    @param {JSDOC-EXPRESSION} param1
    @param {JSDOC-EXPRESSION} param2
`;
```

##### Example
```js
import { validate, typedef } from "bycontract";

typedef("#PdfOptionsType", {
  scale: "number"
});

class Page {
  @validateJsdoc(`
    @param {string}          path
    @param {!number}         w
    @param {!number}         h
    @param {#PdfOptionsType} options
    @param {function=}       callback
    @returns {Promise}
  `)
  pdf( path, w, h, options, callback ) {
    return Promise.resolve();
  }
}
```

```js
const page = new Page();
page.pdf( "/tmp/test.pdf", "1", 1, { scale: 1 } );
// ByContractError:
// Method: pdf, parameter w: expected non-nullable but got string

```

This solution requires [legacy decorators proposal](https://babeljs.io/docs/en/babel-plugin-proposal-decorators) support. You can get it with following [Babel](https://babeljs.io) configuration
```json
{
  presets: [
    [ "@babel/preset-env" ]
  ],
  plugins: [
    [ "@babel/plugin-proposal-decorators", { "legacy": true } ]
  ]
}
```


# Types

## Primitive Types

You can use one of primitive types: `*`, `array`, `string`, `undefined`, `boolean`, `function`, `nan`, `null`, `number`, `object`, `regexp`
```js
validate( true, "boolean" );
// or
validate( true, "Boolean" );
```

```js
validate( null, "boolean" ); // ByContractError: expected boolean but got null

const fn = () => validate( arguments, [ "boolean", "*" ]);
fn( null, "any" ); // ByContractError: Argument #0: expected boolean but got null

```

## Union Types

```js
validate( 100, "string|number|boolean" ); // ok
validate( "foo", "string|number|boolean" ); // ok
validate( true, "string|number|boolean" ); // ok
validate( [], "string|number|boolean" );
// ByContractError: expected string|number|boolean but failed on each:
// expected string but got array, expected number but got array, expected boolean but got array
```

## Optional Parameters
```js
function foo( bar, baz ) {
  validate( arguments, [ "number=", "string=" ] );
}
foo(); // ok
foo( 100 ); // ok
foo( 100, "baz" ); // ok
foo( 100, 100 ); // ByContractError: Argument #1: expected string but got number
foo( "bar", "baz" ); // ByContractError: Argument #0: expected number but got string
```

## Array Expression

```js
validate( [ 1, 1 ], "Array.<number>" ); // ok
validate( [ 1, "1" ], "Array.<number>" );
// ByContractError: array element 1: expected number but got string
// or
validate( [ 1, 1 ], "number[]" ); // ok
validate( [ 1, "1" ], "number[]" );
// ByContractError: array element 1: expected number but got string

```

## Object Expression
```js
validate( { foo: "foo", bar: "bar" }, "Object.<string, string>" ); // ok
validate( { foo: "foo", bar: 100 }, "Object.<string, string>" );
// ByContractError: object property bar: expected string but got number
```

## Structure
```js
validate({
  foo: "foo",
  bar: 10
}, {
  foo: "string",
  bar: "number"
}); // ok

validate({
  foo: "foo",
  bar: {
    quiz: [10]
  }
}, {
  foo: "string",
  bar: {
    quiz: "number[]"
  }
}); // ok

validate({
  foo: "foo",
  bar: 10
}, {
  foo: "string",
  bar: "number"
}); // ByContractError:  property #bar expected number but got null
```


## Interface validation

You can validate if a supplied value is an instance of a declared interface:

```js
class MyClass {}
const instance = new MyClass();

validate( instance, MyClass ); // ok
```

```js
class MyClass {}
class Bar {}
const instance = new MyClass();

validate( instance, Bar );
// ByContractError: expected instance of Bar but got instance of MyClass
```

When the interface is globally available you can set contract as a string:

```js
const instance = new Date();
validate( instance, "Date" ); // ok

//..
validate( node, "HTMLElement" ); // ok
//..
validate( ev, "Event" ); // ok
```

Globally available interfaces can also be used in Array/Object expressions:

```js
validate( [ new Date(), new Date(), new Date() ], "Array.<Date>" ); // ok
```


## Nullable Type

```js
validate( 100, "?number" ); // ok
validate( null, "?number" ); // ok
```


# Validation Exceptions

```js
import { validate, Exception } from "bycontract";
try {
  validate( 1, "NaN" );
} catch( err ) {
  console.log( err instanceof Error ); // true
  console.log( err instanceof TypeError ); // true
  console.log( err instanceof Exception ); // true
  console.log( err.name ); // ByContractError
  console.log( err.message ); // expected nan but got number
}
```

# Combinations

Sometimes we allow function to accept different sequences of types.
Let’s take an [example](https://github.com/npm/cli/blob/v6.9.0/lib/fetch-package-metadata.js):

```js
function andLogAndFinish( spec, tracker, done ) {
  validate( "SOF|SZF|OOF|OZF", [ spec, tracker, done ] )
  //...
}

```
Where the following sequences of types valid:
- string, object, function
- string, null, function
- object, object, function
- object, null, function


```js
import { validateCombo } from "bycontract";

const CASE1 = [ "string", TRACKER_OPTIONS, "function" ],
      CASE2 = [ "string", null, "function" ],
      CASE3 = [ SPEC_OPTIONS, TRACKER_OPTIONS, "function" ],
      CASE4 = [ SPEC_OPTIONS, null, "function" ];

validateCombo( arguments, [ CASE1, CASE2, CASE3, CASE4 ] );
```

Function `validateCombo` throws exception when none of the cases is valid

# Custom Types

Pretty much like with [JSDoc @typedef](https://jsdoc.app/tags-typedef.html) one can declare a custom type and use it as a contract.

### Validating against a Union Type
Here we define a union type for values that can contain either numbers or strings that represent numbers.
```js
import { validate, typedef } from "bycontract";
typedef( "NumberLike", "number|string" );
validate( 10, "NumberLike" ); // OK
validate( null, "NumberLike" ); // ByContractError: expected number|string but got null
```

### Validating against a Complex Type
This example defines a type `Hero` that represents an object/namespace required to have properties `hasSuperhumanStrength` and `hasWaterbreathing` both of boolean type.
```js
import { validate, typedef } from "bycontract";
typedef( "#Hero", {
  hasSuperhumanStrength: "boolean",
  hasWaterbreathing: "boolean"
});
var superman = {
  hasSuperhumanStrength: true,
  hasWaterbreathing: false
};
validate( superman, "#Hero" ); // OK
```

When any of properties violates the specified contract an exception thrown
```js
var superman = {
  hasSuperhumanStrength: 42,
  hasWaterbreathing: null
};
validate( superman, "#Hero" ); // ByContractError:  property #hasSuperhumanStrength expected boolean but got number
```

If value misses a property of the complex type an exception thrown
```js
var auqaman = {
  hasWaterbreathing: true
};
validate( superman, "#Hero" ); // ByContractError: missing required property #hasSuperhumanStrength
```

## Custom Validators

Basic type validators exposed exported as `is` object. So you can extend it:

```js
import { validate, is } from "bycontract";
is.email = function( val ){
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test( val );
}
validate( "me@dsheiko.com", "email" ); // ok
validate( "bla-bla", "email" ); // ByContractError: expected email but got string
```

# Production Environment

You can disable validation logic for production env like

```js
import { validate, config } from "bycontract";
if ( process.env.NODE_ENV === "production" ) {
  config({ enable: false });
}
```
Alternatively you can fully remove the library from the production codebase with Webpack:

#### webpack config
```js
const webpack = require( "webpack" ),
      TerserPlugin = require( "terser-webpack-plugin" );

module.exports = {
  mode: process.env.NODE_ENV || "development",
  ...
  optimization: {
     minimizer: [
         new TerserPlugin(),
         new webpack.NormalModuleReplacementPlugin(
          /dist\/bycontract\.dev\.js/,
          ".\/bycontract.prod.js"
        )
     ]
  }
};
```

#### building for development
```bash
npx NODE_ENV=development webpack
```

#### building for production
```bash
npx NODE_ENV=production webpack
```


[![Analytics](https://ga-beacon.appspot.com/UA-1150677-13/dsheiko/bycontract)](https://github.com/igrigorik/ga-beacon)

