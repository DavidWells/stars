---
repo: stevenbenisek/markdown-magic-local-image
url: 'https://github.com/stevenbenisek/markdown-magic-local-image'
homepage: null
starredAt: '2018-11-21T04:38:44Z'
createdAt: '2017-12-01T13:10:05Z'
updatedAt: '2019-05-29T01:14:49Z'
language: JavaScript
license: MIT
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:02.395Z'
description: Markdown Magic plugin to add local images to markdown
tags: []
---

# markdown-magic-local-image

[![Build Status](https://travis-ci.org/stevenbenisek/markdown-magic-local-image.svg?branch=master)](https://travis-ci.org/stevenbenisek/markdown-magic-local-image)

> [Markdown Magic](https://github.com/DavidWells/markdown-magic) plugin to add
> local images to markdown.

## Install

```bash
npm install --save-dev markdown-magic-local-image
```

## Usage

### Example

`markdown.config.js`

```js
module.exports = {
  transforms: {
    LOCALIMAGE: require('markdown-magic-local-image'),
  },
};
```

`README.md`

```md
<!-- AUTO-GENERATED-CONTENT:START (LOCALIMAGE:heading=true&headingLevel=4&include=src/*.svg) -->

<!-- AUTO-GENERATED-CONTENT:END -->
```

Given a folder of svg's:

* _src/add.svg_
* _src/close.svg_
* _src/home.svg_

Yields:

`README.md`

```md
<!-- AUTO-GENERATED-CONTENT:START (LOCALIMAGE:heading=true&headingLevel=4&include=src/*.svg) -->

#### add

![Alt text](src/add.svg "add")

#### close

![Alt text](src/close.svg "close")

#### home

![Alt text](src/home.svg "home")

<!-- AUTO-GENERATED-CONTENT:END -->
```

### Options

#### `heading`

> `boolean`: defaults to `true`

Add a heading, based on the filename, before each image.

#### `headingLevel`

> `number`: defaults to `6`

Control the heading level.

#### `include`

> `string`: defaults to `'./**/*.{gif,jpg,png,svg}'`.

Glob pattern as supported by
[https://github.com/isaacs/node-glob](https://github.com/isaacs/node-glob).
