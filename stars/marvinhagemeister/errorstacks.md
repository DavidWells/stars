---
repo: marvinhagemeister/errorstacks
url: 'https://github.com/marvinhagemeister/errorstacks'
homepage: null
starredAt: '2021-11-22T04:46:38Z'
createdAt: '2020-04-03T20:13:26Z'
updatedAt: '2024-12-23T05:23:39Z'
language: TypeScript
license: MIT
branch: main
stars: 105
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:35.802Z'
description: Tiny library to parse error stack traces
tags:
  - error
  - parser
  - parsing
  - stacktracke
---

# errorstacks

Simple parser for Error stack traces.

Currently supported browsers/platforms:

- Firefox
- Chrome
- Edge
- Node

## Usage

Install `errorstacks` via your package manager of choice. Here we'll use `npm`.

```bash
npm install errorstacks
```

Example code:

```js
import { parseStackTrace } from 'errorstacks';

function foo() {
  throw new Error('fail');
}

try {
  foo();
} catch (err) {
  const parsed = parseStackTrace(err.stack);
  console.log(parsed);
  // Logs:
  // [
  //   {
  //     line: 4,
  //     column: 8,
  //     type: '',
  //     name: 'foo',
  //     raw: '    at foo (/my-project/foo.ts:4:8)'
  //   },
  // ]
```

_Note: `type` will be the string `"native"` if native code execution was detected._

## License

MIT, see [the license file](./LICENSE)
