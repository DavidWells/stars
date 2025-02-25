---
repo: DavidWells/markdown-magic-github-contributors
url: 'https://github.com/DavidWells/markdown-magic-github-contributors'
homepage: null
starredAt: '2022-10-08T22:29:13Z'
createdAt: '2016-12-26T23:27:48Z'
updatedAt: '2022-11-08T10:29:45Z'
language: JavaScript
license: NA
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:25.908Z'
description: markdown-magic Plugin to list out the contributors of your repository.
tags: []
---

# List Github Contributors Plugin

This [markdown-magic](https://github.com/DavidWells/markdown-magic) will list out the contributors of your repository.

<!-- ⛔️ AUTO-GENERATED-CONTENT:START (TOC) -->
- [Install](#install)
- [Usage](#usage)
  * [1. Add markdown-magic transform script](#1-add-markdown-magic-transform-script)
  * [2. Add comment block in markdown](#2-add-comment-block-in-markdown)
  * [3. Add docs build script to package.json](#3-add-docs-build-script-to-packagejson)
- [Options](#options)
- [Setting options](#setting-options)
  * [Global configuration](#global-configuration)
  * [Inline configuration](#inline-configuration)
- [Prior Art](#prior-art)
<!-- ⛔️ AUTO-GENERATED-CONTENT:END -->

## Install

```bash
npm i markdown-magic markdown-magic-github-contributors --save-dev
```

## Usage

### 1. Add markdown-magic transform script

```js
/* generate-docs.js */
const fs = require('fs')
const path = require('path')
const markdownMagic = require('markdown-magic')

const config = {
  transforms: {
    CONTRIBUTORS: require('markdown-magic-github-contributors')
  }
}

const markdownPath = path.join(__dirname, 'README.md')
markdownMagic(markdownPath, config)
```

### 2. Add comment block in markdown

```md
<!-- ⛔️ AUTO-GENERATED-CONTENT:START (CONTRIBUTORS) -->
table will be placed here
<!-- ⛔️ AUTO-GENERATED-CONTENT:END -->
```

### 3. Add docs build script to package.json

This is an option step but will allow you to generate docs easily with `npm run docs`

```json
  "scripts": {
    "docs": "node generate-docs.js",
  }
```

## Options

`repo` *(string)* (optional) - `username/repoName`. Will use the current working directory git remote origin as a default.

`format` *(string)* (optional) - Default is table. possible values: `list`, `aligned`, & `table`. [See example](https://github.com/jonschlinkert/github-contributors#formatted-list)

## Setting options


### Global configuration

You can configure the plugin when required in as a tranform. This will apply to all instances of the `<!-- ⛔️ AUTO-GENERATED-CONTENT (CONTRIBUTORS) -->` comment, unless overriden inline.

```js
const fs = require('fs')
const path = require('path')
const markdownMagic = require('markdown-magic')

const config = {
  transforms: {
    CONTRIBUTORS: require('markdown-magic-github-contributors')({
      format: 'list'
    })
  }
}

const markdownPath = path.join(__dirname, 'README.md')
markdownMagic(markdownPath, config)
```

### Inline configuration

You can override global config settings with inline options like so:

```md
<!-- ⛔️ AUTO-GENERATED-CONTENT:START (CONTRIBUTORS:format=list) -->
table will be placed here
<!-- ⛔️ AUTO-GENERATED-CONTENT:END -->
```

## Prior Art

Many thanks to [jonschlinkert](https://github.com/jonschlinkert/) and his [github-contributors](https://github.com/jonschlinkert/github-contributors) package that powers this under the hood.
