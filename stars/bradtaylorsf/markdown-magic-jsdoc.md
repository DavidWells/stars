---
repo: bradtaylorsf/markdown-magic-jsdoc
url: 'https://github.com/bradtaylorsf/markdown-magic-jsdoc'
homepage: null
starredAt: '2021-11-14T03:35:38Z'
createdAt: '2017-08-26T17:55:51Z'
updatedAt: '2023-09-17T14:18:09Z'
language: JavaScript
license: MIT
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:38.433Z'
description: A plugin for markdown-magic that parses jsdoc style comments as a transform
tags:
  - jsdoc
  - markdown-magic
  - markdown-magic-jsdoc
---

# markdown-magic-jsdoc
A plugin for [markdown-magic](https://github.com/DavidWells/markdown-magic) that parses jsdoc style comments as a transform

## Install
```
npm i markdown-magic markdown-magic-jsdoc --save-dev
```

## Adding the plugin
See `doc.js` for usage.
<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./docs.js) -->
<!-- The below code snippet is automatically added from ./docs.js -->
```js
/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const path = require('path');
const markdownMagic = require('markdown-magic'); // 'markdown-magic'
const JSDOC = require('./index.js');

const mmdConfig = {
  transforms: {
    /* Match <!-- AUTO-GENERATED-CONTENT:START (JSDOC:files=../docs.js) --> */
    JSDOC,
  },
};

const markdownPath = path.join(__dirname, './', 'README.md');
markdownMagic(markdownPath, mmdConfig);
```
<!-- AUTO-GENERATED-CONTENT:START (CODE:src=./docs.js) -->
<!-- AUTO-GENERATED-CONTENT:END *-->

## Usage in markdown
See `examples/*.js` for usage.
For complete documentation on comment structure, please visit [https://github.com/jsdoc2md/jsdoc-to-markdown/wiki](https://github.com/jsdoc2md/jsdoc-to-markdown/wiki)
### Original Comment
```
/**
 * A module for adding two values.
 * @module add-two-values
 */

/**
 * Add two values.
 */
function add (a, b) {
  return a + b
}
```
### Markdown Output
<!-- AUTO-GENERATED-CONTENT:START (JSDOC:files=./examples/module.js) -->
<a name="module_add-two-values"></a>

## add-two-values
A module for adding two values.

<a name="module_add-two-values..add"></a>

### add-two-values~add()
Add two values.

**Kind**: inner method of [<code>add-two-values</code>](#module_add-two-values)  

<!-- AUTO-GENERATED-CONTENT:START (JSDOC:files=./examples/module.js) -->
<!-- AUTO-GENERATED-CONTENT:END *-->

## Options
This module does not support all of the options for [jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown/blob/master/lib/jsdoc-to-markdown.js#L22-L37). Create a PR if you want to add an option
<!-- AUTO-GENERATED-CONTENT:START (JSDOC:files=./index.js) -->
<a name="defaults"></a>

## defaults
Returns markdown documentation from jsdoc-annoted source code.

**Kind**: global constant  

| Param | Type | Description |
| --- | --- | --- |
| files | <code>Array.&lt;object&gt;</code> | full path to the local javascript file that has the jsdoc comment |
| heading-depth | <code>number</code> | The initial heading depth. For example, with a value of `2` the top-level markdown headings look like `"## The heading"`. |
| no-gfm | <code>boolean</code> | By default, dmd generates github-flavoured markdown. Not all markdown parsers render gfm correctly. If your generated docs look incorrect on sites other than Github (e.g. npmjs.org) try enabling this option to disable Github-specific syntax. |
| separators | <code>boolean</code> | Put `<hr>` breaks between identifiers. Improves readability on bulky docs. |
| module-index-format | <code>string</code> | none, grouped, table, dl. |
| global-index-format | <code>string</code> | none, grouped, table, dl. |
| param-list-format | <code>string</code> | Two options to render parameter lists: 'list' or 'table' (default). Table format works well in most cases but switch to list if things begin to look crowded / squashed. |
| property-list-format | <code>string</code> | list, table. |
| member-index-format | <code>string</code> | grouped, list |


<!-- AUTO-GENERATED-CONTENT:START (JSDOC:files=./index.js) -->
<!-- AUTO-GENERATED-CONTENT:END -->


## JSDOC
[https://github.com/jsdoc2md/jsdoc-to-markdown](https://github.com/jsdoc2md/jsdoc-to-markdown)
