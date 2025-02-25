---
repo: avajs/ava-codemods
url: 'https://github.com/avajs/ava-codemods'
homepage: 'https://ava.li'
starredAt: '2016-04-20T01:36:34Z'
createdAt: '2016-04-02T00:02:09Z'
updatedAt: '2024-08-12T10:51:43Z'
language: JavaScript
license: MIT
branch: master
stars: 68
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:27.637Z'
description: Codemods for AVA
tags:
  - ava
  - codemod
  - jscodeshift
  - migration
  - nodejs
  - tape
---

# ava-codemods [![Build Status](https://travis-ci.org/avajs/ava-codemods.svg?branch=master)](https://travis-ci.org/avajs/ava-codemods)

Translations: [Français](https://github.com/avajs/ava-docs/blob/master/fr_FR/related/ava-codemods/readme.md)

> Codemods for [AVA](https://ava.li) that simplifies upgrading to newer versions and migrating to AVA

<img src="screenshot.gif" width="440" align="right">

Codemods are small programs that help you automate changes to your codebase. Think of them as search and replace on steroids.

This module contains a set of codemods that enable you to upgrade your code between various AVA releases and migrate from existing test runners to AVA. It is maintained by the AVA team, and will be updated anytime we introduce breaking API changes.


## Install

```
$ npm install --global ava-codemods
```

This installs two binaries `ava-codemods` and `tape-to-ava`.


## Migrating to AVA

Currently we support migrating from [tape](https://github.com/substack/tape) to AVA.

```
$ tape-to-ava --help

	Usage
	  $ tape-to-ava <path> [options]

	path	Files or directory to transform. Can be a glob like src/**.test.js

	Options
	  --force, -f	Bypass Git safety checks and forcibly run codemods
	  --dry, -d		Dry run (no changes are made to files)
	  --parser		The parser to use for parsing your source files (babel | babylon | flow)  [babel]
```

To transform all test files in a directory run `tape-to-ava mySrcFolder` in your terminal. Only files requiring or importing tape will be transformed. Notice the console output for errors, manual intervention might be required.

As we cannot statically determine if your sequential tape tests are able to run in parallel, all tests are transformed into `test.serial`. To speed up the AVA test execution you can remove `.serial` where applicable.


## Upgrade AVA version

```
$ ava-codemods --help

  Usage
    $ ava-codemods [<file|glob> ...]

  Options
    --force, -f    Bypass safety checks and forcibly run codemods

  Available upgrades
    - 0.16.x → 0.17.x
    - 0.13.x → 0.14.x
```

Simply run `ava-codemods` in your terminal and answer a few questions. You can pass a filename directly to the CLI. If you do not, you will be prompted for one.

Ensure you have a backup of your tests or commit the latest changes before running this.


### Supported codemods

#### Upgrading to 0.17.x

- Renaming `t.error()` to `t.ifError()`

#### Upgrading to 0.14.x

- Renaming `t.ok()` to `t.truthy()`
- Renaming `t.notOk()` to `t.falsy()`
- Renaming `t.same()` to `t.deepEqual()`
- Renaming `t.notSame()` to `t.notDeepEqual()`


## License

MIT © [James Talmage](https://github.com/jamestalmage)
