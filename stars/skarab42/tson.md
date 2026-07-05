---
repo: skarab42/tson
url: 'https://github.com/skarab42/tson'
homepage: ''
starredAt: '2022-03-19T17:55:24Z'
createdAt: '2022-03-12T15:28:33Z'
updatedAt: '2024-02-28T04:36:13Z'
language: TypeScript
license: MIT
branch: main
stars: 10
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:57.418Z'
description: Type Safe Object Notation & Validation
tags:
  - javascript
  - json
  - schema
  - serialization
  - type-safe
  - type-safety
  - typescript
  - validation
---

# tson

**Type Safe Object Notation & Validation**

[![Test and Lint](https://github.com/skarab42/tson/actions/workflows/CI.yaml/badge.svg)](https://github.com/skarab42/tson/actions/workflows/CI.yaml) [![codecov](https://codecov.io/gh/skarab42/tson/branch/main/graph/badge.svg?token=4PSFJBVAFB)](https://codecov.io/gh/skarab42/tson) ![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/skarab42/tson?color=success&style=flat) ![GitHub](https://img.shields.io/github/license/skarab42/tson?color=success) [![GitHub Sponsors](https://img.shields.io/github/sponsors/skarab42?color=ff69b4&label=%E2%9D%A4%20sponsors%20)](https://github.com/sponsors/skarab42) [![Twitch Status](https://img.shields.io/twitch/status/skarab42?style=social)](https://www.twitch.tv/skarab42)

📌 Work in Progress, not ready for production...

## Features

- 🧱 Functional
- 🔷 Immutable
- ✅ Well tested

## Why?

After a contribution to the [tRPC](https://github.com/trpc/trpc) project, I wanted to understand more deeply the use of generics and inference in TypeScript.
I needed a challenge so I set myself the goal of coding my own schema validation library.
This library is heavily inspired by [Zod](https://github.com/colinhacks/zod) (_I try to provide the same API_) but in order to avoid cloning it, I challenged myself to not use any classes.

# Install

```bash
pnpm add @skarab/tson
```

_`yarn` and `npm` also works_

## ES and CommonJS module

```ts
import { t } from "tson";
```

```ts
const { t } = require("tson");
```

# Examples

```ts
import { t } from "tson";

const name = t.string();

name.parse("nyan"); // return "nyan"
name.parse(42); // throw TypeCheckError
```

```ts
import { t } from "tson";

const user = t.object({
  name: t.string(),
  age: t.number(),
  admin: t.boolean(),
});

user.parse({ name: "nyan", age: 42, admin: true });

type User = t.infer<typeof user>;
// { name: string, age: number, admin: boolean }
```

# Strict mode

## TypeScript

It is strongly recommended to activate the [strict](https://www.typescriptlang.org/tsconfig#strict) mode of TypeScript which will activate all checking behaviours that results in stronger guarantees of the program's correctness.

## tson

By default `tson` parse objects in `STRICT` mode, this means that all undefined values in a scheme will be considered as an error. You can change this behaviour globally or locally, the procedure is documented [here](#objectschema-mode).

# Table of contents

- [tson](#tson)
  - [Features](#features)
  - [Why?](#why)
- [Install](#install)
  - [ES and CommonJS module](#es-and-commonjs-module)
- [Examples](#examples)
- [Strict mode](#strict-mode)
  - [TypeScript](#typescript)
  - [tson](#tson-1)
- [Table of contents](#table-of-contents)
- [API](#api)
  - [First level types](#first-level-types)
    - [Primitive types](#primitive-types)
    - [Numbers types](#numbers-types)
    - [Empty types](#empty-types)
    - [Catch-all types](#catch-all-types)
    - [Never type](#never-type)
  - [literal(value)](#literalvalue)
  - [array(type)](#arraytype)
  - [tuple(...type)](#tupletype)
  - [tuple(type[])](#tupletype-1)
  - [tuple(type[] as const)](#tupletype-as-const)
  - [object(schema)](#objectschema)
  - [object(schema, mode)](#objectschema-mode)
  - [object helpers](#object-helpers)
    - [.strict()](#strict)
    - [.strip()](#strip)
    - [.passthrough()](#passthrough)
  - [union(...type)](#uniontype)
  - [union(type[])](#uniontype-1)
  - [union(type[] as const)](#uniontype-as-const)
  - [optional(type)](#optionaltype)
  - [enum(...string)](#enumstring)
    - [Access enum properties](#access-enum-properties)
    - [Access enum values](#access-enum-values)
    - [Test enum values](#test-enum-values)
    - [Infer enum type](#infer-enum-type)
  - [enum(string[])](#enumstring-1)
  - [enum(string[] as const)](#enumstring-as-const)
  - [enum(object)](#enumobject)
  - [enum(object as const)](#enumobject-as-const)
  - [enum(enum)](#enumenum)
  - [nativeEnum(enum)](#nativeenumenum)
  - [instanceof(type)](#instanceoftype)
  - [date()](#date)
  - [record(type)](#recordtype)
  - [set(type)](#settype)
  - [set(...type)](#settype-1)
  - [set([type, ...type])](#settype-type)
  - [map(keyType, valueType)](#mapkeytype-valuetype)
  - [map(schema)](#mapschema)
  - [promise(type)](#promisetype)
  - [function()](#function)
  - [function(args)](#functionargs)
  - [function(args, returns)](#functionargs-returns)
  - [function(args, returns, implement)](#functionargs-returns-implement)
  - [preprocess(filter, type)](#preprocessfilter-type)
  - [postprocess(filter, type)](#postprocessfilter-type)
  - [postprocess(filter, inputType, outputType)](#postprocessfilter-inputtype-outputtype)
- [Type helpers](#type-helpers)
  - [safeParse(input)](#safeparseinput)
  - [optional()](#optional)
  - [preprocess()](#preprocess)
  - [postprocess()](#postprocess)
- [Contributing 💜](#contributing-)

# API

## First level types

### Primitive types

```ts
t.string();
t.number();
t.bigint();
t.boolean();
t.symbol();
t.date();
```

### Numbers types

```ts
t.nan();
t.finite();
t.infinity();
t.integer(); // Alias: int()
t.unsignedNumber(); // Alias: unumber()
t.unsignedInteger(); // Alias: uinteger(), uint()
```

### Empty types

```ts
t.undefined();
t.null();
t.void();
```

### Catch-all types

```ts
t.any();
t.unknown();
```

### Never type

```ts
t.never();
```

## literal(value)

```ts
const life = t.literal(42);
const love = t.literal(true);
const name = t.literal("nyan");

life.value; // type => 42
```

## array(type)

```ts
const arr1 = t.array(t.string()); // string[]
const arr2 = t.array(t.boolean()); // boolean[]
```

## tuple(...type)

```ts
const tpl = t.tuple(t.string(), t.number(), t.string()); // [string, number, string]
```

## tuple(type[])

```ts
const tpl = t.tuple([t.string(), t.number(), t.string()]); // [string, number, string]
```

💔 The following code does not work, TypeScript can not infer array values properly. Use the `as const` workaround to do this.

```ts
const types = [t.string(), t.number(), t.string()];
const tpl = t.tuple(types); // [string, number, string]
```

## tuple(type[] as const)

```ts
const types = [t.string(), t.number(), t.string()] as const;
const tpl = t.tuple(types); // [string, number, string]
```

## object(schema)

```ts
const user = t.object({
  name: t.string(),
  age: t.number(),
  admin: t.boolean(),
});

type User = t.infer<typeof user>;
// { name: string, age: number, admin: boolean }
```

## object(schema, mode)

By default `tson` parse objects in `STRICT` mode, but you can change the mode globally or locally.

There are three modes:

- `STRICT`: Will raise an error if a key is not defined in the schema.
- `STRIP`: Strips undefined keys from the result and does not raise an error.
- `PASSTHROUGH`: Keeps undefined keys and does not raise an error.

Change the default mode globally.

```ts
t.defaultSettings.objectTypeMode = t.ObjectTypeMode.STRIP;
```

Change the mode locally.

```ts
const schema = { a: t.string(), b: t.string() };
const input = { a: "a", b: "b", c: "c" };

const user = t.object(schema, t.ObjectTypeMode.STRICT);
user.parse(input); // throws an TypeParseError

const user = t.object(schema, t.ObjectTypeMode.STRIP);
user.parse(input); // { a: string, b: string }

const user = t.object(schema, t.ObjectTypeMode.PASSTHROUGH);
user.parse(input); // { a: string, b: string, c: string }
```

## object helpers

### .strict()

```ts
t.object(schema).strict();
// same as
t.object(schema, t.ObjectTypeMode.STRICT);
```

### .strip()

```ts
t.object(schema).strip();
// same as
t.object(schema, t.ObjectTypeMode.STRIP);
```

### .passthrough()

```ts
t.object(schema).passthrough();
// same as
t.object(schema, t.ObjectTypeMode.PASSTHROUGH);
```

## union(...type)

```ts
const uni = t.union(t.string(), t.number()); // string | number
```

## union(type[])

```ts
const tpl = t.union([t.string(), t.number(), t.string()]); // string | number
```

💔 The following code does not work, TypeScript can not infer array values properly. Use the `as const` workaround to do this.

```ts
const types = [t.string(), t.number(), t.string()];
const tpl = t.union(types); // string | number
```

## union(type[] as const)

```ts
const types = [t.string(), t.number(), t.string()] as const;
const tpl = t.union(types); // string | number
```

## optional(type)

```ts
const user = t.object({
  name: t.string(),
  age: t.optional(t.number()),
});
// { name: string, age?: number }
```

## enum(...string)

```ts
const myEnum = t.enum("UP", "DOWN", "LEFT", "RIGHT");
```

### Access enum properties

```ts
myEnum.enum.UP; // === "UP"
myEnum.enum.PLOP; // error: PLOP does not exists
myEnum.enum.DOWN = "prout"; // error: it is read-only

(property) enum: {
  readonly UP: "UP";
  readonly DOWN: "DOWN";
  readonly LEFT: "LEFT";
  readonly RIGHT: "RIGHT";
}
```

### Access enum values

```ts
myEnum.options[1]; // === "DOWN"

(property) options: ["UP", "DOWN", "LEFT", "RIGHT"]
```

### Test enum values

```ts
myEnum.parse(myEnum.enum.LEFT); // => "LEFT"
myEnum.parse("LEFT"); // => "LEFT"
myEnum.parse("2"); // => "LEFT"
myEnum.parse(2); // => "LEFT"
myEnum.parse("PLOP"); // error: expected '0|1|2|3|UP|DOWN|LEFT|RIGHT' got 'string'
```

### Infer enum type

```ts
type MyEnum = t.infer<typeof myEnum>; // => "UP" | "DOWN" | "LEFT" | "RIGHT"

function move(direction: MyEnum) {
  // direction === "DOWN"
}

move(myEnum.enum.DOWN);
```

## enum(string[])

```ts
const myEnum = t.enum(["UP", "DOWN", "LEFT", "RIGHT"]);
```

💔 The following code does not work, TypeScript can not infer array values properly. Use the `as const` workaround to do this.

```ts
const values = ["UP", "DOWN", "LEFT", "RIGHT"];
const myEnum = t.enum(values);
```

## enum(string[] as const)

```ts
const myEnum = t.enum(["UP", "DOWN", "LEFT", "RIGHT"] as const);
```

```ts
const values = ["UP", "DOWN", "LEFT", "RIGHT"] as const;
const myEnum = t.enum(values);
```

## enum(object)

```ts
const myEnum = t.enum({ UP: "UP", DOWN: "DOWN", LEFT: 42, RIGHT: 43 });
```

💔 The following code does not work, TypeScript can not infer object properties properly. Use the `as const` workaround to do this.

```ts
const values = { UP: "UP", DOWN: "DOWN", LEFT: 42, RIGHT: 43 };
const myEnum = t.enum(values);
```

## enum(object as const)

```ts
const values = { UP: "UP", DOWN: "DOWN", LEFT: 42, RIGHT: 43 } as const;
const myEnum = t.enum(values);
```

## enum(enum)

```ts
enum MyEnum {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = 42,
  RIGHT,
}

const myEnum = t.enum(MyEnum);
```

## nativeEnum(enum)

Alias: `enum(enum)`

```ts
enum MyEnum {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = 42,
  RIGHT,
}

const myEnum = t.nativeEnum(MyEnum);
```

## instanceof(type)

```ts
class MyClass {}

const instance = new MyClass();

t.instanceof(MyClass).parse(instance); // passes
t.instanceof(MyClass).parse("nyan"); // fail
```

## date()

```ts
t.date().parse(new Date()); // passes
t.date().parse("2022-01-12T00:00:00.000Z"); // passes
t.date().parse("not a string date"); // fail
```

## record(type)

```ts
t.record(t.string()); // { [x: string]: string }
t.record(t.number()); // { [x: string]: number }
t.record(t.date()); // { [x: string]:  Date }
```

## set(type)

Testing a single type on the entire set

```ts
t.set(t.string()); // Set<string>
```

Testing a union of types on the entire set

```ts
t.set(t.union(t.string(), t.boolean(), t.string())); // Set<string|boolean>
```

## set(...type)

Same as [tuple(...type)](#tupletype) but test if the input is an instance of Set.

## set([type, ...type])

Testing a tuple of types on the Set

```ts
t.set(t.string(), t.boolean(), t.string()); // Set<[string, boolean, string]>
t.set([t.string(), t.boolean(), t.string()]); // Set<[string, boolean, string]>
```

## map(keyType, valueType)

```ts
t.map(t.string(), t.number()); // Map<string, number>
t.map(t.date(), t.string()); // Map<Date, string>
```

## map(schema)

Same as [object(schema)](#objectschema) but test if the input is an instance of Map.

```ts
const map = new Map();

t.map({ name: t.string(), size: t.string() }).parse(map);
```

## promise(type)

```ts
const promise = t.promise(t.number());

await promise.parse(Promise.resolve(42)); // resolve: 42
await promise.parse(Promise.resolve("42")); // reject: expected 'number' got 'string'
await promise.parse(42); // reject: expected 'Promise' got 'number'
```

## function()

```ts
const func = t.function();

type Func = t.infer<typeof func>; // () => void
```

## function(args)

```ts
const func = t.function([t.string(), t.number()]);

type Func = t.infer<typeof func>; // (arg_0: string, arg_1: number) => void
```

## function(args, returns)

```ts
const func = t.function([t.string()], t.boolean());

type Func = t.infer<typeof func>; // (arg_0: string) => boolean
```

## function(args, returns, implement)

```ts
const args = [t.string(), t.boolean()] as const;

const returns = t.union(t.string(), t.number());

const func = t.function(args, returns, (input, toInt) => {
  // input type is string and toInt type is boolean
  return toInt ? parseInt(input) : input.toUpperCase();
});

type Func = t.infer<typeof func>; // (arg_0: string, arg_1: boolean) => string | number
```

## preprocess(filter, type)

If you want to modify the input before it is parsed you can use the `preprocess` type as follows.

```ts
const toString = t.preprocess((input) => String(input), t.string());

toString.parse("42"); // => "42"
toString.parse(42); // => "42"
```

## postprocess(filter, type)

If you want to modify the output after it is parsed you can use the `postprocess` type as follows.

```ts
const postprocess = t.postprocess((input) => input + 2, t.number());

postprocess.parse(40); // => 42
postprocess.parse("42"); // throws: "expected 'number' got 'string'"
```

## postprocess(filter, inputType, outputType)

If you want to modify the output after it is parsed you can use the `postprocess` type as follows.

```ts
const postprocess = t.postprocess(
  (input) => String(input),
  t.number(),
  t.string(),
);

postprocess.parse(40); // => "42"
postprocess.parse("42"); // => throws: "expected 'number' got 'string'"
```

# Type helpers

## safeParse(input)

If you want to avoid the parse method throws an error you can use the `.safeParse()` method instead.

```ts
t.bigint().safeParse(42n);
// => { success: true, data: 42n }

t.bigint().safeParse(42);
// => {
//   "error": [TypeParseError: expected 'bigint|undefined' got 'number'],
//   "success": false,
// }
```

## optional()

```ts
t.bigint().optional(); // => bigint | undefined

// same as
t.optional(t.bigint());
```

## preprocess()

```ts
t.string().preprocess((input) => String(input));

// same as
t.preprocess((input) => String(input), t.string());
```

## postprocess()

Alias: `.transform()`

```ts
t.number().postprocess((input) => input + 2);

// same as
t.postprocess((input) => input + 2, t.number());
```

# Contributing 💜

See [CONTRIBUTING.md](https://github.com/skarab42/tson/blob/main/CONTRIBUTING.md)
