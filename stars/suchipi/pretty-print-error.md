---
repo: suchipi/pretty-print-error
url: 'https://github.com/suchipi/pretty-print-error'
homepage: null
starredAt: '2022-02-24T04:18:48Z'
createdAt: '2022-02-19T11:53:30Z'
updatedAt: '2023-10-18T15:33:56Z'
language: TypeScript
license: MIT
branch: main
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:12.163Z'
description: Formats errors as nice strings with colors
tags: []
---

# pretty-print-error

A little function that formats an error object as a nice, readable string. Works in node and the browser; in node, it will use [kleur](https://www.npmjs.com/package/kleur) to add ANSI color code escape sequences to the output string, to make it easier to read.

## Features

- Works in both node and the browser
- Browser version is only ~2k
- Error name and stack are printed in color
- Handles non-error inputs gracefully (accepts `unknown` in TypeScript)
- Also prints any additional properties that were added to the Error object
  - This is particularly nice when working with node's `fs` errors; node sometimes puts the information about eg "which file couldn't be read" is sometimes in a property on the error, rather than in the error message, so by printing additional properties, it's guaranteed to be visible.

## Example

![Sample output of using pretty-print-error in the node repl. See the "Usage" section below for the code used in this screenshot.](https://user-images.githubusercontent.com/1341513/154799473-7189121d-cf5f-41f3-851c-3d358ec365a9.png)

## Installation

```
npm install pretty-print-error
```

## Usage

```ts
import { formatError } from "pretty-print-error";

const error = new Error("uh oh!");

error.context = {
  user: "jeff",
  session: "ewnj75hvj3v4tvmuy43er",
  favoriteIceCreamFlavor: "pineapple",
};

console.log(formatError(error));
/*
  Logs:

  Error: uh oh!
    at REPL2:1:9
  The above error also had these properties on it:
  {
    context: {
      user: 'jeff',
      session: 'ewnj75hvj3v4tvmuy43er',
      favoriteIceCreamFlavor: 'pineapple'
    }
  }
*/
```

## License

MIT
