---
repo: sindresorhus/fkill-cli
url: 'https://github.com/sindresorhus/fkill-cli'
homepage: ''
starredAt: '2025-01-01T00:18:58Z'
createdAt: '2015-06-20T21:57:57Z'
updatedAt: '2025-02-23T11:53:48Z'
language: JavaScript
license: MIT
branch: main
stars: 6905
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:53:33.234Z'
description: Fabulously kill processes. Cross-platform.
tags:
  - cli
  - cli-app
  - cross-platform
  - fabulous
  - javascript
  - kill
  - nodejs
  - process
  - unicorns
---

<h1 align="center">
	<br>
	<img width="360" src="https://cdn.jsdelivr.net/gh/sindresorhus/fkill@913dce9ae670cd12410f6a64eaf94d7e5f50ed69/media/logo.svg" alt="fkill">
	<br>
	<br>
	<br>
</h1>

> Fabulously kill processes. Cross-platform.

Works on macOS, Linux, and Windows.

## Install

```sh
npm install --global fkill-cli
```

## Usage

```
$ fkill --help

	Usage
		$ fkill [<pid|name|:port> …]

	Options
		--force, -f                  Force kill
		--verbose, -v                Show process arguments
		--silent, -s                 Silently kill and always exit with code 0
		--force-timeout <N>, -t <N>  Force kill processes which didn't exit after N seconds

	Examples
		$ fkill 1337
		$ fkill safari
		$ fkill :8080
		$ fkill 1337 safari :8080
		$ fkill

	To kill a port, prefix it with a colon. For example: :8080.

	Run without arguments to use the interactive interface.
	In interactive mode, 🚦n% indicates high CPU usage and 🐏n% indicates high memory usage.
	Supports fuzzy search in the interactive mode.

	The process name is case insensitive.
```

## Interactive UI

Run `fkill` without arguments to launch the interactive UI.

![](screenshot.svg)

## Related

- [fkill](https://github.com/sindresorhus/fkill) - API for this module
- [alfred-fkill](https://github.com/SamVerschueren/alfred-fkill) - Alfred workflow for this module
