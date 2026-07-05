---
repo: guillaumepotier/Garlic.js
url: 'https://github.com/guillaumepotier/Garlic.js'
homepage: 'http://garlicjs.org/'
starredAt: '2015-04-18T15:16:49Z'
createdAt: '2012-11-10T15:58:25Z'
updatedAt: '2025-02-14T15:50:49Z'
language: CSS
license: NOASSERTION
branch: master
stars: 2361
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:45.436Z'
description: >-
  Automatically persist your forms' text and select field values locally, until
  the form is submitted.
tags: []
---

# Garlic.js

[![Build Status](https://secure.travis-ci.org/guillaumepotier/Garlic.js.png?branch=master)](https://travis-ci.org/guillaumepotier/Garlic.js)

Garlic.js allows you to automatically persist your forms' text and select field values locally, until the form is submitted. This way, your users don't lose any precious data if they accidentally close their tab or browser.

# Demonstration / Documentation

http://garlicjs.org/

# Version

1.4.2

See CHANGELOG for more info.

# TODO

* Improve doc and api;
* Refactorize some code;
* Work on inputs radio and textarea where there are conflicts;
* And much more, for fun!

# Run tests

* In your browser: go to `tests/index.html`
* Headless tests: `npm install && npm test`

# Make production minified versions

You'll need ruby, and Google Closure compiler: `gem install closure-compiler`. Then, just call:

`./bin/build.sh version` where version is the build release. eg: `./bin/build.sh 1.1.2`

They'll be created and dumped in the dist/ directory

# Contributors

* @cdmoyer
* @johnrees
* @Marfa
* @leondewey
* @willdurand
* @nashby

# Used / Inspiration

* localStorageshim for IE browsers: https://github.com/mattpowell/localstorageshim by @mattpowell
* minify ruby script https://gist.github.com/765432 by @benpickles

# Licence

MIT - See LICENCE.md
