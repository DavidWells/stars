---
repo: marcelklehr/vdom-virtualize
url: 'https://github.com/marcelklehr/vdom-virtualize'
homepage: null
starredAt: '2015-03-13T00:34:18Z'
createdAt: '2014-05-01T18:28:45Z'
updatedAt: '2024-06-05T04:21:50Z'
language: JavaScript
license: MIT
branch: master
stars: 131
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:48.085Z'
description: Virtualize a DOM node
tags: []
---

# vdom-virtualize

[![Sauce Test Status](https://saucelabs.com/browser-matrix/vdom-virtualize.svg)](https://saucelabs.com/u/vdom-virtualize)

**New in v2.0:** removed support for virtualize.fromHTML -- doing this right and supporting all platforms is a job for [another library](https://github.com/TimBeyer/html-to-vdom).

**New in v1.0:** vdom-virtualize now supports comments and does now use peerDependencies to depend on virtual-dom.

## API

### virtualize(node:DOMNode)
 * node `{DOMNode}`

 * returns `{VNode}`: A virtual-dom tree

### virtualize.fromHTML(html:String)
 * html `{String}`

 * returns `{VNode}`: A virtual-dom tree

Turn a DOMNode into a [virtual-dom](https://github.com/Matt-Esch/virtual-dom) node.
