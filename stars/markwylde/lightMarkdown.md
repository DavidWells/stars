---
repo: markwylde/lightMarkdown
url: 'https://github.com/markwylde/lightMarkdown'
homepage: null
starredAt: '2022-11-12T20:23:50Z'
createdAt: '2021-01-12T10:19:08Z'
updatedAt: '2022-11-12T20:23:50Z'
language: JavaScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: true
hasReadMe: true
refreshedAt: '2025-02-25T20:21:10.843Z'
description: >-
  Javascript library that helps you convert simplified markdown (like used in
  Slack messages) to HTML
tags: []
---

# littlemarkdown

Javascript library that helps you convert simplified markdown to HTML

## Installation

### npm (server-side)

    npm install littlemarkdown

### CDN

You can also use one of several CDNs available:

* github CDN

        https://cdn.rawgit.com/Tonkean/lightMarkdown/<version tag>/dist/littlemarkdown.min.js

## Quick Example

### Node

```js
const littlemarkdown  = require('littlemarkdown');
const text = 'This should be *bold*';
const html = littlemarkdown(text);
```

### Browser

```js
const text = 'This should be *bold*';
const html = littlemarkdown(text);
```

### Output 

Both examples should output...

    <p>This should be <b>bold</b></p>
    
## Tests

A suite of tests is available which require node.js.  Once node is installed, run the following command from the project root to install the dependencies:

    npm install

Once installed the tests can be run from the project root using:

    npm test

New test cases can easily be added.  Create a light markdown file (ending in `.lmd`) which contains the markdown to test.  Create a `.html` file of the exact same name.  It will automatically be tested when the tests are executed with `mocha`.

