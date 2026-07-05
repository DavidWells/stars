---
repo: n1k0/kept
url: 'https://github.com/n1k0/kept'
homepage: 'http://n1k0.github.io/kept/'
starredAt: '2014-12-06T02:12:31Z'
createdAt: '2014-05-25T09:22:39Z'
updatedAt: '2024-05-08T10:22:31Z'
language: JavaScript
license: MIT
branch: master
stars: 133
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:01.152Z'
description: 'Personal notes as widgets, inspired by Google Keep'
tags: []
---

Kept
====

![https://travis-ci.org/n1k0/kept](https://travis-ci.org/n1k0/kept.svg) ![https://david-dm.org/n1k0/kept](https://david-dm.org/n1k0/kept.png)

Personal rich notes HTML app inspired by [Google Keep](https://keep.google.com/)
and powered by [React](http://facebook.github.io/react/).

[![](http://cl.ly/image/0S2K1D41441M/Screen%20Shot%202014-05-27%20at%2020.36.13.png)](http://n1k0.github.io/kept/)

For now, data are stored using `localStorage`. Full mobile compatibility & Sync
are in the pipe.

**This is WiP, don't use it yet.**

Install
-------

Install Kept dependencies:

    $ npm install

To launch a local server with live reload:

    $ npm start

Point your browser at [localhost:4000](http://localhost:4000) and start hacking
Kept files, a rebuild will be performed automatically in the background.

To build an optimized version of Kept:

    $ npm run dist

The resulting files are then available in the `build` folder.

A [working demo](http://n1k0.github.io/kept/) is also available.

Code linting:

    $ npm run lint

Tests:

    $ npm test

License
-------

MIT.
