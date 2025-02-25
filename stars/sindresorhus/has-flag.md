---
repo: sindresorhus/has-flag
url: 'https://github.com/sindresorhus/has-flag'
homepage: null
starredAt: '2022-02-14T01:21:10Z'
createdAt: '2015-07-07T22:40:40Z'
updatedAt: '2025-01-07T20:11:11Z'
language: JavaScript
license: MIT
branch: main
stars: 94
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:23.492Z'
description: Check if argv has a specific flag
tags: []
---

# has-flag

> Check if [`argv`](https://nodejs.org/docs/latest/api/process.html#process_process_argv) has a specific flag

## Install

```
$ npm install has-flag
```

## Usage

```js
// foo.js
import hasFlag from 'has-flag';

hasFlag('unicorn');
//=> true

hasFlag('--unicorn');
//=> true

hasFlag('f');
//=> true

hasFlag('-f');
//=> true

hasFlag('foo=bar');
//=> true

hasFlag('foo');
//=> false

hasFlag('rainbow');
//=> false
```

```
$ node foo.js -f --unicorn --foo=bar -- --rainbow
```

## API

### hasFlag(flag, argv?)

Returns a boolean for whether the flag exists.

It correctly stops looking after an `--` argument terminator.

#### flag

Type: `string`

CLI flag to look for. The `--` prefix is optional.

#### argv

Type: `string[]`\
Default: `process.argv`

CLI arguments.

---

<div align="center">
	<b>
		<a href="https://tidelift.com/subscription/pkg/npm-has-flag?utm_source=npm-has-flag&utm_medium=referral&utm_campaign=readme">Get professional support for this package with a Tidelift subscription</a>
	</b>
	<br>
	<sub>
		Tidelift helps make open source sustainable for maintainers while giving companies<br>assurances about security, maintenance, and licensing for their dependencies.
	</sub>
</div>
