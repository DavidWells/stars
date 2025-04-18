---
repo: browniefed/htmlparser2-react
url: 'https://github.com/browniefed/htmlparser2-react'
homepage: ''
starredAt: '2015-06-11T17:39:34Z'
createdAt: '2014-07-20T04:23:44Z'
updatedAt: '2023-10-30T15:58:52Z'
language: JavaScript
license: NA
branch: master
stars: 44
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:41.353Z'
description: Parses raw html using htmlparser2 to a React DOM structure.
tags: []
---

react-htmlparser2
================

Parses raw html use htmlparser2 to a React DOM structure.

This package is now agnostic, sort of tested in .13.3. If it doesn't work well fix it?

So the process for now is
```
npm install react-htmlparser2
npm install react
```

Quick example
```javascript
var reactParser = require('htmlparser2-react'),
	React = require('react');


var html = '<div data-id="1" class="hey this is a class" style="width:100%;height: 100%;"><article id="this-article"><p>hey this is a paragraph</p><div><ul><li>1</li><li>2</li><li>3</li></ul></div></article></div>';

var parsedComponent = reactParser(html, React);


console.log(html == React.renderToStaticMarkup(parsedComponent));
//logs true
```


This by no means takes into account everything, like CData, no special cases for script tags, other stuff that I have no idea about.

It can be browserified for ES5 compliant browsers.

There are likely more elegant solutions, like actually hooking into htmlparser2 DOMHandler thus not parsing to an object then converting to React but I can do that later.


Should you use this? No.

Why would you use this? Maybe you don't want dangerously set innerhtml?

Have fun

Log issues if you find any, I'm sure there are
