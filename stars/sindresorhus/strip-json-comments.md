---
repo: sindresorhus/strip-json-comments
url: 'https://github.com/sindresorhus/strip-json-comments'
homepage: ''
starredAt: '2022-01-07T17:31:16Z'
createdAt: '2013-11-17T15:04:17Z'
updatedAt: '2025-02-12T08:18:58Z'
language: JavaScript
license: MIT
branch: main
stars: 602
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:22.808Z'
description: Strip comments from JSON. Lets you use comments in your JSON files!
tags:
  - json
  - json-comments
  - jsonc
  - npm-package
---

# strip-json-comments

> Strip comments from JSON. Lets you use comments in your JSON files!

This is now possible:

```js
{
	// Rainbows
	"unicorn": /* ❤ */ "cake"
}
```

It will replace single-line comments `//` and multi-line comments `/**/` with whitespace. This allows JSON error positions to remain as close as possible to the original source.

Also available as a [Gulp](https://github.com/sindresorhus/gulp-strip-json-comments)/[Grunt](https://github.com/sindresorhus/grunt-strip-json-comments)/[Broccoli](https://github.com/sindresorhus/broccoli-strip-json-comments) plugin.

## Install

```sh
npm install strip-json-comments
```

## Usage

```js
import stripJsonComments from 'strip-json-comments';

const json = `{
	// Rainbows
	"unicorn": /* ❤ */ "cake"
}`;

JSON.parse(stripJsonComments(json));
//=> {unicorn: 'cake'}
```

## API

### stripJsonComments(jsonString, options?)

#### jsonString

Type: `string`

Accepts a string with JSON and returns a string without comments.

#### options

Type: `object`

##### trailingCommas

Type: `boolean`\
Default: `false`

Strip trailing commas in addition to comments.

##### whitespace

Type: `boolean`\
Default: `true`

Replace comments and trailing commas with whitespace instead of stripping them entirely.

## Benchmark

```sh
npm run bench
```

## Related

- [strip-json-comments-cli](https://github.com/sindresorhus/strip-json-comments-cli) - CLI for this module
- [strip-css-comments](https://github.com/sindresorhus/strip-css-comments) - Strip comments from CSS
