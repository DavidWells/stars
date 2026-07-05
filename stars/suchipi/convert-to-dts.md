---
repo: suchipi/convert-to-dts
url: 'https://github.com/suchipi/convert-to-dts'
homepage: null
starredAt: '2022-03-03T04:52:29Z'
createdAt: '2022-02-25T20:26:12Z'
updatedAt: '2022-03-03T19:56:16Z'
language: TypeScript
license: MIT
branch: main
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:03.430Z'
description: >-
  Convert some JavaScript/TypeScript code string into a .d.ts TypeScript
  Declaration code string
tags: []
---

# convert-to-dts

Converts the source code for any `.js` or `.ts` file into the equivalent `.d.ts` code TypeScript would generate.

## Usage

```js
import { convertToDeclaration } from "convert-to-dts";

const code = `
  import fs from "fs";
  import path from "path";

  /**
   * Comment :D
   */
  export class Something {
    blah!: typeof path;

    constructor() {
      console.log("hi");
    }
  }
`;

const converted = convertToDeclaration(code);
console.log(converted);

// Logs:
//
// import path from "path";
// /**
//  * Comment :D
//  */
// export declare class Something {
//     blah: typeof path;
//     constructor();
// }
```

## API Documentation

Please see [api/index.d.ts](https://github.com/suchipi/convert-to-dts/blob/main/api/index.d.ts) for API documentation. There are lots of comments.

## License

MIT
