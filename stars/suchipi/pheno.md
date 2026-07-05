---
repo: suchipi/pheno
url: 'https://github.com/suchipi/pheno'
homepage: null
starredAt: '2022-02-28T01:41:27Z'
createdAt: '2022-02-27T03:27:27Z'
updatedAt: '2025-01-18T11:47:21Z'
language: TypeScript
license: MIT
branch: main
stars: 130
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:04.409Z'
description: >-
  Simple, lightweight at-runtime type checking functions, with full TypeScript
  support
tags: []
---

# pheno

Simple, lightweight at-runtime type checking functions, with full TypeScript support

## Features

- Full TypeScript integration: TypeScript understands that `assertType` and `isOfType` narrow the types of things, and will refine them accordingly
- Simple: Type validators are just functions that return booleans.
- Effective: There's lots of utility functions that help you represent all the various types you'd care about in your code.
- Lightweight: The whole library is 18K minified (4.5K gzipped, 4.1K brotli-ified).

## Usage Example

```ts
import * as types from "pheno";

function something(first: unknown, second: unknown) {
  // Throws an error if `first` is not a string
  types.assertType(first, types.string);

  // Throws an error if `second` is not `string | number`
  types.assertType(second, types.union(types.string, types.number));

  // Typescript now knows that `first` is a string and `second` is `string | number`
  return first + " " + String(second);
}
```

## List of types and type builder functions

- `and`
- `any`
- `anyArray`
- `anyFunction`
- `anyMap`
- `anyObject`
- `anySet`
- `anyTypeValidator`
- `array` (alias of `arrayOfUnknown`)
- `arrayOf`
- `arrayOfAny`
- `arrayOfUnknown`
- `Array` (alias of `arrayOfUnknown`)
- `assertType` (assert that a value has the provided type, and throw an error message if it doesn't)
- `asType` (do a TypeScript `as` cast to convert the value into the provided type)
- `bigint`
- `BigInt` (alias of `bigint`)
- `boolean`
- `Boolean` (alias of `boolean`)
- `Date`
- `Error`
- `exactBigInt`
- `exactNumber`
- `exactString`
- `exactSymbol`
- `false`
- `falsy`
- `Function` (alias of `unknownFunction`)
- `hasClassName`
- `hasToStringTag`
- `Infinity`
- `instanceOf`
- `integer`
- `intersection`
- `isOfType` (return a boolean indicating if a value is of the provided type)
- `map` (alias of `unknownMap`)
- `Map` (alias of `unknownMap`)
- `mapOf`
- `mappingObjectOf`
- `maybe`
- `NaN`
- `NegativeInfinity`
- `never`
- `nonNullOrUndefined`
- `null`
- `nullish`
- `void` (alias of `nullish`)
- `number` (doesn't include NaN, Infinity, or -Infinity)
- `Number` (alias of `number`)
- `numberIncludingNanAndInfinities`
- `object` (alias of `unknownObject`)
- `Object` (alias of `unknownObject`)
- `objectOrNull`
- `objectWithOnlyTheseProperties`
- `objectWithProperties`
- `or`
- `optional`
- `partialObjectWithProperties`
- `record`
- `RegExp`
- `set` (alias of `unknownSet`)
- `Set` (alias of `unknownSet`)
- `setOf`
- `string`
- `String` (alias of `string`)
- `stringifyValue` (safe and lightweight value-to-string function, for printing values in error messages)
- `stringMatching`
- `Symbol`
- `symbol` (alias of `Symbol`)
- `symbolFor`
- `true`
- `truthy`
- `tuple`
- `undefined`
- `union`
- `unknown`
- `unknownFunction`
- `unknownMap`
- `unknownObject`
- `unknownSet`
- `unknownTypeValidator`
- `ArrayBuffer`
- `SharedArrayBuffer`
- `DataView`
- `TypedArray`
- `Int8Array`
- `Uint8Array`
- `Uint8ClampedArray`
- `Int16Array`
- `Uint16Array`
- `Int32Array`
- `Uint32Array`
- `Float32Array`
- `Float64Array`

Please see the TypeScript types for each of these in either your editor's autocomplete or pheno's source code for more information.

## License

MIT
