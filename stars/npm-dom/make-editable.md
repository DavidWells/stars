---
repo: npm-dom/make-editable
url: 'https://github.com/npm-dom/make-editable'
homepage: 'http://npm.im/make-editable'
starredAt: '2015-06-14T04:25:22Z'
createdAt: '2014-12-09T06:26:34Z'
updatedAt: '2018-05-12T23:59:21Z'
language: JavaScript
license: NA
branch: master
stars: 7
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:41.125Z'
description: Make given element editable by user
tags: []
---

## make-editable

Make given element editable by user

## Install

```bash
$ npm install make-editable
```

## Usage

```js
var makeEditable = require('make-editable')

var editable = makeEditable(document)

editable.selectAll()
editable.bold()
editable.link('http://foobar.com')
editable.img('http://foo.com/bar.jpg')
editable.exec(command, value, showDefaultUI)
```

## Command Reference

* exec: *exec(commandName, value, showUI)*

#### Formatting:

* bold: `bold`
* italic: `italic`
* underline: `underline`
* color: `foreColor`
* bgcolor: `backColor`
* fontName: `fontName`
* fontSize: `fontSize`
* plain: `removeFormat`
* center: `justifyCenter`
* justify: `justifyFull`
* left: `justifyLeft`
* right: `justifyRight`
* indent: `indent`
* outdent: `outdent`

#### Elements:

* img: `insertImage`
* link: `link`
* unlink: `unlink`
* orderedList: `insertOrderedList`
* unorderedList: `insertUnorderedList`

#### Other:

* selectAll: `selectAll`
* undo: `undo`
* redo: `redo`
* copy: `copy`
* paste: `paste`
* delete: `delete`
