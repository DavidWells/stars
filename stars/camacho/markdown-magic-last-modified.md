---
repo: camacho/markdown-magic-last-modified
url: 'https://github.com/camacho/markdown-magic-last-modified'
homepage: null
starredAt: '2018-11-21T04:42:57Z'
createdAt: '2017-06-09T23:21:28Z'
updatedAt: '2022-03-26T14:50:22Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:02.285Z'
description: Print last modified for file based on git history
tags: []
---

# Install command plugin

Add install command to markdown files via [markdown-magic](https://github.com/DavidWells/markdown-magic)

## Install

```
npm i markdown-magic markdown-magic-last-modified --save-dev
```

## Adding the plugin

See `example.js` for usage.

<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./example.js) -->
<!-- The below code snippet is automatically added from ./example.js -->
```js
const fs = require('fs');
const path = require('path');
const markdownMagic = require('markdown-magic');

const config = {
  transforms: {
    LASTMODIFIED: require('./index.js'),
  },
};

const markdownPath = path.join(__dirname, 'README.md');
markdownMagic(markdownPath, config);
```
<!-- AUTO-GENERATED-CONTENT:END *-->

## Usage in markdown

<!-- AUTO-GENERATED-CONTENT:START (LASTMODIFIED) -->
**README.md** last modified Sat Mar 26 15:49:09 2022 +0100
<!-- AUTO-GENERATED-CONTENT:END -->

## Options

* **file** (current file by default) - file to get last modified date from (relative to the Markdown file)
