---
repo: suchipi/serializable-types
url: 'https://github.com/suchipi/serializable-types'
homepage: null
starredAt: '2022-02-24T04:31:26Z'
createdAt: '2018-07-01T00:55:20Z'
updatedAt: '2022-08-05T04:32:15Z'
language: JavaScript
license: MIT
branch: master
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:11.912Z'
description: Runtime type assertion and serialization system
tags: []
---

# serializable-types

`serializable-types` is a combination runtime type checker and value (de)serializer for node and the browser.

It's kind of like [`prop-types`](https://npm.im/prop-types), [`flow-runtime`](https://npm.im/flow-runtime), or [`ow`](https://npm.im/ow), but it can use its type awareness to serialize and deserialize values into JSON-safe objects, kinda like [`ejson`](https://npm.im/ejson).

## Code Example

```js
import * as t from "serializable-types";

// --------------
// Checking types
// --------------

t.isOfType(42, t.number); // true
t.isOfType(42, t.boolean); // false
t.isOfType(true, t.boolean); // true
t.isOfType(true, t.number); // false

t.isOfType([1, 2, 3], t.array(t.number)); // true

t.isOfType(
  {
    foo: 42,
    bar: ["hi", 65],
    baz: [new Date(), Buffer.from("bla bla"), new Date()],
  },
  t.object({
    foo: t.number,
    bar: t.tuple(t.string, t.number),
    baz: t.array(t.union(t.Date, t.Buffer)),
  })
); // true

// ---------------
// Asserting types
// ---------------

t.assertType(true, t.boolean); // No error
t.assertType(42, t.boolean); // throws TypeError: Expected boolean, but received 42​​

t.assertType([true, false, null], t.array(t.boolean));
// throws TypeError: ​​Expected Array<boolean>, but received: [ true, false, null ]

t.assertType(
  {
    bad: true,
  },
  t.object({
    foo: t.number,
    bar: t.tuple(t.string, t.number),
    baz: t.array(t.union(t.Date, t.Buffer)),
  })
);
// TypeError: Expected { foo: number, bar: [string, number], baz: Array<Date | Buffer> }, but received: { "bad" : true }

// ----------------------------------
// Serializing values of a known type
// ----------------------------------

t.serializeWithType(Buffer.from("hello"), t.Buffer);
// { $type: "Buffer", $value: [104, 101, 108, 108, 111] }

t.serializeWithType(
  {
    data: Buffer.from([104, 101, 108, 108, 111]),
    encoding: "utf-8",
  },
  t.object({
    data: t.union(t.Buffer, t.string),
    encoding: t.string,
  })
);
// {
//   $type: "object",
//   $value: {
//     data: {
//       $type: "Buffer",
//       $value: [104, 101, 108, 108, 111],
//     },
//     encoding: { $type: "string", $value: "utf-8" },
//   },
// }

// ------------------------------------
// Deserializing values of a known type
// ------------------------------------

t.deserializeWithType(
  {
    $type: "object",
    $value: {
      data: {
        $type: "Buffer",
        $value: [104, 101, 108, 108, 111],
      },
      encoding: { $type: "string", $value: "utf-8" },
    },
  },
  t.object({
    data: t.union(t.Buffer, t.string),
    encoding: t.string,
  })
);
// { data: <Buffer 68 65 6c 6c 6f>, encoding: "utf-8" }
```

Try it out on [RunKit](https://npm.runkit.com/serializable-types)!

## API Overview

The `types` namespace exported by this module has three kinds of objects on it: `TypeDef`s, functions which create `TypeDef`s (hereafter known as "`TypeDef` constructors"), and functions you use to work with `TypeDef`s (hereafter known as "utility functions").

A `TypeDef` is an object that represents a given type within JavaScript, that has methods on it that can be used to work with values of that type.

Every `TypeDef` has this shape:

```ts
interface TypeDef {
  // Human-readable description of the type, eg `Buffer` or `Array<number>`
  description: string;

  // Human-readbale description of the type this serializes to, eg `{ $type: "Buffer", $value: Array<string> }`
  serializedDescription: string;

  // Check if a given value is of this type. Returns true if it's this type, false otherwise.
  check(val: any): boolean;

  // Serialize the given value so that it can be encoded as JSON.
  // If the given value is not of this type, an error will be thrown.
  serialize(val: any): any;

  // Check if a given object can be deserialized to this type. True if it can, false otherwise.
  checkSerialized(serialized: any): boolean;

  // Deserialize the given object into this type.
  // If the given object cannot be deserialized into this type, an error will be thrown.
  deserialize(serialized: any): any;
}
```

Here is a list of all the `TypeDef`s:

- `t.any`
- `t.anyObject`
- `t.boolean`
- `t.Buffer`
- `t.Date`
- `t.Element`
- `t.Error`
- `t.false`
- `t.Function`
- `t.Infinity`
- `t.integer`
- `t.NaN`
- `t.NegativeInfinity`
- `t.never`
- `t.null`
- `t.number`
- `t.RegExp`
- `t.string`
- `t.Symbol`
- `t.true`
- `t.Int8Array`
- `t.Uint8Array`
- `t.Uint8ClampedArray`
- `t.Int16Array`
- `t.Uint16Array`
- `t.Int32Array`
- `t.Uint32Array`
- `t.Float32Array`
- `t.Float64Array`
- `t.undefined`
- `t.URL`

Here is a list of all the `TypeDef` constructors:

- `t.array(memberTypeDef)`
- `t.arrayContaining(memberTypeDef)`
- `t.exactNumber(num)`
- `t.exactString(str)`
- `t.func(params, returnValue)`
- `t.instanceOf(klass)`
- `t.intersection(...memberTypeDefs)`
- `t.map(keyTypeDef, valueTypeDef)`
- `t.maybe(typeDef)`
- `t.object(typeDefObjectMap)`
- `t.objectMap(valueTypeDef, keyTypeDef)`
- `t.predicate(matcherFunction)`
- `t.set(memberTypeDef)`
- `t.shape(typeDefObjectMap)`
- `t.stringMatching(regex)`
- `t.symbolFor(tag)`
- `t.tuple(...memberTypeDefs)`
- `t.union(...memberTypeDefs)`

And here is a list of all the utility functions:

- `t.assertType(value, typeDef)`
- `t.isOfType(value, typeDef)`
- `t.serializeWithType(value, typeDef)`
- `t.deserializeWithType(serialized, typeDef)`
- `t.installGlobals()`
- `t.coerceToType(value)`

Each export is documented in further detail below.

## API: Utility Functions

Note that these functions will work with any object that implements the `TypeDef` interface described above; so they can be used not only with `TypeDef`s from this package, but also custom `TypeDef`s you write.

Additionally, these functions support "Automatic `TypeDef` Coercion", which means you can pass in placeholder values instead of `TypeDef` objects in many places. See the Notes section at the bottom of the README for more info.

### `t.assertType(value, typeDef)`

A function that, given a value and a `TypeDef`, throws an error if the value is not of the type described by the `TypeDef`.

### `t.isOfType(value, typeDef)`

A function that, given a value and a `TypeDef`, returns true if the value is of the type described by the `TypeDef`, and false otherwise.

### `t.serializeWithType(value, typeDef)`

A function that, given a value and a `TypeDef`, serializes the value using the `TypeDef`, and returns the serialized value. If the value you are trying to serialize is not of the type described by the `TypeDef`, an error will be thrown.

### `t.deserializeWithType(serialized, typeDef)`

A function that, given a serialized value and a `TypeDef`, deserializes the value using the `TypeDef`, and returns the deserialized value. If the value you are trying to deserialize is not of the serialized type described by the `TypeDef`, an error will be thrown.

### `installGlobals()`

Makes several exports from this library global:

- All the Utility Functions
- All the type constructors
- These specific `TypeDef` objects:
  - `boolean`
  - `integer`
  - `number`
  - `string`
  - `never`

Not all `TypeDefs` are exported

## API: `TypeDef`s

### `t.any`

A `TypeDef` which represents anything. Cannot be used for serialization/deserialization, but can be used for runtime type-checking.

### `t.anyObject`

A `TypeDef` which represents any object. More specifically, any _non-falsy_ (not null) value whose type string obtained from using the `typeof` operator returns `"object"`.

### `t.boolean`

A `TypeDef` which represents boolean values, either `true` or `false`.

### `t.Buffer`

A `TypeDef` which represents a [`Buffer`](https://nodejs.org/api/buffer.html#buffer_buffer).

### `t.Date`

A `TypeDef` which represents a [`Date`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date).

### `t.Element`

A `TypeDef` which represents an [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/Element).

### `t.Error`

A `TypeDef` which represents an [`Error`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error).

### `t.false`

A `TypeDef` which represents the value `false`.

### `t.Function`

A `TypeDef` which represents a `Function`. Note that functions cannot be (de)serialized.

### `t.Infinity`

A `TypeDef` which represents the value `Infinity`.

### `t.integer`

A `TypeDef` which represents integers.

### `t.NaN`

A `TypeDef` which represents the value `NaN`.

### `t.NegativeInfinity`

A `TypeDef` which represents the value `-Infinity`.

### `t.never`

A `TypeDef` that no value satisfies.

### `t.null`

A `TypeDef` which represents the value `null`.

### `t.number`

A `TypeDef` which represents all numbers except `NaN`, `Infinity`, and `-Infinity`.

### `t.RegExp`

A `TypeDef` which represents a [`RegExp`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp).

### `t.string`

A `TypeDef` which represents any string value.

### `t.Symbol`

A `TypeDef` which represents a [`Symbol`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol). Note: only shared Symbols from the global Symbol registry can be (de)serialized.

### `t.true`

A `TypeDef` which represents the value `true`.

### `t.Int8Array`, `t.Uint8Array`, `t.Uint8ClampedArray`, `t.Int16Array`, `t.Uint16Array`, `t.Int32Array`, `t.Uint32Array`, `t.Float32Array`, `t.Float64Array`

`TypeDef`s which represent [typed array views](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays).

### `t.undefined`

A `TypeDef` which represents the value `undefined`.

### `t.URL`

A `TypeDef` which represents a WHATWG [`URL`](https://developer.mozilla.org/en-US/docs/Web/API/URL) object.

## API: `TypeDef` constructors

### `t.array(memberTypeDef)`

A function which returns a `TypeDef` which represents a homogenous Array of the given type; for example, `t.array(t.boolean)` represents an Array of unbounded length containing only booleans. This is like `Array<boolean>` in Flow/TypeScript.

### `t.arrayContaining(memberTypeDef)`

A function which returns a `TypeDef` which represents an Array containing at least one of the given type; for example, `t.arrayContaining(t.string)` represents an Array of undetermined length containing at least one string. This is like `Array<string | any>` in Flow/TypeScript.

### `t.exactNumber(num)`

A function which returns a `TypeDef` which represents an exact number. For example, `t.exactNumber(42)`. This is most useful when combined with `t.union` to simulate enums; for example, `t.union(t.exactNumber(0), t.exactNumber(1))`, which is like `0 | 1` in Flow/TypeScript.

### `t.exactString(str)`

A function which returns a `TypeDef` which represents an exact string. For example, `t.exactString("foo")`. This is most useful when combined with `t.union` to simulate enums; for example, `t.union(t.exactString("GET"), t.exactString("POST"))`, which is like `"GET" | "POST"` in Flow/TypeScript.

### `t.func(params, returnType)`

A function which returns a `TypeDef` which represents a function with the given parameter type(s) and return type.

Note that when using thie `TypeDef`, the parameter types and return type are _NOT_ actually checked, because there is no way to do so in JavaScript at runtime without annotating or wrapping every function. As such, at runtime, this `TypeDef` only checks that the value is a Function. However, it may still useful to use instead of `Function` if you do not have a static type system in your codebase and want to document things for future readers.

### `t.instanceOf(klass)`

A function which returns a `TypeDef` which represents an instance of the provided klass.

Note that serialization will not be supported with this `TypeDef` unless the class implements the three following static methods:

- `static serialize(instance)`, which should serialize the instance into a JSON-compatible format (like an Object)
- `static checkSerialized(anyValue)`, which should return a boolean indicating whether some given value is of the type that `serialize` returns
- `static deserialize(serializedInstance)`, which should return an instance of the class by using the serialized representation.

### `t.intersection(...memberTypeDefs)`

A function which returns a `TypeDef` which represents the intersection of the given `TypeDef`s. It's kind of like a logical "AND". For example:

```js
t.intersection(
  t.object({
    foo: t.number,
  }),
  t.object({
    bar: t.number,
  })
);
```

This is like `{ foo: number } & { bar: number }` in Flow/TypeScript.

### `t.map(keyTypeDef, valueTypeDef)`

A function which returns a `TypeDef` which represents a [`Map`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), containing the given key and value types. For example, `t.map(t.string, t.Buffer)`. This is like `Map<string, Buffer>` in Flow/TypeScript.

### `t.maybe(typeDef)`

A function which returns a `TypeDef` which represents the union between the given `TypeDef` and `undefined`. For example: `t.maybe(t.string)`. This is similar to `?string` in Flow and `string?` in TypeScript.

This is most useful in object t.for representing optional properties, eg:

```js
t.object({
  size: t.number,
  data: t.maybe(t.Buffer),
});
```

### `t.object(typeDefObjectMap)`

A function which returns a `TypeDef` which represents an Object whose properties are typed by the passed `typeDefObjectMap`. For example:

```js
t.object({
  size: t.number,
  data: t.union(t.string, t.Buffer),
  encoding: t.maybe(t.string),
});

// This is similar to the following in Flow/TypeScript:
// {
//   size: number,
//   data: string | Buffer,
//   encoding?: string
// }
```

### `t.objectMap(valueTypeDef, keyTypeDef?)`

A function which returns a `TypeDef` which represents an Object whose keys are arbitrary and whose values are the same. For example:

```js
t.objectMap(t.number, t.string);
// This is similar to `{ [string]: number }` in Flow/TypeScript.
```

Note that the value `TypeDef` is the first argument and the key `TypeDef` is the second argument, which may be somewhat unintuitive. This is because the key `TypeDef` is optional and defaults to `t.union(t.string, t.Symbol)`.

```js
t.objectMap(t.number);
// This is similar to `{ [string | Symbol]: number }` in Flow/TypeScript.
```

### `t.predicate(matcherFunction)`

A function that returns a `TypeDef` which represents any value for which the provided `matcherFunction` returns true. You can use this to create TypeDefs that conform to any user-defined bounds. However, be aware that a TypeDef returned from `t.predicate` cannot be used for (de)serialization; it can only be used for runtime type checking.

### `t.set(memberTypeDef)`

A function which returns a `TypeDef` which represents a [`Set`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set), containing the given member type. For example, `t.set(t.string)`. This is like `Set<string>` in Flow/TypeScript.

### `t.shape(typeDefObjectMap)`

A function which is the same as `t.object` but all of the object properties in the returned `TypeDef` are wrapped with `t.maybe`. This is similar to `$Shape` in Flow, and is useful for config options, React Props, etc.

### `t.stringMatching(regex)`

A function which returns a `TypeDef` which represents any string that matches the provided regular expression.

### `t.symbolFor(tag)`

A function which returns a `TypeDef` which represents the value of calling `Symbol.for` with the provided tag string.

### `t.tuple(...memberTypeDefs)`

A function which returns a `TypeDef` which represents an Array of fixed length with typed values at each index. For example:

```js
t.tuple(t.string, t.number);
// This is like `[string, number]` in Flow/TypeScript.
```

### `t.union(...memberTypeDefs)`

A function which returns a `TypeDef` which represents the union of the given `TypeDef`s. It kind of works like a logical "OR". For example:

```js
t.union(t.string, t.number);
// This is like `string | number` in Flow/TypeScript.
```

## Notes

### Automatic `TypeDef` Coercion

Every function in this library that accepts a `TypeDef` as one of its parameters support something called "Automatic `TypeDef` Coercion". That means that in place of a `TypeDef`, you can pass in a value from which a desired `TypeDef` can be inferred. This means that in many cases, you do not need to import a ton of `TypeDef`s from this library, but can instead use common globals or literals in their place.

For instance, instead of writing this:

```js
var someVariable = true;

assertType(someVariable, t.boolean);
```

You could write this:

```js
var someVariable = true;

// `Boolean` is automatically "coerced" to `t.boolean`
assertType(someVariable, Boolean);
```

Here is a list of values which will be automatically coerced to `TypeDef`s. The left side of the arrow indicates the value you pass in to the function, and the right side of the arrow indicates the `TypeDef` it will be coerced into.

- `true` -> `t.true`
- `false` -> `t.false`
- `null` -> `t.null`
- `undefined` -> `t.undefined`
- `NaN` -> `t.NaN`
- `Infinity` -> `t.Infinity`
- `-Infinity` -> `t.NegativeInfinity`
- `Object` -> `t.anyObject`
- `t.object` (the function itself) -> `t.anyObject`
- `URL` -> `t.URL`
- `Symbol` -> `t.Symbol`
- `RegExp` -> `t.RegExp`
- `Function` -> `t.Function`
- `Error` -> `t.Error`
- `Element` -> `t.Element`
- `Buffer` -> `t.Buffer`
- `Date` -> `t.Date`
- `String` -> `t.string`
- `Number` -> `t.number`
- `Boolean` -> `t.boolean`
- any string -> The result of calling `t.exactString` with that string
- any number -> The result of calling `t.exactNumber` with that number
- any array -> The result of calling `t.tuple` with that array's elements as arguments
- any class -> The result of calling `t.instanceOf` with that class
- any object -> The result of calling `t.object` with that object (also recurses through property values and coerces them)

Some things to note about Automatic `TypeDef` Coercion:

- Array literals are always coerced into tuples; as such, `[String]` refers to a tuple with one element in it, a string. This may not be what you want; if you instead want an Array of any size with consistent items inside, use `t.array(String)`.

To manually coerce a value into a type, you can use `t.coerceToType`:

```js
t.coerceToType(Boolean); // returns t.boolean
t.coerceToType("hello"); // returns t.exactString("hello")
```

## License

MIT
