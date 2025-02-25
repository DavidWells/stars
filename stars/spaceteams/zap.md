---
repo: spaceteams/zap
url: 'https://github.com/spaceteams/zap'
homepage: null
starredAt: '2022-11-05T16:48:06Z'
createdAt: '2022-10-28T11:13:20Z'
updatedAt: '2024-07-12T09:06:16Z'
language: TypeScript
license: BSD-3-Clause
branch: main
stars: 18
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:12.543Z'
description: validation-first schema library with a functional api
tags: []
---

# zap ⚡

[![Developed during Spacetime at Spaceteams](https://raw.githubusercontent.com/spaceteams/badges/main/developed-during-spacetime.svg)](https://spaceteams.de)

![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/spaceteams/zap/main.yaml)
[![NPM Version](https://img.shields.io/npm/v/@spaceteams/zap)](https://www.npmjs.com/package/zap)
[![License](https://img.shields.io/github/license/spaceteams/zap)](https://github.com/spaceteams/zap/blob/main/LICENSE)

zap is a validation-first schema library with a functional Api.

Some major features are

- Flexible refinement and validation API
- Transformation, Coercion and type narrowing
- JSONSchema support

## Why another schema validation library?

I found it hard to describe complicated nested form validations in libraries like [zod](https://zod.dev/). For example describing a form that consists of multiple modules and have them validate independently can be a hassle. In Zap you can write

```typescript
const dates = refine(
  object({ startDate: date(), endDate: date() }),
  ({ startDate, endDate }, { validIf }) => ({
    startDate: validIf(endDate > startDate, "start must be before end"),
  })
);
const name = object({ name: string() });
const form = merge(dates, name);
```

And all validations will be run in the way you would expect. I.e. the name field will be validated _and_ the date range. And not the date range only once all fields are filled in the first place.

This is achievable in Zap because the schema types can be nested more flexibly. On the other hand we do not support a fluent API.

## Quick Start

### Install

```
npm install @spaceteams/zap
or
yarn add @spaceteams/zap
```

then import functions directly like this

```typescript
import { number, object } from "@spaceteams/zap";
const mySchema = object({ a: number() });
```

### Schema Definitions and Type Inference

To get started you only need to know a few schema types and some utility functions. Have a look at this user schema

```ts
const user = object({
  name: string(),
  dateOfBirth: optional(date()),
});
type User = InferType<typeof user>;
```

This defines a schema `user` that has a required name and an optional date of birth.

We also infer the type of the Schema which is equivalent to

```ts
type User = {
  name: string;
  dateOfBirth?: Date | undefined;
};
```

### Typeguards and Validations

This schema can now be used as a type guard

```ts
function processUser(value: unknown): string {
  if (user.accepts(value)) {
    // typescript infers value to be of type User
    return value.name;
  }
  // in this branch value is of unknown type!
  return "not a user!";
}
```

Or if you need full validation errors

```ts
const validationErrors = user.validate({ name: 12 });
console.log(translate(validationErrors));
```

will print out

```
{ name: 'value was of type number expected string' }
```

> For the sake of demonstration we use `translate()` to make the validation object more readable. Actually, `name` is not a string but an object containing more information about the validation error such as an issue code, the actual value validated against, etc...

### Parsing and Coercion

The schema type also comes with a parse function. This function builds a new object that conforms to the schema. By default however, the schema won't be able to convert types. For example

```ts
user.parse({ name: "Joe", dateOfBirth: "1999-01-01" });
```

will throw a validation error because `"1999-01-01"` is a string and not a Date object. You can fix this problem with _coercion_ like this

```ts
const coercedDate = coerce(date(), (v) => {
  if (typeof v === "string" || typeof v === "number") {
    return new Date(v);
  }
  return v;
});
const user = object({
  name: string(),
  dateOfBirth: optional(coercedDate),
});
```

The coerce function applies the `Date` only if the value is a string or a number and does not touch any other value (including dates).

> The usecase of coercion from string to Date is so common that we have `coercedDate()` as a builtin function

# Table of Contents

> 🚧 A lot of chapters of the documention are still missing. But each chapter links to relevant source code and specs.

- [Quick Start](#quick-start)

  - [Schema Definitions and Type Inference](#schema-definitions-and-type-inference)
  - [Typeguards and Validations](#typeguards-and-validations)
  - [Parsing and Coercion](#parsing-and-coercion)

- [Core](#core)

  - [Schema](#schema)
  - [Validation](#validation)
  - [Refine](#refine)
  - [Coerce](#coerce)
  - [Transform and Narrow](#transform-and-narrow)

- [Simple Schema Types](#simple-schema-types)

  - [Bigint](#bigint)
  - [Boolean](#boolean)
  - [Date](#date)
  - [Enum](#enum)
  - [Literal](#literal)
  - [Null Schema](#null-schema)
  - [Number](#number)
  - [String](#string)

- [Composite Schema Types](#composite-schema-types)

  - [Array](#array)
  - [Object](#object)
  - [Procedure](#procedure)
  - [Promise](#promise)
  - [Record](#record)
  - [Tuple](#tuple)

- [Logic](#logic)

  - [And](#and)
  - [Discrimated Union](#discrimated-union)
  - [Not](#not)
  - [Or](#or)
  - [XOR](#xor)

- [Utility](#utility)
  - [Lazy](#lazy)
  - [Optics](#optics)
  - [Optional, Required, Nullable & Nullish](#optional-required-nullable--nullish)
  - [Partial & DeepPartial](#partial--deeppartial)
  - [PathValidation](#pathvalidation)
  - [ToJsonSchema](#tojsonschema)

## Core

### Schema

> [spec](src/schema.spec.ts) and [source](src/schema.ts)

At the core of zap is the `schema` interface. All schema functions (like `object()`, `number()`, `string()`...) return an object that implements it. It is defined as

```typescript
export interface Schema<I, O = I, M = { type: string }> {
  accepts: (v: unknown, options?: Partial<ValidationOptions>) => v is I;
  validate: (
    v: unknown,
    options?: Partial<ValidationOptions>
  ) => ValidationResult<I>;
  validateAsync: (
    v: unknown,
    options?: Partial<ValidationOptions>
  ) => Promise<ValidationResult<I>>;
  parse: (v: unknown, options?: Partial<Options>) => ParseResult<I, O>;
  parseAsync: (
    v: unknown,
    options?: Partial<Options>
  ) => Promise<ParseResult<I, O>>;
  meta: () => M;
}
```

which is quite a handful.

Let us start with `accepts` and `validate`. Both get a value of unknown type and run validations on it. While `validate` builds a complete `ValidationResult` containing all found validation errors, `accepts` only returns a typeguard and is slightly more efficient thatn `validate`. The type of this validation is the first generic type `I`. If you don't care for the other two generic types you can write such a schema as `Schema<I>`. Both functions also accept a set of options. Tey currently include `earlyExit` (default false) which will stop validation on the first issue and `withCoercion` (default false) which will also coerce values on Validation (see [coerce](#coerce))

There is an async version of both validate and parse available. These are needed if you use [async refinements](#refine).

Validation is great if you want to check if a value conforms to a schema, but sometimes you want to `coerce`, `tranform` a value or strip an object of additional fields. For these cases you want to call `parse()`. This function returns a Result of type

```typescript
type ParseResult<I, O> = {
  parsedValue?: O;
  validation?: ValidationResult<I>;
};
```

`parsedValue` is defined if parsing was successful, otherwise `validation` contains the validation issues found. Note that `parse` has two generic types: `I` and `O`. The first is the type the Schema accepts. The second one is `O` the output type. By default it is equal to `I` but can be changed with `transform()` or `narrow()` (see [transform and narrow](#transform-and-narrow)). Like `validate` it accepts options, so you can configure the validation step and also `ParsingOptions` that control the parsing behaviour. There is `strip` (default true) that will remove all additional properties from objects and `skipValidation` (default false) if you do not want to validate, but directly run the parse step.

The last method defined is `meta()`. It returns an object that describes the schema. For example `items(array(number()), 10).meta()` will return an object of type

```typescript
{
  type: "array";
  schema: Schema<number, number, { type: "number"; }>;
} & {
  minItems: number;
  maxItems: number;
}
```

You can use this object to traverse the schema tree (via the `schema` attribute, that is present because `array` contains another schema) or reflect on validation rules (for example `minItems` is set to `10` in the example). This object is used heavily in utility functions like [toJsonSchema()](#tojsonschema) or [partial()](#partial--deeppartial).

To make traversing the meta object tree easier we have [Optics](#optics)

### Validation

> [spec](src/validation.spec.ts) and [source](src/validation.ts)

How we represent validation results is quite unique to zap. Let's say you have a schema.

```typescript
const schema = object({
  a: object({
    b: array(number()),
  }),
  c: string(),
});
```

then a validation might look something like this

```typescript
const validation = {
  a: {
    b: [undefined, new ValidationIssue(...)]
  }
  c: new ValidationIssue(...)
}
```

Our validation result resembles the schema closely which can be quite convenient to work with. If you want a more traditional representation however, we got you covered. The [path validation functions](#pathvalidation) convert between this representation and a list of path-issue pairs.

As you have seen before you can also translate this validation. By default `translate` will use a canonical way to transform each validation error into a string but you can customize that behavior.

Let us have a closer look at the `ValidationResult` since its type is a bit off-putting at first (and the type of `Validation` is even more complicated)

```typescript
export type ValidationResult<T, E = ValidationIssue> =
  | Validation<T, E>
  | undefined;
```

So it is dependent on `T` and an error type `E`. By default the error type is a `ValidationIssue`. This class extends `Error` so it can be thrown nicely and it contains a `ValidationIssueCode`, a custom error `message`, the validated `value` and a list of `args` to give further information about the validation. Using the `translate` method you can transform a `ValidationResult<T, ValidationIssue>` into a `ValidationResult<T, string>` containing user readable validation errors. The default translator is a bit technical though, so it is up to you to translate `ValidationIssues` for your users.

The `ValidationResult` can now either by `undefined` indicating a success or a `Validation<T, E>` indicating a failure. You can check this with `isSuccess` and `isFailure` functions. The `ValidationResult` has a pretty complicated typedefinition but it tries to resamble a deeply partial `T` with ValidationIssues instead of the actual types. Consider this validation:

```typescript
type Value = {
  array: number[];
  nested: {
    id: string;
  };
};
const validation: Validation<Value, string> = {
  array: [undefined, "validation error"],
  nested: "object invalid",
};
```

This is a validation of type `Validation<Value, string>` so it validates `Value` and uses a `string` to describe validation issues. In the example the second entry of `array` has a validation error and the `nested` object itself has a validation error.

By default zap will keep on validation even if an issue has been encountered (you can change this with the `earlyExit` flag). We even keep on validating through an `and` schema (aka Intersection type) and merge the individual Validation objects. This is especially helpful when validating complex forms.

### Refine

> [spec](src/refine.spec.ts) and [source](src/refine.ts)

Out of the box zap supports a lot of validation methods. Methods like `length` for strings or `after` for dates. These validation methods (or refinements) are described together with their applicable schemas.

You can build custom validation methods, however. And the simplest way is the `validIf` function

```typescript
validIf(number(), (v) => v % 2 === 0, "must be even");
```

This function creates a validation error if the given number is not even.

The next powerful refinement function is just called `refine`. It takes a schema and a function `(v: I, ctx: RefineContext<P>) => void | ValidationResult<P>`. Where the `ctx` object contains both the `ValidationOptions` and helper methods `add` and `validIf`. The generic Parameter `P` is defined as `P extends I = I`, which means that it is `I` by default or it [narrows](#transform-and-narrow) it further.

Refine supports three styles of refinement:

```typescript
const schema = object({ a: string(), b: number() });
const defaultStyle = refine(schema, ({ a, b }) => {
  if (a.length !== b) {
    return {
      a: new ValidationIssue("generic", "a must have length of b", v),
    };
  }
});
const builderStyle = refine(schema, ({ a, b }, { add }) => {
  if (a.length !== b) {
    add({
      a: new ValidationIssue("generic", "a must have length of b", v),
    });
  }
});
const inlineStyle = refine(schema, ({ a, b }, { validIf }) => ({
  a: validIf(a.length === b, "a must have length of b"),
}));
```

Here we refine an object `{a: string, b: number}` so that the string `a` has length `b`. In the first style the `ValidationResult` itself is returned. This is very similar to the `refine` method the `Schema` supports. The second style is using the `add` method. This approach is useful if you want to iteratively collect validation errors and have them merged into a final validation result. And finally, there is an inline style using the `validIf` method. The advantage of `refine` over the simpler `validIf` is that you can add validation errors anywhere in the `ValidationResult`. For exmple you could validate the `age` field and write the error inside the `name` field. Also you can do narrowing:

```typescript
refine(
  object({ id: optional(string()) }),
  (v, ctx: RefineContext<{ id: string }>) => ({
    id: ctx.validIf(v !== undefined, "must be present"),
  })
);
```

which will result in a type `{id: string}` and not `{id?: string | undefined}`.

> Most of zap's built-in validation functions are implemented using `refineWithMetainformation`. They add meta-information that can be picked up and interpreted by utility functions like `toJsonSchema`

There are also `validIfAsync`, `refineAsync` and `refineAsyncWithMetaInformation`. Consider validation of a user registration

```typescript
// call the backend
const userAvailable = (_username: string) => Promise.resolve(true);

export const userRegistration = object({
  username: validIfAsync(
    string(),
    userAvailable,
    "this username is already taken"
  ),
});
```

This will call the function `userAvailable` if `userName` is a string and await the result. You should of course consider to debounce, deduplicate and cache your requests to the backend depending on your usecase. To use this schema you have to call `validateAsync` and `refineAsync`, the synchronous versions will result in validation errors.

### Coerce

> [spec](src/schema.spec.ts) and [source](src/schema.ts)

By default, a schema will not try to convert values during the parse step. In that case, the parse function will return its inputs without changing them. If you want to parse values like `"1998-10-05"` as dates however, you will need coercion.

`coerce` takes a schema and a function `(v: unknown) => unknown` that may or may not convert the given value. Currently, this function is applied during `parse` before the validation step and _again_ for the actual parsing. Coercion is not applied in `accepts` or `validate` so a `coercedDate()` will still accept only dates (it is a `Schema<Date>` after all!). You can override this behaviour using the `withCoercion` option.

The predefined coerced schemas are `coercedBoolean`, `coercedDate `, `coercedNumber`, `coercedString` and `json`

All except `json` are implemented using the default coercion of javascript. Note that this comes with all the pitfalls and weirdnesses of javascript. For example `[]` is coerced to `0`, `''` or `true` with to coercedNumber, coercedString and coercedBoolean respectively.

`json` is a wrapper for `JSON.parse` and will attempt to coerce a string into an object. This is useful when parsing request bodies like this

```typescript
json(requestSchema).parse(event.body);
```

### Transform and Narrow

> [spec](src/schema.spec.ts) and [source](src/schema.ts)

After you parsed a value, you might want to further transform it. For example the schema `defaultValue(optional(number()), 42)` will parse `undefined` to 42. This schema has type `Schema<number | undefined, number>` indicating that it will still accept `undefined` but will always parse to a number.

The `defaultValue` function is implemented using `narrow()`. This function takes a schema and a projection function `(v: O) => P` where `P extends O`. This means that the narrowed type must still be assignable to the ouput type.

If you need even more powerful transformations you can use `transform()`. This function takes a schema and an arbitrary transformation `(v: O) => P`. This is very similar to `narrow()` except for the missing contraint on `P`. With this function you can implement a schema like this

```
transform(array(number()), values => Math.max(...values))
```

This schema accepts an array of numbers and parses them into their maximum value. This schema has a type like `Schema<number[], number>`.

## Simple Schema Types

### BigInt

> [spec](src/simple/bigint.spec.ts) and [source](src/simple/bigint.ts)

`bigInt()` accepts BigInt values.

There is a `coercedBigInt` that uses standard JS coercion using the BigInt constructor.

Most of the [Number](#number) refinements also work for bigInt.

### Boolean

> [spec](src/simple/boolean.spec.ts) and [source](src/simple/boolean.ts)

`boolean()` accepts boolean values. It is equivalent to `literals(true, false)` but creates slightly more precise validation issues.

There is a `coercedBoolean` that uses standard JS coercion to boolean.

### Date

> [spec](src/simple/date.spec.ts) and [source](src/simple/date.ts)

`date()` validates `Date` objects and accepts only if they point to an actual time by validating them against `isNaN`.

There is a `coercedDate` that uses the `Date` constructor if the value is `string` or `number`.

#### Validation Functions

`before` - accept dates before the given value  
`after` - accept dates after the given value

### Enum

> [spec](src/simple/enum.spec.ts) and [source](src/simple/enum.ts)

`nativeEnum` validates native typescript enum types (not to be confused with a union of [literals](#literal)).

Defining a schema

```typescript
enum E {
  a,
  b = 12,
  c = "c",
}
const schema = nativeEnum(E);
```

results in a type `Schema<E>` that accepts the enum values `E.a` through `E.c` or their actual values `0`, `12` and `"c"`.

You can also define a `nativeEnum` from a constant object

```typescript
const constEnum = nativeEnum({
  a: "a",
  b: 12,
  c: "c",
} as const);
```

resulting in a type `Schema<"a" | "c" | 12>`.

### Literal

> [spec](src/simple/literal.spec.ts) and [source](src/simple/literal.ts)

The `literal` method expresses typescript literals. Examples include

```typescript
literal("a");
literal(true);
literal(1);
literal(Symbol());
```

`null` and `undefined` must be expressed using `nullSchema` or through the [optionals](#optional-required-nullable--nullish).

There is also `literals` to create a union of literals like

```typescript
literals(true, false);
literals(1, 2, "a", "some enum");
```

If you need even more power you can use [or](#or).

### Null Schema

> [spec](src/simple/null-schema.spec.ts) and [source](src/simple/null-schema.ts)

This schema accepts only `null`. Also have a look at [optionals](#optional-required-nullable--nullish).

### Number

> [spec](src/simple/number.spec.ts) and [source](src/simple/number.ts)

The `number` schema accepts any number that is not `NaN`.

> Note that `typeof NaN === "number"` in javascript

There is coercion function `coercedNumber` that uses javascript `Number` constructor.

#### Validation Functions

`nan` - accepts if value is `NaN`  
`positive` - accepts positive numbers (>0)  
`nonPositive` - accepts non-positive numbers (<=0)  
`negative` - accepts negative numbers (<0)  
`nonNegative` - accepts non-negative number (>=0)  
`integer` - accepts integer numbers  
`multipleOf` - accepts numbers that are multiples of the given value (also works for floating points)  
`exclusiveMaximum` - accepts numbers that are strictly smaller than a threshold (<)  
`exclusiveMinimum` - accepts numbers that are strictly greater than a threshold (>)  
`maximum` - accepts numbers that are smaller than or equal to a threshold (<=)  
`minimum` - accepts numbers that are greater than or equal to a threshold (>=)

### String

> [spec](src/simple/string.spec.ts) and [source](src/simple/string.ts)

The `string` schema accepts any string. There is a coercion function `coercedString` that uses jacscripts `String` constructor. Also note that you can use `json` to coerce a json string into an object (see [schema-section](#schema))

#### Validation Functions

`minLength` - accepts strings with a length greater than or equal to a threshold (>=)  
`maxLength` - accepts strings with a length smaller than or equal to a threshold (<=)  
`length` - accepts strings with a length equal to a threshold  
`nonEmptyString` - accepts strings that have `minLength` 1  
`pattern` - accepts strings that match a regular expression (using RegExp.test)  
`startsWith` - accepts strings that start with the given string  
`endsWith` - accepts strings that end with the given string

## Composite Schema Types

### Array

> [spec](src/composite/array.spec.ts) and [source](src/composite/array.ts)

### Map

> [spec](src/composite/map.spec.ts) and [source](src/composite/map.ts)

### Object

> [spec](src/composite/object.spec.ts) and [source](src/composite/object.ts)

The object schema is perhaps the most common and the most complex schema of the bunch. With object you can describe what corresponds to an interface in typescript. The example from the spec

```typescript
const schema = object({
  id: number(),
  name: array(string()),
  description: optional(string()),
  nested: object({
    user: string(),
  }),
});
```

will be infered to

```typescript
type S = {
  id: number;
  name: string[];
  nested: {
    user: string;
  };
} & {
  description?: string | undefined;
};
```

This shows that nesting works and that we do some fixup work for optional types so that they are also partial in the schema. That means this schema accept both `{ id: 1, name: [], nested: { user: "" }}` and `{ id: 1, name: [], description: undefined, nested: { user: "" }}`.

You can access any nested schema using the `meta` function like this `schema.meta().schema.name.meta().schema` or more succinct `into(get(schema, "name"))`.

By default this schema will strip additional properties on parse. You can avoid this by calling `schema.parse(value, { strip: false })`.

#### Strict

An object schema allows for additional property to be present during validation and will strip them during parsing. If you wrap it with the schema with the `strict` method it will return a validation error containing the first additional property. A strict schema will also fail to parse objects with additional fields.

#### Catchall

Sometimes you want to allow additional properties only if they are valid according to some other schema. In that case (instead of trying to build it using logical operators) you can express it like this

```typescript
const newSchema = catchAll(schema, number());
```

the infered type is `S & Record<string, number>` and the catchall schema can be accessed using `newSchema.meta().additionalProperties`

#### IsInstance and fromInstance

you can add an instanceOf check using the `isInstance` method. That way you can ensure that the prototype property is correctly set. You can also create a schema from an instance using `fromInstance`. Note that this will only validate the prototype and not any of the contents of your type.

> The [date](#date) method is implemented as a refinement on `fromInstance(Date)`

#### Merge

The logical operator [and](#and) can be used to extend an object

```typescript
and(schema, object({ more: string() }));
```

While this results in a schema that adds the `more` property to the `schema` it also yields an `and` type schema that does not compose well with other methods like `omit` and `pick`. This is because the `and` operator is more general and works for arbitrary types. That is why you should prefer the `merge` method. Merge behaves like `and` except that it can only be called with object schemas and will result in an object schema. So you can do

```typescript
const m = merge(schema, object({ more: string() }));
merged.meta().schema.id;
merged.meta().schema.more;
```

and also apply `omit`, `pick`, `keys`, `strict` etc to it.

#### Omit and Pick

Omit and pick both correspond to the respective typescript types. You can do

```typescript
omit(schema, "id", "description");
pick(schema, "nested");
```

to get `Omit<S, 'id' | 'description'>` and `Pick<S, 'nested'>` as the result type.

#### Keys

The keys method returns a [literals](#literal) schema of the keys of the schema. You can get the keys as a list using `keys(schema).meta().literals` which is typed in our example as `("id" | "name" | "description" | "nested")[]`

### Procedure

> [spec](src/composite/procedure.spec.ts) and [source](src/composite/procedure.ts)

### Promise

> [spec](src/composite/promise.spec.ts) and [source](src/composite/promise.ts)

### Record

> [spec](src/composite/record.spec.ts) and [source](src/composite/record.ts)

### Set

> [spec](src/composite/set.spec.ts) and [source](src/composite/set.ts)

### Tuple

> [spec](src/composite/tuple.spec.ts) and [source](src/composite/tuple.ts)

## Logic

### And

> [spec](src/logic/and.spec.ts) and [source](src/logic/and.ts)

The `and` method (aka _intersection_) is equivalent to the `&` operator. Say you want to describe a type `{ id: string } & { name: string }` then you would write this as

```typescript
const entityWithName = and(
  object({ id: string() }),
  object({ name: string() })
);
```

Such a schema accepts only if all subschemas accept and returns the sum of all validation errors (using the `mergeValidations` method on all subschemas).

> This method is (like the `&`) defined on arbitrary types. However, you most likely need it to combine interfaces. In those cases you are better of using [merge](#merge).

One especially nice feature of this method is that it will generate validations of all branches and merge them into a single validation object (except if you use the `early-exit` option). This is useful when validating forms.

```typescript
const form = refine(
  object({ name: string(), startDate: date(), endDate: date() }),
  ({ startDate, endDate }, { validIf }) => ({
    startDate: validIf(endDate > startDate, "start must be before end"),
  })
);
```

This form expects a name and a date pair. Now the date range is only validated _after_ the whole object is valid. It would be nice however, if the user got instant feedback while he is entering the date range. One way to get around this is by writing

```typescript
const dates = refine(
  object({ startDate: date(), endDate: date() }),
  ({ startDate, endDate }, { validIf }) => ({
    startDate: validIf(endDate > startDate, "start must be before end"),
  })
);
const name = object({ name: string() });
const form = and(dates, name);
```

The form has been split into modules and both describe their validation rules locally. Zap will merge together all validations into one object and a missing name is displayed together with invalid date ranges. This also works well with [merge](#merge).

### Discrimated Union

> [spec](src/logic/discrimiated-union.spec.ts) and [source](src/logic/discrimiated-union.ts)

The discriminated union is similar to the more general [or](#or) operator. While `or` can be applied to any type, the `discrimated union` only works for objects. Say you have CRUD operations like this

```typescript
const commands = [
  object({
    type: literal("create-recipe"),
    recipe: omit(RecipeSchema, "id"),
  }),
  object({
    type: literal("delete-recipe"),
    id: get(RecipeSchema, "id"),
  }),
];
const CreateOrDelete = or(...commands);
```

This creates a schema `CreateOrDelete` schema that will accept either a create or a delete command. Internally, the schema will try to validate against each subschema one after the other. A similar process is done for parsing.

In the `commands` in our example the sole purpose of the `type` attribute is to differentiate the commands from one another. This can be expressed in this way

```typescript
const CreateOrDelete = discriminatedUnion("type", ...commands);
```

which will result in a schema that selects the sub-schema based on the value of the `type` attribute. The matching schema will be used for validation and parsing. This can be slightly more efficient and will also result in clearer validation errors.

### Not

> [spec](src/logic/not.spec.ts) and [source](src/logic/not.ts)

With the `not` operator you can describe a schema like this

```typescript
const schema = and(
  not(object({ a: integer(number()) })),
  object({ a: number() })
);
```

The `not` operator is a `Schema<unknown>` because is does not give any information about the type of the current value. It accepts if the inner schema rejects.

However, we can write a clearer schema using a custom validation

```typescript
const nonNatural = validIf(
  number(),
  (v) => !isInteger(v),
  "must not be an natural number"
);
const schema = object({ a: nonNatural });
```

### Or

> [spec](src/logic/or.spec.ts) and [source](src/logic/or.ts)

The or operator (aka union) is the equivalent to the `|` operator. Say you want to describe a type `number | { name: string }` then you would write this as

```typescript
const numberOrBoxedString = or(number(), object({ name: string() }));
```

Such a schema accepts if at least one subschema accepts. It returns the validation error of the last sub schema. For parsing it finds the first accepting schema and parses the value into this one.

If you just want to create a union of literals you can use the [literals](#literal) method.

### XOR

> [spec](src/logic/xor.spec.ts) and [source](src/logic/xor.ts)

The xor operator is a stricter `or` that accepts if and only if one subschema accepts. It uses that schema for validation and parsing. If more than one schema accepts it returns an xor validation error otherwise it returns the validation error of the last failing sub schema.

## Utility

### Lazy

> [spec](src/utility/lazy.spec.ts) and [source](src/utility/lazy.ts)

If you need to write recursive types you can do this with the `lazy` method

```typescript
interface Category {
  subCategories?: Category[] | undefined;
}
const schema: Schema<Category, Category, { type: "object" }> = lazy(() =>
  object({
    subCategories: optional(array(schema)),
  })
);
```

Note that you need help with the type inference here. Circular types are not supported.

### Optics

> [spec](src/utility/optics.spec.ts) and [source](src/utility/optics.ts)

If you want to access a schema in a nested structure like this

```typescript
const schema = object({
  a: object({
    b: object({
      c: number(),
    }),
  }),
  moreFields: number(),
});
```

you can use the meta object:

```typescript
schema.meta().schema.a.meta().schema.b.meta().schema.c;
```

this is feels cumbersome and a bit hard to read so we built a function `get`

```typescript
get(get(get(schema, "a"), "b"), "c");
```

With this function you can also reach into Maps, Records, Tuples and Procedures. For composite schemas that only have one nested schema like Array, Set and Promise we have `into`. For example

```typescript
into(array(string()));
```

will return the `string()` schema.

> These functions are inspired by [lenses and functional references](https://en.wikibooks.org/wiki/Haskell/Lenses_and_functional_references) but are unfortunately not as powerful. They are directly applied onto a schema, you are only able to reach down one level and you cannot mutate schemas. So not at all optics, but it is the spirit that counts!

If you want to mutate an existing schema you could do that together with `merge` and `omit`

```typescript
merge(omit(schema, "a"), get(get(schema, "a"), "b"));
```

this replaces the field `a` by `c` resulting in a `Schema<{ c: number; moreFields: number(); }>`

### Optional, Required, Nullable & Nullish

> Optional: [spec](src/utility/optional.spec.ts) and [source](src/utility/optional.ts)

To express optional types like `number | undefined` there are several helper functions available.

Here is a list of the type mappings they allow

- _optional()_: `T | undefined`
- _nullable()_: `T | null`
- _nullish()_: `T | undefined | null`
- _required()_: `NonNullable<T>` (that is `T & {}`)

here we also have two narrowing transfomrations

- _defaultValue()_: `defaultValue(optional(number()), 42)` will result in `number` and during parse zap will default to `42`
- _nullToUndefined()_: `nullToUndefined(nullish(number()))` will result in `number | undefined` and default any `null` value to `undefined`

### Partial & DeepPartial

> Partial: [spec](src/utility/partial.spec.ts) and [source](src/utility/partial.ts)
> DeepPartial: [spec](src/utility/deep-partial.spec.ts) and [source](src/utility/deep-partial.ts)

Here we have utility functions to make full objects partial. This is inspired by typescript's `Partial<T>`. For example a schema

```typescript
const schema = object({
  id: number(),
  name: array(string()),
  description: optional(string()),
  nested: object({
    user: string(),
  }),
});
```

will infer to this type

```typescript
type t = {
  id?: number | undefined;
  name?: string[] | undefined;
  nested?:
    | {
        user: string;
      }
    | undefined;
  description?: string | undefined;
};
```

Note how we not only replace `number` by `undefined` but also make the field partial. So `{}` would be a valid object here.

This function will also work for Sets, Arrays, Records, Maps and Tuples and it updates to metadata structure accordingly.

Note that - like `Partial<T>` - the schema only got partialized one level deep. If you want a deeply partialized Schema you can use `deep-partial()`.

### PathValidation

> [spec](src/utility/path-validation.spec.ts) and [source](src/utility/path-validation.ts)

The default validation result is an object that resembles the structure of the schema. While this is quite handy and easy to use in Javascript and Typescript, such a structure is very hard to generate and work with in languages that do not support structural typing (like most running on the JVM).  
This is why we support `PathValidationResult`. A structure like this:

```typescript
const validation = {
  a: {
    b: [undefined, new ValidationIssue(...)]
  }
  c: new ValidationIssue(...)
}
```

would be represented as

```typescript
const pathValidation = [
  { path: ".a.b", issue: new ValidationIssue(...) },
  { path: ".c", issue: new ValidationIssue(...) }
]
```

you can transform between the two representations with `toPathValidation` and `fromPathValidation`.

Special care is taken to also transform `Set` and `Map`. This is mediated using a list of `PathValidationHint`s.

### Readonly

> Readonly: [spec](src/utility/readonly.spec.ts) and [source](src/utility/readonly.ts)

If you want to express a type like

```typescript
type T = {
  a: number;
  readonly b: string;
};
```

You can do so using

```typescript
readonly(object({ a: number(), b: string() }), "b");
```

This will also work for tuples and arrays.

### ToJsonSchema

> [spec](src/utility/to-json-schema.spec.ts) and [source](src/utility/to-json-schema.ts)
