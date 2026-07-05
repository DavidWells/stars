---
repo: vegetableman/drag-resizer
url: 'https://github.com/vegetableman/drag-resizer'
homepage: null
starredAt: '2015-06-14T01:03:09Z'
createdAt: '2015-03-02T12:57:46Z'
updatedAt: '2022-12-23T15:07:49Z'
language: JavaScript
license: NA
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:41.100Z'
description: 'Adds a drag handle for dom nodes, uses flexbox'
tags: []
---

# drag-resizer

Adds a drag handle for dom nodes, uses flexbox.

![img](https://raw.githubusercontent.com/vegetableman/drag-resizer/master/example.gif)

```js
  const dragResizer = require('drag-resizer')
  dragResizer('.container') // dragResizer(document.querySelector('.container'))
```

Pass the container with the child nodes to be manipulated by the drag handle.

## Installation

`npm install drag-resizer --save`


## Usage

#### `dragResizer(element, opts)`

Creates a new dragResizer for an element with the given options.

- `type` - The type of flexbox (row|column), default type row.
- `childNodes` - Array of child nodes manipulated by the handle, default immediate child nodes of the element.
- `className` - Class name for the drag handle.

## demo

To run the demo from source, clone this repo and follow these steps:

```sh
git clone https://github.com/vegetableman/drag-resizer.git
cd drag-resizer
npm install

## now run the demo
npm run example
```
