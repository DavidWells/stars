---
repo: AsyncBanana/micropatch
url: 'https://github.com/AsyncBanana/micropatch'
homepage: null
starredAt: '2022-01-12T01:54:53Z'
createdAt: '2022-01-12T01:48:44Z'
updatedAt: '2024-12-11T02:06:26Z'
language: JavaScript
license: MIT
branch: master
stars: 14
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:22.014Z'
description: null
tags: []
---

<div align="center">

![Micropatch Logo](https://raw.githubusercontent.com/AsyncBanana/micropatch/master/Logo.svg)

Micropatch is a [Microdiff](https://github.com/AsyncBanana/microdiff) compatible patching library that is small (<1kb minified) and simple to use.

![Minizipped Size (from Bundlephobia)](https://img.shields.io/bundlephobia/minzip/micropatch?style=flat-square) ![License](https://img.shields.io/npm/l/micropatch?style=flat-square) ![dependency Count](https://img.shields.io/badge/dependencies-0-green?style=flat-square)

</div>

# Get started

First, install Micropatch and [Microdiff]() if you want to generate patch statements

```
npm i micropatch
npm i microdiff <- only do this if you want diffing to generate patch statements
```

After you install it, simply import it and run it on two objects.

```js
import patch from "micropatch";
import diff from "microdiff";
const obj1 = {
	originalProperty: true,
};
const obj2 = {
	originalProperty: false,
	newProperty: "new"
};
console.log(patch(obj1,[{type: "CREATE", path: ["newProperty"], value: "new"}])); // using diffs from other sources
/* {
	originalProperty: true,
	newProperty: "new"
} */
console.log(patch(obj1,diff(obj1,obj2))) // using Microdiff
/* {
	originalProperty: true,
	newProperty: "new"
} */
```

If you are using CommonJS, you can import it like this:

```js
const diff = require("micropatch").default;
```

Micropatch takes two parameters, the original/target object and an array of Microdiff diffs. It returns the new object with the diffs applied.

> ⚠️ Warning: The original object is mutated. If you wish for it to be immutable, you can pass a clone of the object. However, the mutations are unreliable, so you should rely on the return value rather than the mutations.

# Credits

@FluentCoding created the original implementation of this patch method.
