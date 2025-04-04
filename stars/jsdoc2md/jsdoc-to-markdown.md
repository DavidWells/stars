---
repo: jsdoc2md/jsdoc-to-markdown
url: 'https://github.com/jsdoc2md/jsdoc-to-markdown'
homepage: ''
starredAt: '2021-07-06T19:37:52Z'
createdAt: '2014-05-15T19:04:34Z'
updatedAt: '2025-02-25T20:03:21Z'
language: JavaScript
license: MIT
branch: master
stars: 1713
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:51.600Z'
description: Generate markdown documentation from jsdoc-annotated javascript
tags:
  - api-documentation
  - documentation
  - documentation-generator
  - documentation-tool
  - generator
  - jsdoc
  - jsdoc-to-markdown
  - markdown
  - readme
---

[![view on npm](https://badgen.net/npm/v/jsdoc-to-markdown)](https://www.npmjs.org/package/jsdoc-to-markdown)
[![npm module downloads](https://badgen.net/npm/dt/jsdoc-to-markdown)](https://www.npmjs.org/package/jsdoc-to-markdown)
[![Gihub repo dependents](https://badgen.net/github/dependents-repo/jsdoc2md/jsdoc-to-markdown)](https://github.com/jsdoc2md/jsdoc-to-markdown/network/dependents?dependent_type=REPOSITORY)
[![Gihub package dependents](https://badgen.net/github/dependents-pkg/jsdoc2md/jsdoc-to-markdown)](https://github.com/jsdoc2md/jsdoc-to-markdown/network/dependents?dependent_type=PACKAGE)
[![Node.js CI](https://github.com/jsdoc2md/jsdoc-to-markdown/actions/workflows/node.js.yml/badge.svg)](https://github.com/jsdoc2md/jsdoc-to-markdown/actions/workflows/node.js.yml)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](https://github.com/feross/standard)

_Upgraders, please read the [release notes](https://github.com/jsdoc2md/jsdoc-to-markdown/releases)_

# jsdoc-to-markdown

Generates markdown API documentation from [jsdoc](https://jsdoc.app) annotated source code. Useful for injecting API docs into project README files.

## Synopsis

1\. Document your code using valid jsdoc comments.

```js
/**
 * A quite wonderful function.
 * @param {object} - Privacy gown
 * @param {object} - Security
 * @returns {survival}
 */
function protection (cloak, dagger) {}
```

2\. Run a command.

```sh
$ jsdoc2md example.js
```

3\. Get markdown output.

```markdown
## protection(cloak, dagger) ⇒ <code>survival</code>
A quite wonderful function.

**Kind**: global function

| Param  | Type                | Description  |
| ------ | ------------------- | ------------ |
| cloak  | <code>object</code> | Privacy gown |
| dagger | <code>object</code> | Security     |

```

## Install

```
$ npm install --save-dev jsdoc-to-markdown
```

## See also

* [API documentation](https://github.com/jsdoc2md/jsdoc-to-markdown/blob/master/docs/API.md)
* The [wiki](https://github.com/jsdoc2md/jsdoc-to-markdown/wiki) for example output, FAQs, tutorials, plugins, use with gulp/grunt etc.

* * *

&copy; 2014-24 Lloyd Brookes \<opensource@75lb.com\>.

Tested by [test-runner](https://github.com/test-runner-js/test-runner).
