---
repo: camacho/markdown-magic-directory-tree
url: 'https://github.com/camacho/markdown-magic-directory-tree'
homepage: null
starredAt: '2017-05-13T16:43:34Z'
createdAt: '2017-01-11T22:51:05Z'
updatedAt: '2024-08-12T19:27:05Z'
language: JavaScript
license: NA
branch: master
stars: 42
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:45.282Z'
description: Print directory tree in Markdown
tags: []
---

# Directory tree plugin

Add directory tree to markdown files via [markdown-magic](https://github.com/DavidWells/markdown-magic)

## Install

```
npm i markdown-magic markdown-magic-directory-tree --save-dev
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
    DIRTREE: require('./index.js'),
  },
};

const markdownPath = path.join(__dirname, 'README.md');
markdownMagic(markdownPath, config);
```
<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./example.js) -->
<!-- AUTO-GENERATED-CONTENT:END *-->

## Usage in markdown

<!-- AUTO-GENERATED-CONTENT:START (DIRTREE:dir=./&depth=1) -->
```
markdown-magic-directory-tree/
├── .npmrc
├── example.js
├── index.js
├── package-lock.json
├── package.json
└── README.md
```
<!-- AUTO-GENERATED-CONTENT:END -->

## Options

* **dir** - `process.cwd()` by default
* **ignore** - `['.git', '.gitkeep', '.gitignore', 'node_modules']` by default
* **depth** - `Infinity` by default (how deep in the tree to traverse)
* **onlyDirs** - `false` by default (how mnuch t)
