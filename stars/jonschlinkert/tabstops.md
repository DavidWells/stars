---
repo: jonschlinkert/tabstops
url: 'https://github.com/jonschlinkert/tabstops'
homepage: 'https://github.com/jonschlinkert'
starredAt: '2021-12-31T21:17:45Z'
createdAt: '2019-07-24T18:49:39Z'
updatedAt: '2024-08-29T23:41:03Z'
language: JavaScript
license: MIT
branch: master
stars: 23
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:24.738Z'
description: >-
  Empower your text editor or prompt with full-featured code snippets!
  JavaScript library and API for parsing, compiling, and rendering code
  snippets, with complete support for VS Code-style tabstops. Supports
  variables, placeholders, transforms, unlimited nesting, and all of the
  "snippet" features offered by popular text editors like VSCode, Atom, TextMate
  and Sublime Text. 
tags:
  - atom
  - code
  - editor
  - key-bindings
  - prompt
  - render
  - shortcut
  - snippet
  - sublime
  - sublime-text
  - tab
  - tabstop
  - tabstops
  - template
  - text-editor
  - transform
  - variables
  - vscode
---

# tabstops [![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=W8YFZ425KND68) [![NPM version](https://img.shields.io/npm/v/tabstops.svg?style=flat)](https://www.npmjs.com/package/tabstops) [![NPM monthly downloads](https://img.shields.io/npm/dm/tabstops.svg?style=flat)](https://npmjs.org/package/tabstops) [![NPM total downloads](https://img.shields.io/npm/dt/tabstops.svg?style=flat)](https://npmjs.org/package/tabstops) [![Linux Build Status](https://img.shields.io/travis/jonschlinkert/tabstops.svg?style=flat&label=Travis)](https://travis-ci.org/jonschlinkert/tabstops)

> JavaScript library and API for parsing, compiling and rendering snippets with tabstops.

Please consider following this project's author, [Jon Schlinkert](https://github.com/jonschlinkert), and consider starring the project to show your :heart: and support.

## Install

Install with [npm](https://www.npmjs.com/) (requires [Node.js](https://nodejs.org/en/) >=8):

```sh
$ npm install --save tabstops
```

## Features

* [Tabstops](#tabstops) in the following formats: `$1`, `${1}`
* Tabstops with [placeholders](#placeholders): `${1:foo}`
* Nested tabstops: `$1 ${2:${1:foo}}`
* [Variables](#variables) in the following formats: `$name`, `${name}`
* Variables with placeholders: `${name:Jon Schlinkert}`
* Nested Variables: `${name:${1}}`, `${name:${fullname:Jon Schlinkert}}`
* [Choices](#choices): `${1|one,two,three|}`
* [Variable Transforms](#variable-Transform): `${TM_FILENAME/(.*)\..+$/$1/gim}`
* [Placeholder Transforms](#placeholder-Transform): `${1/^_(.*)/$1/g}`
* more...!

**Supported Formats**

* [TextMate Snippets](https://macromates.com/textmate/manual/snippets)
* [Atom Snippets](https://flight-manual.atom.io/using-atom/sections/snippets/)
* [VSCode Snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets)
* [Sublime Text Snippets](http://docs.sublimetext.info/en/latest/extensibility/snippets.html)

## Usage

Note that this library _does not load snippets_ from the file system. You need to pass the snippet string.

```js
const TabStops = require('tabstops');

// pass a string as the first argument 
const tabstops = new TabStops('console.log("$1");');

console.log(tabstops.render()); //=> 'console.log("");'

tabstops.set(1, 'It worked!');
console.log(tabstops.render()); //=> 'console.log("It worked!");'

tabstops.set(1, 'Warning!');
console.log(tabstops.render()); //=> 'console.log("Warning!");'
```

## Docs

WIP - user and docs are in progress!!! In the meantime, see the [unit tests](test) for available features and usage examples.

## API

WIP

## Snippet Features

The following documentation is based on the [VSCode Snippets](https://code.visualstudio.com/docs/editor/userdefinedsnippets) and [TextMate Snippets](https://macromates.com/manual/en/snippets) docs.

### Tabstops

With tabstops you can make the editor cursor move inside a snippet. Use `$1`, `$2` to specify cursor locations. The number is the order in which tabstops will be visited, whereas `$0` denotes the final cursor position. Multiple tabstops are linked and updated in sync.

### Placeholders

Placeholders are tabstops with values, like `${1:foo}`. The placeholder text will be inserted and selected such that it can be easily changed. Placeholders can nested, like `${1:another ${2:placeholder}}`.

### Choice

Placeholders may have choices as values. The syntax is a comma-separated enumeration of values, enclosed with the pipe-character, e.g. `${1|one,two,three|}`. When inserted and selected choices will prompt the user to pick one of the values.

### Variables

With `$name` or `${name:default}` you can insert the value of a variable. When a variable isn’t set its _default_ or the empty string is inserted. When a variable is unknown (that is, its value is undefined) the name of the variable is inserted instead, and it is transformed into a placeholder.

### Variable-Transform

Transformations allow you to modify the value of a variable before it is being inserted. The definition of a transformation consists of four parts (including the variable to be transformed):

1. The variable to transform
2. A regular expression that is matched against the value of the variable, or the empty string when the variable cannot be resolved.
3. A "format string" that allows to reference matching groups from the regular expression. The format string allows for conditional inserts and simple modifications.
4. Options that are passed to the regular expression

The following sample inserts the name of the current file without its ending, so from `foo.txt` it makes `foo`.

```
${<variable>/<regexp>/<format>/<options>}
${TM_FILENAME/(.*)\..+$/$1/gim}
  |           |         |  |
  |           |         |  |-> options (regex flags)
  |           |         |
  |           |         |-> references the contents of the first
  |           |             capture group
  |           |
  |           |-> regex to capture everything before
  |               the final `.suffix`
  |
  |-> resolves to the filename
```

### Placeholder-Transform

Like a Variable-Transform, a transformation of a placeholder allows changing the inserted text for the placeholder when moving to the next tab stop.

The inserted text is matched with the regular expression and the match or matches - depending on the options - are replaced with the specified replacement format text.

Every occurrence of a placeholder can define its own transformation independently using the value of the first placeholder.

The format for Placeholder-Transforms is the same as for Variable-Transforms.

The following sample removes an underscore at the beginning of the text, so that `_transform` becomes `transform`.

```
${1/^_(.*)/$1/g}
  |   |    |  |-> Options (regex flags)
  |   |    |
  |   |    |-> Replace it with the first capture group
  |   |
  |   |-> Regular expression to capture everything after the underscore
  |
  |-> Placeholder Index
```

### Grammar

Below is the EBNF for snippets. With `\` (backslash) you can escape `$`, `}` and `\`, within choice elements the backslash also escapes comma and pipe characters.

```
placeholder ::= tabstop | choice | variable | text
tabstop     ::= '$' int
                | '${' int '}'
                | '${' int1 ':' placeholder '}'
                | '${' int1 '/' transform '}'
variable    ::= '$' var 
                | '${' var '}'
                | '${' var ':' placeholder '}'
                | '${' var '/' transform '}'
transform   ::= regex '/' (format | text)+ '/' flags
format      ::= '$' int  
                | '${' int '}'
                | '${' int ':' '/upcase' | '/downcase' | '/capitalize' '}'
                | '${' int ':+' if '}'
                | '${' int ':?' if ':' else '}'
                | '${' int ':-' else '}' 
                | '${' int ':' else '}'
choice      ::= '${' int1 '|' text (',' text)* '|}'
regex       ::= JavaScript Regular Expression value (ctor-string)
flags       ::= JavaScript Regular Expression flags (ctor-flags)
var         ::= [_a-zA-Z][_a-zA-Z0-9]*
int         ::= [0-9]+
int1        ::= [1-9]+
text        ::= .*
```

## About

<details>
<summary><strong>Contributing</strong></summary>

Pull requests and stars are always welcome. For bugs and feature requests, [please create an issue](../../issues/new).

</details>

<details>
<summary><strong>Running Tests</strong></summary>

Running and reviewing unit tests is a great way to get familiarized with a library and its API. You can install dependencies and run tests with the following command:

```sh
$ npm install && npm test
```

</details>

<details>
<summary><strong>Building docs</strong></summary>

_(This project's readme.md is generated by [verb](https://github.com/verbose/verb-generate-readme), please don't edit the readme directly. Any changes to the readme must be made in the [.verb.md](.verb.md) readme template.)_

To generate the readme, run the following command:

```sh
$ npm install -g verbose/verb#dev verb-generate-readme && verb
```

</details>

### Author

**Jon Schlinkert**

* [GitHub Profile](https://github.com/jonschlinkert)
* [Twitter Profile](https://twitter.com/jonschlinkert)
* [LinkedIn Profile](https://linkedin.com/in/jonschlinkert)

### License

Copyright © 2019, [Jon Schlinkert](https://github.com/jonschlinkert).
Released under the [MIT License](LICENSE).

***

_This file was generated by [verb-generate-readme](https://github.com/verbose/verb-generate-readme), v0.8.0, on July 24, 2019._
