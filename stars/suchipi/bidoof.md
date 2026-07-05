---
repo: suchipi/bidoof
url: 'https://github.com/suchipi/bidoof'
homepage: null
starredAt: '2022-02-24T04:29:40Z'
createdAt: '2022-01-31T02:25:21Z'
updatedAt: '2022-02-24T04:29:40Z'
language: TypeScript
license: NA
branch: main
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:12.116Z'
description: value matching and transforming tool
tags: []
---

# bidoof

Bidoof is a value matching and transforming tool that you can use to declaratively describe patches to apply to arbitrary values.

API documentation is TODO, but here's a taste:

```ts
import { makeBidoof, merge, transform, set, replace, t } from "bidoof";

const bidoof = makeBidoof([
  // For any object with a meta property that is an object with a name property that is the string "bobby":
  { meta: { name: "bobby" } },
  // Set the property "something.blah" to 67, and deep-merge an object into it:
  set("something.blah", 67),
  merge({ nums: [3] }),

  // For any number:
  Number,
  // Increase its value by 56
  transform((value) => value + 56),

  // For any object described by this type:
  t.tuple(
    t.number,
    t.string,
    t.object({
      height: t.number,
    })
  ),
  // Replace the entire object:
  replace("hi there :)"),
]);

// Run bidoof over all the inputs:
const inputs = [
  { meta: { name: "bobby" }, nums: [1, 2] },
  { name: "freddy" },
  45,
  "dsjfkldsjkfl",
  [45, "dsjkfs", { height: 43785 }],
  [45, "dsjkfs", { height: "43785" }],
];

console.log(inputs.map(bidoof));
// Prints:
// [
//   { meta: { name: 'bobby' }, nums: [ 3, 2 ], something: { blah: 67 } },
//   { name: 'freddy' },
//   101,
//   'dsjfkldsjkfl',
//   'hi there :)',
//   [ 45, 'dsjkfs', { height: '43785' } ]
// ]
```
