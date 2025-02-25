---
repo: Schniz/infer-types
url: 'https://github.com/Schniz/infer-types'
homepage: ''
starredAt: '2022-02-25T23:26:59Z'
createdAt: '2019-04-17T12:54:02Z'
updatedAt: '2024-05-02T06:32:34Z'
language: TypeScript
license: NA
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:07.565Z'
description: Returns the exported inferred types from TypeScript.
tags: []
---

# `infer-types`

Returns the exported inferred types from TypeScript.

This is a tool to test that the types you expect TypeScript to infer are correct - this is meant to be used in snapshot or plain tests.

## Install

```
npm install --save-dev infer-types
```

## How does it work?

It works by compiling the input file with TypeScript and look for every `@export <name>` declaration:

```ts
/** @export some-name */
const a = "hello";
```

The function returns an object, made from all the `<name>`s as keys, and types - as strings, as the object values, so in the previous example, the object would look like:

```json
{
  "a": "string"
}
```

## Usage

Let's say you have the following file:

```ts
// ./test-file.ts

function apply<T, R>(arg: T, fn: (arg: T) => R) {
  return fn(arg);
}

// apply is a generic function, and we'd like to know that a user that will use
// it, will get type safety and code completion, so no `any` will pop out.
//
// Let's make some test cases:

apply(10, /** @export number => number */ x => x + 1);
apply(10, /** @export number => string */ x => String(x));
apply("hello", /** @export string => number */ x => x.length);

type User = { name: string };
const user: User = { name: "Gal" };

apply(user, /** @export User => number */ x => x.name);
```

And in our testing framework of choice:

```ts
import { getTypes } from "infer-types";

test("infers correctly", () => {
  expect(getTypes("./test-file.ts")).toEqual({
    "number => number": "(x: number) => number",
    "number => string": "(x: number) => string",
    "string => number": "(x: string) => number",
    "User => string": "(x: User) => string"
  });
});
```
