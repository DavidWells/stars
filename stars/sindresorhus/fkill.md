---
repo: sindresorhus/fkill
url: 'https://github.com/sindresorhus/fkill'
homepage: ''
starredAt: '2022-01-25T01:33:31Z'
createdAt: '2015-06-20T20:30:33Z'
updatedAt: '2025-02-11T15:48:09Z'
language: JavaScript
license: MIT
branch: main
stars: 741
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:18.135Z'
description: Fabulously kill processes. Cross-platform.
tags: []
---

<h1 align="center">
	<br>
	<img width="360" src="media/logo.svg" alt="fkill">
	<br>
	<br>
	<br>
</h1>

> Fabulously kill processes. Cross-platform.

Works on macOS (10.13 or later), Linux, Windows.

## Install

```sh
npm install fkill
```

## Usage

```js
import fkill from 'fkill';

await fkill(1337);
console.log('Killed process');

fkill('Safari');
fkill(':8080');

fkill([1337, 'Safari', ':8080']);
```

## API

### fkill(input, options?)

Returns a promise that resolves when the processes are killed.

#### input

Type: `number | string | Array<number | string>`

One or more process IDs/names/ports to kill.

To kill a port, prefix it with a colon. For example: `:8080`.

#### options

Type: `object`

##### force

Type: `boolean`\
Default: `false`

Force kill the processes.

##### forceAfterTimeout

Type: `number`\
Default: `undefined`

Force kill processes that did not exit within the given number of milliseconds.

##### tree

Type: `boolean`\
Default: `true`

Kill all child processes along with the parent process. *(Windows only)*

##### ignoreCase

Type: `boolean`\
Default: `false`

Ignore capitalization when killing a process.

Note that the case is always ignored on Windows.

##### silent

Type: `boolean`\
Default: `false`

Suppress all error messages. For example: `Process doesn't exist`.

## Related

- [fkill-cli](https://github.com/sindresorhus/fkill-cli) - CLI for this module
- [alfred-fkill](https://github.com/SamVerschueren/alfred-fkill) - Alfred workflow for this module
