---
repo: sindresorhus/cli-spinners
url: 'https://github.com/sindresorhus/cli-spinners'
homepage: null
starredAt: '2024-12-21T23:39:44Z'
createdAt: '2016-03-03T18:13:57Z'
updatedAt: '2025-02-25T02:58:13Z'
language: JavaScript
license: MIT
branch: main
stars: 2471
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:14.465Z'
description: Spinners for use in the terminal
tags: []
---

# cli-spinners

> 70+ spinners for use in the terminal

<p align="center">
	<br>
	<img width="700" src="screenshot.svg">
	<br>
	<br>
</p>

The list of spinners is just a [JSON file](spinners.json) and can be used wherever.

You probably want to use one of these spinners through the [`ora`](https://github.com/sindresorhus/ora) package.

## Install

```sh
npm install cli-spinners
```

## Usage

```js
import cliSpinners from 'cli-spinners';

console.log(cliSpinners.dots);
/*
{
	interval: 80,
	frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
}
*/
```

## Preview

The header GIF is outdated. See all the [spinner at once](https://jsfiddle.net/sindresorhus/2eLtsbey/embedded/result/) or [one at the time](https://asciinema.org/a/95348?size=big).

## API

### cliSpinners

Each spinner comes with a recommended `interval` and an array of `frames`.

[See the spinners.](spinners.json)

### randomSpinner()

Get a random spinner.

```js
import {randomSpinner} from 'cli-spinners';

console.log(randomSpinner());
/*
{
	interval: 80,
	frames: ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
}
*/
```

## Related

- [ora](https://github.com/sindresorhus/ora) - Elegant terminal spinner
- [CLISpinner](https://github.com/kiliankoe/CLISpinner) - Terminal spinners for Swift
- [py-spinners](https://github.com/ManrajGrover/py-spinners) - Python port
- [spinners](https://github.com/FGRibreau/spinners) - Terminal spinners for Rust
- [go-spinners](https://github.com/gabe565/go-spinners) - Go port
