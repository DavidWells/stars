---
repo: lmenezes/json-tree
url: 'https://github.com/lmenezes/json-tree'
homepage: null
starredAt: '2023-02-28T02:01:45Z'
createdAt: '2013-09-08T16:13:23Z'
updatedAt: '2025-02-03T22:49:53Z'
language: JavaScript
license: MIT
branch: master
stars: 115
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:55.476Z'
description: create tree like html code from json
tags: []
---

![Node.js CI](https://github.com/lmenezes/json-tree/workflows/Node.js%20CI/badge.svg?branch=master)

# json-tree

simple JS library that creates an html navigable tree from JSON object.

## Usage

Use the function `JSON.create(data)` to transform a data object into raw HTML which can then be set as the innerHTML of
an existing element.
 
![](./imgs/example_code.png)

The result of the previous example should render the following structure:

![](./imgs/example_view.gif)

## Customising the looks

The colors of the generated structure can be customised through the following CSS classes:

- jstTree: Class applied to div element wrapping the whole structure

- jstProperty: Class applied to property names

- jstBool: Class applied to boolean values

- jstNum: Class applied to numeric values

- jstNull: Class applied to null values

- jstStr: Class applied to string values

- jstComma: Class applied to commas

- jstColon: Class applied to colon separating property name from property value

- jstCollapse: Class applied to the collapse symbol

- jstExpand: Class applied to the expand symbol

- jstBracket: Class applied to brackets (both {} and [])

- jstHiddenBlock: Class applied to collapsed blocks
