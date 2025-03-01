---
repo: bahmutov/npm-quick-run
url: 'https://github.com/bahmutov/npm-quick-run'
homepage: null
starredAt: '2016-04-20T03:10:46Z'
createdAt: '2015-11-30T04:01:35Z'
updatedAt: '2025-02-09T14:14:24Z'
language: JavaScript
license: NA
branch: master
stars: 143
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:27.464Z'
description: Quickly run NPM script by prefix without typing the full name
tags:
  - cli
  - npm
  - quick
  - utility
---

# npm-quick-run

> Quickly run NPM script by prefix without typing the full name

[![NPM][npm-quick-run-icon] ][npm-quick-run-url]

[![ci status][ci image]][ci url]
[![semantic-release][semantic-image] ][semantic-url]
[![manpm](https://img.shields.io/badge/manpm-%E2%9C%93-3399ff.svg)](https://github.com/bahmutov/manpm)
[![standard](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Install

Install as a global tool `npm install -g npm-quick-run`. This creates two aliases `nrun` and `nr`

## Use example

    $ nr t      # runs script starting with "t"
    $ nr m -w   # runs a script starting with "m", probably "npm run mocha -- -w"
    $ nr -i     # runs npm-quick-run in interactive mode
    $ nr c-r    # find script that has two+ words
                # first starts with "c", second with "r"
    $ nr c-r.   # find script with exactly two words
                # first starts with "c", second with "r"

## Demo

Watch the video [NPM Quick Run](https://youtu.be/f2uXdCOkJb0)

Watch this screencast to see `npm-quick-run` in action. I am using `nr` alias

[![demo](https://asciinema.org/a/31015.png)](https://asciinema.org/a/31015)

### Interactive Mode

![Demo: Interactive Mode](https://cloud.githubusercontent.com/assets/87983/24231500/f791fb04-0fbf-11e7-9fa0-1d0f48efd72f.gif)

## Details

Take a look at the scripts inside your `package.json`. You probably have something like
this

```json
"scripts": {
  "test": "...",
  "lint": "..."
}
```

You can quickly run tests using `nr t` and run the linter using `nr l`, assuming there are
no other script names starting with `t` or `l`. If there are, just be more specific and provide
more unique prefix.

## Separate words

If your scripts have separate words, you can specify prefix for each one. For example, the `package.json` file below has 3 scripts

```json
{
  "scripts": {
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "cypress:run:record": "cypress run --record"
  }
}
```

You can quickly open Cypress using

```
nr c:o
# same as
nr c-o
# same as
nr cy-open
```

Characters `:` and `-` are interchangeable and can be used in the prefix or in the script names.

In the above situation

```
nr c-r
# returns both "cypress:run" and "cypress:run:record"
nr c-r-r
# executes "cypress:run:record"
```

### Separate words with count

Sometimes you want to match a script with one word, but there are multiple two and three word scripts matching the prefix.

```json
{
  "scripts": {
    "cypress": "cypress -help",
    "cypress:open": "cypress open",
    "cypress:run": "cypress run",
    "cypress:run:record": "cypress run --record"
  }
}
```

In order to run "cypress" script use prefix with "." at the end:

```
# same as "npm run cypress"
$ nr c. # only finds single word starting with "c"

# same as "npm run cypress:open"
$ nr c-o.

# same as "npm run cypress:run"
$ nr c-r.
```

## Extra arguments

You can pass extra arguments right after the prefix string

    nr t --watch

would be the same as

    npm run test -- --watch

which can run Mocha unit tests in the watching mode for example.

## Error handling

If there are no scripts starting with the given prefix, an error message will be shown.
If there are multiple scripts, they will be printed to the console and an error will be shown.

## Similar projects

* [as-a](https://github.com/bahmutov/as-a) adds env variables before running a command
* [json-package](https://github.com/bahmutov/json-package) quickly shows value from `package.json`
  by property name prefix
* [npm-run](https://www.npmjs.com/package/npm-run) run locally-installed executables to avoid
  using long string `node node_modules/.bin/some-alias ...`
* [nrun](https://github.com/2do2go/nrun) is very similar to this project, but the script name
  completion is done via shell script, see [the relevant issue](https://github.com/2do2go/nrun/issues/3)

### Benefits compared to similar projects

* `npm-quick-run` is cross platform - the command completion is done in JS
* Boilerplate NPM error output is filtered out automatically
* Most commands require typing only 3 characters - 2 for the tool itself "nr" and 1 character for the
the script label

## Debug

If something is not working as expected, you can see the verbose debug messages
by running

    DEBUG=quick nr ...

### Small print

Author: Gleb Bahmutov &copy; 2015

* [@bahmutov](https://twitter.com/bahmutov)
* [glebbahmutov.com](https://glebbahmutov.com)
* [blog](https://glebbahmutov.com/blog/)

License: MIT - do anything with the code, but don't blame me if it does not work.

Spread the word: tweet, star on github, etc.

Support: if you find any problems with this module, email / tweet /
[open issue](https://github.com/bahmutov/npm-quick-run/issues) on Github

## MIT License

Copyright (c) 2015 Gleb Bahmutov

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the "Software"), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

[npm-quick-run-icon]: https://nodei.co/npm/npm-quick-run.svg?downloads=true
[npm-quick-run-url]: https://npmjs.org/package/npm-quick-run
[ci image]: https://github.com/bahmutov/npm-quick-run/workflows/ci/badge.svg?branch=master
[ci url]: https://github.com/bahmutov/npm-quick-run/actions
[semantic-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[semantic-url]: https://github.com/semantic-release/semantic-release
