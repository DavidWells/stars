---
repo: Hexagon/minitz
url: 'https://github.com/Hexagon/minitz'
homepage: 'http://minitz.56k.guru/'
starredAt: '2022-09-25T20:25:50Z'
createdAt: '2022-09-07T20:37:57Z'
updatedAt: '2024-07-15T12:15:35Z'
language: JavaScript
license: MIT
branch: main
stars: 22
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:28.852Z'
description: >-
  Minimal utility to convert to or from any timezone. Deno/Node/Browser.
  ESM/CommonJS.
tags:
  - commonjs-modules
  - date
  - es-module
  - esm
  - javascript
  - time
  - timezone-conversion
  - typescript
---

# minitz

[![Node.js CI](https://github.com/Hexagon/minitz/actions/workflows/node.js.yml/badge.svg)](https://github.com/Hexagon/minitz/actions/workflows/node.js.yml) [![Deno CI](https://github.com/Hexagon/minitz/actions/workflows/deno.yml/badge.svg)](https://github.com/Hexagon/minitz/actions/workflows/deno.yml)
[![npm version](https://badge.fury.io/js/minitz.svg)](https://badge.fury.io/js/minitz) [![NPM Downloads](https://img.shields.io/npm/dm/minitz.svg)](https://www.npmjs.org/package/minitz) [![jsdelivr](https://data.jsdelivr.com/v1/package/gh/hexagon/minitz/badge?style=rounded)](https://www.jsdelivr.com/package/gh/hexagon/minitz) [![Codacy Badge](https://app.codacy.com/project/badge/Grade/4978bdbf495941c087ecb32b120f28ff)](https://www.codacy.com/gh/Hexagon/minitz/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Hexagon/minitz&amp;utm_campaign=Badge_Grade)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Hexagon/minitz/blob/main/LICENSE)

Minitz offers an efficient way to manage and manipulate time zone in native JavaScript Date objects. With a modern ES-module design and full typings, minitz is compatible with any environment that supports JavaScript or TypeScript. Highlights:

*   Convert dates between any timezone supported by the system.
*   Parses ISO8601 time strings.
*   MIT licensed, use the library any way you want. For real.
*   Minimal (less than 2 KB minified), no dependencies. Relies on JavaScript Intl and current best practices.
*   Works in Node.js >=14.0 (both require and import).
*   Works in Deno >=1.8.
*   Works in Bun >=0.2.2
*   Works in browsers as standalone, UMD or ES-module.
*   Includes [TypeScript](https://www.typescriptlang.org/) typings.

Try Minitz live on [jsfiddle](https://jsfiddle.net/hexag0n/3mheu5by/)

Check out the full documentation at [minitz.56k.guru](https://minitz.56k.guru)

## Usage

While converting a Date object to another timezone in JavaScript is achievable using the Intl feature of vanilla JS, things can get complicated when you want to convert date/time from another timezone or between different timezones. See the following examples:

Vanilla js for converting **to** a specific time zone:

```javascript
// Get current time in Asia/Tokyo, using vanilla js
new Date().toLocaleString("sv-SE", { timeZone: "Asia/Tokyo" });
// -> 2022-09-15 17:23:45
```

Using minitz to convert **from** and **across** different time zones:

```javascript
// Get local time from time in Asia/Tokyo, using minitz and vanilla js
const localTime = minitz(2022,9,15,23,0,0,"Asia/Tokyo")
console.log( localTime.toLocaleString("sv-SE") );
// -> 2022-09-15 16:00:00
```

```javascript
// Get time in America/New_York from time in Asia/Tokyo, using minitz and vanilla js
// Also demonstrates that it's possible to use ISO8601 strings as input to minitz, 
// through `.fromTZISO`
const localTime = minitz.fromTZISO("2022-09-15 23:00:00","Asia/Tokyo");
console.log( localTime.toLocaleString("sv-SE", { timeZone: "America/New_York" }) );
// -> 2022-09-15 10:00:00
```

## Installation

Details on installation for various platforms, including Node.js, Deno, Bun, and browsers, can be found in the [full documentation](https://minitz.56k.guru). A few installation commands are:

Node.js: `npm install minitz`

Deno: `import minitz from "https://deno.land/x/minitz@4.0.6/src/minitz.js";`

Bun: `bun add minitz`

For CDN, refer to the documentation.

## Contributing

Any contributions are welcome. See the [Contribution guide](https://minitz.56k.guru/contributing.html) to get started.

## Donations

If you found this library helpful and wish to support its development, consider making a donation through [Hexagon's GitHub Sponsors page](https://github.com/sponsors/hexagon). Your generosity ensures the library's continued development and maintenance.

## License

MIT
