---
repo: samthor/but-csv
url: 'https://github.com/samthor/but-csv'
homepage: 'https://npmjs.com/package/but-csv'
starredAt: '2022-02-16T17:55:30Z'
createdAt: '2022-02-10T13:41:12Z'
updatedAt: '2025-01-31T14:35:36Z'
language: JavaScript
license: Apache-2.0
branch: main
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:23.151Z'
description: 479 byte CSV parser and builder
tags:
  - csv
  - javascript
---

# but-csv

<img src="https://storage.googleapis.com/hwhistlr.appspot.com/assets/but-csv.png" width="64" height="64" align="right" hspace="8" />

479 byte (minified) CSV parser and builder.
Smaller when compressed.
Built in ESM only.

Doesn't care about headers, keyed rows, anything but strings.
Just supports the CSV spec including multi-line and quoted strings.

Does not support:
- `\r\n` (old DOS newlines)
- streaming

If you need those features, try [tiddlycsv](https://www.npmjs.com/package/tiddlycsv), which is a bit bigger.
This package is intentionally tiny, mostly to prove a point.

## Usage

Install via you favourite package manager and import `but-csv`.
Has zero dependencies (obviously).

```bash
$ npm install but-csv
```

### Parse

Parses a CSV into an array of array of strings.
Supports varied line lengths.
Does not convert to numbers or any other formats.

```js
import { parse } from 'but-csv';

const out = parse('foo,bar,zing\n1,2,3\n4,5');
// out will be [['foo', 'bar', 'zing'], ['1', '2', '3'], ['4','5']]
```

Only supports passing a `string` (not a `Buffer` or friends).
Node's operations on `string` are so much faster than on raw bytes (10x improvement).
If you're parsing a file, do this:

```js
const f = fs.readFileSync('source.csv', 'utf-8');
const out = parse(f);
```

### Iterator

Like parse, but you get each row at a time so you can stop early.

```js
import { iter } from 'but-csv';

for (const row of iter('foo,bar,zing\n1,2,3\n4,5')) {
  // row will be an array of:
  // 1. ['foo', 'bar', 'zing'],
  // 2. ['1', '2', '3']
  // 3. ['4','5']
}
```

### Build

You can pass any value and it will be stringified before render, useful for numbers.
This is unlike the parser above, which only returns strings.

```js
import { build } from 'but-csv';

const out = build([
  ['hello', 'there"\n'],
  [1, 2],
]);

// out will be:
// hello,"there""
// "
// 1,2
```

## Advanced

Be sure to turn on your bundler's tree-shaking ability (good practice in general), but especially if you're only parsing _or_ building, because the code is separate.
Parsing is about 75% of the code, and building 25%.

## Speed

It's very fast, but doesn't support streaming.
To parse multiple copies of [1.csv](https://github.com/Keyang/csvbench/blob/master/1.csv) from here, parsing all at once:

```
but-csv: 732.908ms
papaparse: 1.337s (1.8x)
csv-parser: 2.283s (3.1x)
```
