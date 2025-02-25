---
repo: camacho/markdown-magic-package-scripts
url: 'https://github.com/camacho/markdown-magic-package-scripts'
homepage: ''
starredAt: '2022-10-08T21:58:59Z'
createdAt: '2017-08-17T16:28:41Z'
updatedAt: '2022-10-08T21:58:59Z'
language: JavaScript
license: MIT
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:26.113Z'
description: Add a table of scripts from package.json to markdown files
tags: []
---

# `package.json` scripts

Add a table of scripts from `package.json` to markdown files via [markdown-magic](https://github.com/DavidWells/markdown-magic)

## Install

```
yarn add -D markdown-magic markdown-magic-package-scripts
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
    SCRIPTS: require('./index.js'),
  },
};

const markdownPath = path.join(__dirname, 'README.md');
markdownMagic(markdownPath, config);
```
<!-- AUTO-GENERATED-CONTENT:END *-->

## Usage in markdown

<!-- AUTO-GENERATED-CONTENT:START (SCRIPTS) -->
| Script | Description |
|--------|-------------|
| `docs` | generate docs |
| `empty` | `echo "this is just an example"` |
| `format` | format code |
| `prepublish` | npm hook to run before publishing |
<!-- AUTO-GENERATED-CONTENT:END -->
