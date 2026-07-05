---
repo: mixmark-io/turndown-plugin-gfm
url: 'https://github.com/mixmark-io/turndown-plugin-gfm'
homepage: null
starredAt: '2022-11-06T00:18:38Z'
createdAt: '2017-11-10T14:09:07Z'
updatedAt: '2025-02-21T03:09:33Z'
language: HTML
license: MIT
branch: master
stars: 103
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:12.323Z'
description: ':octocat: Turndown plugin to add GitHub Flavored Markdown extensions'
tags: []
---

# turndown-plugin-gfm

A [Turndown](https://github.com/domchristie/turndown) plugin which adds GitHub Flavored Markdown extensions.

## Installation

npm:

```
npm install turndown-plugin-gfm
```

Browser:

```html
<script src="https://unpkg.com/turndown/dist/turndown.js"></script>
<script src="https://unpkg.com/turndown-plugin-gfm/dist/turndown-plugin-gfm.js"></script>
```

## Usage

```js
// For Node.js
var TurndownService = require('turndown')
var turndownPluginGfm = require('turndown-plugin-gfm')

var gfm = turndownPluginGfm.gfm
var turndownService = new TurndownService()
turndownService.use(gfm)
var markdown = turndownService.turndown('<strike>Hello world!</strike>')
```

turndown-plugin-gfm is a suite of plugins which can be applied individually. The available plugins are as follows:

- `strikethrough` (for converting `<strike>`, `<s>`, and `<del>` elements)
- `tables`
- `taskListItems`
- `gfm` (which applies all of the above)

So for example, if you only wish to convert tables:

```js
var tables = require('turndown-plugin-gfm').tables
var turndownService = new TurndownService()
turndownService.use(tables)
```

## License

turndown-plugin-gfm is copyright © 2017+ Dom Christie and released under the MIT license.
