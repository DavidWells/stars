---
repo: suchipi/has-shape
url: 'https://github.com/suchipi/has-shape'
homepage: null
starredAt: '2022-08-10T23:12:18Z'
createdAt: '2022-08-10T22:38:23Z'
updatedAt: '2023-04-21T23:28:01Z'
language: JavaScript
license: MIT
branch: main
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:37.869Z'
description: >-
  Very tiny function that checks if an object/array/value is shaped like
  another, with TypeScript type refining.
tags: []
---

# `@suchipi/has-shape`

Very tiny (~200B before minification/compression) function that checks if an object/array/value is shaped like another, with TypeScript type refining.

```ts
import { hasShape } from "@suchipi/has-shape";

const someObj = {
  sheep: true,
  cows: ["betsy", "donna"],
  tags: {
    something: {
      active: true,
      description: "Something",
    },
    anotherThing: {
      active: false,
      description: "Another thing",
    },
  },
};

hasShape(someObj, { tags: { something: { active: true } } }); // true
hasShape(someObj, { tags: { something: { active: false } } }); // false
hasShape(someObj, { tags: { something: { blahbla: true } } }); // false; no blahbla property present
hasShape(someObj, { cows: { 0: "betsy" } }); // true; property keys are used for both objects and arrays
hasShape(someObj, { cows: { 0: "donna" } }); // false; donna is at property '1'
hasShape(someObj, { cows: { length: 2 } }); // true; reading property "length" from Array returns matching value
hasShape(someObj, { cows: { length: 4 } }); // false
hasShape(someObj, { tags: {} }); // true; validates it's a non-null object, but nothing else
```

## Logic

The function behaves as follows:

- Consider a function `hasShape` which receives `input` and `shape`, defined as follows:
- If `input` is a primitive value, return `input === shape`.
- Otherwise, return true if `hasShape(input[property], shape[property])` is true for every own property in `shape`.

## TypeScript

`hasShape` will tell TypeScript that the object has the specified shape if you put it in an `if`, like so:

```ts
import { hasShape } from "@suchipi/has-shape";

function runJob(
  options?:
    | { kind: "User"; name: string; id: number }
    | { kind: "Ticket"; ticket: string }
) {
  // `options` could be one of a few things
  if (hasShape(options, { kind: "User" })) {
    // Within this block, TypeScript knows `options` is `{ kind: "User", name: string, id: number }`,
    // because that's the only value in the union that could have returned true from hasShape.
  } else {
    // Within this block, TypeScript knows `options` could be `undefined` or `{ kind: "Ticket", ticket: string }`
    // here, and knows it could not be `{ kind: "User", name: string, id: number }`, because if it was,
    // the other block would have been taken instead of this one.
  }
}
```

This is most useful for deep structures with many different potential but distinguishable shapes, like ASTs:

```ts
import { traverse } from "@babel/traverse";
import { parse } from "@babel/parser";
import { hasShape } from "@suchipi/has-shape";

const someCode = "...";
const ast = parse(someCode);
traverse(ast, {
  CallExpression(path) {
    if (
      hasShape(path.node, {
        callee: {
          type: "Identifier",
          name: "require",
        },
        arguments: {
          length: 1,
          0: {
            type: "StringLiteral",
            value: "hello",
          },
        },
      })
    ) {
      // We now know it's a path pointing to a node with the shape `require("hello")`,
      // and TypeScript will let us treat it as such:
      console.log(path.node.callee.arguments[0].value); // No type or runtime errors!
    }
  },
});
```

If your shape is gonna be stored in a variable instead of being put directly in the function call, put `as const` at the end of the variable declaration, otherwise TypeScript won't "know" everything (ie. type refinement might not work well enough):

```ts
const targetShape = { blah: { wow: { isCool: true } } } as const;

hasShape(something, targetShape);
```

Additionally, if you're using an older version of TypeScript, you might need to add `as const` even if you're not storing it in a variable:

```ts
// If TypeScript doesn't seem to behave correctly when you do this:
hasShape(something, { blah: { wow: { isCool: true } } });
// Then do this instead:
hasShape(something, { blah: { wow: { isCool: true } } } as const);
```

## License

MIT
