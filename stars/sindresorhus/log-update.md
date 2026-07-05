---
repo: sindresorhus/log-update
url: 'https://github.com/sindresorhus/log-update'
homepage: null
starredAt: '2017-05-03T22:53:02Z'
createdAt: '2015-08-16T08:27:28Z'
updatedAt: '2025-02-22T05:10:25Z'
language: JavaScript
license: MIT
branch: main
stars: 1104
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:45.611Z'
description: >-
  Log by overwriting the previous output in the terminal. Useful for rendering
  progress bars, animations, etc.
tags: []
---

# log-update

> Log by overwriting the previous output in the terminal.\
> Useful for rendering progress bars, animations, etc.

![](screenshot.gif)

## Install

```sh
npm install log-update
```

## Usage

```js
import logUpdate from 'log-update';

const frames = ['-', '\\', '|', '/'];
let index = 0;

setInterval(() => {
	const frame = frames[index = ++index % frames.length];

	logUpdate(
`
        ♥♥
   ${frame} unicorns ${frame}
        ♥♥
`
	);
}, 80);
```

## API

### logUpdate(text…)

Log to stdout.

### logUpdate.clear()

Clear the logged output.

### logUpdate.done()

Persist the logged output.

Useful if you want to start a new log session below the current one.

### logUpdateStderr(text…)

Log to stderr.

### logUpdateStderr.clear()
### logUpdateStderr.done()

### createLogUpdate(stream, options?)

Get a `logUpdate` method that logs to the specified stream.

#### options

Type: `object`

##### showCursor

Type: `boolean`\
Default: `false`

Show the cursor. This can be useful when a CLI accepts input from a user.

```js
import {createLogUpdate} from 'log-update';

// Write output but don't hide the cursor
const log = createLogUpdate(process.stdout, {
	showCursor: true
});
```

## Examples

- [listr](https://github.com/SamVerschueren/listr) - Uses this module to render an interactive task list
- [ora](https://github.com/sindresorhus/ora) - Uses this module to render awesome spinners
- [speed-test](https://github.com/sindresorhus/speed-test) - Uses this module to render a [spinner](https://github.com/sindresorhus/elegant-spinner)
