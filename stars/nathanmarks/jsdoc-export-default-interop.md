---
repo: nathanmarks/jsdoc-export-default-interop
url: 'https://github.com/nathanmarks/jsdoc-export-default-interop'
homepage: null
starredAt: '2020-12-14T07:49:17Z'
createdAt: '2016-01-25T03:53:33Z'
updatedAt: '2021-05-26T04:01:25Z'
language: HTML
license: NA
branch: master
stars: 6
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:17.116Z'
description: null
tags: []
---

## jsdoc-export-default-interop
[![npm](https://img.shields.io/npm/v/jsdoc-export-default-interop.svg?style=flat-square)](https://www.npmjs.com/package/jsdoc-export-default-interop)
[![Dependency Status](https://david-dm.org/nathanmarks/jsdoc-export-default-interop.svg?style=flat-square)](https://david-dm.org/nathanmarks/jsdoc-export-default-interop)

#### What is this?
A jsdoc plugin for changing exports behaviour so es6 default exports that are not interopable with commonjs module requires are properly documented

#### Installation

Install via NPM.

```bash
$ npm install jsdoc-export-default-interop --save-dev
```

Add plugin to jsdoc conf.json.

```json
{
    "tags": {
        "allowUnknownTags": true
    },
    "source": {
        "includePattern": ".+\\.js(doc|x)?$",
        "excludePattern": "(^|\\/|\\\\)_"
    },
    "plugins": ["../node_modules/jsdoc-export-default-interop/dist/index"],
    "templates": {
        "cleverLinks": false,
        "monospaceLinks": false,
        "default": {
            "outputSourceFiles": true
        }
    }
}
```

---

# API Reference

<a name="module_jsdoc-export-default-interop"></a>
## jsdoc-export-default-interop
A jsdoc plugin for changing exports behaviour
so es6 default exports that are not interopable
with commonjs module requires are properly documented


-----

<a name="exp_module_jsdoc-export-default-interop.astNodeVisitor"></a>
### jsdoc-export-default-interop ⏏ exports.astNodeVisitor : <code>Object</code>
The plugin object.

**Kind**: exports constant of <code>[jsdoc-export-default-interop](#module_jsdoc-export-default-interop)</code>
**See**: http://usejsdoc.org/about-plugins.html  

-----

