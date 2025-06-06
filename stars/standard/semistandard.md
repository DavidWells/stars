---
repo: standard/semistandard
url: 'https://github.com/standard/semistandard'
homepage: ''
starredAt: '2016-01-16T02:17:38Z'
createdAt: '2015-01-27T22:14:26Z'
updatedAt: '2025-02-12T20:35:50Z'
language: JavaScript
license: MIT
branch: master
stars: 1409
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:34.618Z'
description: >-
  :icecream: All the goodness of `standard/standard` with semicolons sprinkled
  on top.
tags: []
---

# JavaScript Semi-Standard Style
[![tests][tests-image]][tests-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]

### One Semicolon for the Dark Lord on his dark throne

All the goodness of [standard/standard] with semicolons sprinkled on top.

## Install

```bash
npm install semistandard
```

## Rules

Importantly:

- **semicolons**
- Check [standard/standard] for the rest of the rules.

## Badge

Use this in one of your projects? Include one of these badges in your readme to
let people know that your code is using the standard style.

[![js-semistandard-style](https://raw.githubusercontent.com/standard/semistandard/master/badge.svg)](https://github.com/standard/semistandard)

```markdown
[![js-semistandard-style](https://raw.githubusercontent.com/standard/semistandard/master/badge.svg)](https://github.com/standard/semistandard)
```

[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/standard/semistandard)

```markdown
[![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/standard/semistandard)
```

## Usage

The easiest way to use JavaScript Semi-Standard Style to check your code is to install it
globally as a Node command line program. To do so, simply run the following command in
your terminal (flag `-g` installs `semistandard` globally on your system, omit it if you want
to install in the current working directory):

```bash
npm install semistandard -g
```

After you've done that you should be able to use the `semistandard` program. The simplest use
case would be checking the style of all JavaScript files in the current working directory:

```
$ semistandard
Error: Use JavaScript Semi-Standard Style
  lib/torrent.js:950:11: Expected '===' and instead saw '=='.
```

### Editor plugins

- **Sublime users**: Try [SublimeLinter-contrib-semistandard](https://github.com/Flet/SublimeLinter-contrib-semistandard) for linting in your editor!
- **Atom users** - Install [linter-js-standard](https://atom.io/packages/linter-js-standard)
- **VSCode users** - Install [vscode-standardjs](https://marketplace.visualstudio.com/items?itemName=chenxsan.vscode-standardjs)

### What you might do if you're clever

1. Add it to `package.json`

  ```json
  {
    "name": "my-cool-package",
    "devDependencies": {
      "semistandard": "*"
    },
    "scripts": {
      "test": "semistandard && node my-normal-tests-littered-with-semicolons.js"
    }
  }
  ```

2. Check style automatically when you run `npm test`

  ```
  $ npm test
  Error: Code style check failed:
    lib/torrent.js:950:11: Expected '===' and instead saw '=='.
  ```

3. Never give style feedback on a pull request again! (unless it's about semicolons)

### Custom Parser
To use a custom parser, install it from npm (example: `npm install
babel-eslint`) and add this to your package.json:

```json
{
  "semistandard": {
    "parser": "babel-eslint"
  }
}
```

### [Vim](http://www.vim.org/)

Install **[Syntastic][vim-1]** and add these lines to `.vimrc`:

```vim
let g:syntastic_javascript_checkers=['standard']
let g:syntastic_javascript_standard_exec = 'semistandard'
```

For automatic formatting on save, add these two lines to `.vimrc`:

```vim
autocmd bufwritepost *.js silent !semistandard % --fix
set autoread
```

[vim-1]: https://github.com/scrooloose/syntastic

### Ignoring files

Just like in `standard`, The paths `node_modules/**`, `*.min.js`, `bundle.js`, `coverage/**`, hidden files/folders
(beginning with `.`), and all patterns in a project's root `.gitignore` file are
automatically excluded when looking for `.js` files to check.

Sometimes you need to ignore additional folders or specific minfied files. To do that, add
a `semistandard.ignore` property to `package.json`:

```json
"semistandard": {
  "ignore": [
    "**/out/",
    "/lib/select2/",
    "/lib/ckeditor/",
    "tmp.js"
  ]
}
```

### Make it look `snazzy`
If you want prettier output, just install the [`snazzy`](https://github.com/feross/snazzy) package and pipe `semistandard` to it:

```bash
$ semistandard --verbose | snazzy
```

See [standard/standard] for more information.

[tests-image]: https://github.com/standard/semistandard/actions/workflows/test.yml/badge.svg
[tests-url]: https://github.com/standard/semistandard/actions/workflows/test.yml
[npm-image]: https://img.shields.io/npm/v/semistandard.svg
[npm-url]: https://npmjs.org/package/semistandard
[downloads-image]: https://img.shields.io/npm/dm/semistandard.svg
[downloads-url]: https://npmjs.org/package/semistandard
[standard/standard]: https://github.com/standard/standard
