---
repo: ichord/Caret.js
url: 'https://github.com/ichord/Caret.js'
homepage: 'http://ichord.github.com/Caret.js'
starredAt: '2016-03-28T23:30:35Z'
createdAt: '2013-03-23T13:33:18Z'
updatedAt: '2025-02-14T15:51:06Z'
language: JavaScript
license: MIT
branch: master
stars: 1054
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:30.146Z'
description: Get caret postion and offset from text field
tags: []
---

Caret.js
========

Get caret position or offset from inputor

This is the core function that working in [At.js](http://ichord.github.com/At.js).  
Now, It just become an simple jquery plugin so that everybody can use it.  
And, of course, **At.js** is using this plugin too.

* support iframe context

Live Demo
=========

http://ichord.github.com/Caret.js/


Usage
=====

```javascript

// Get caret position
$('#inputor').caret('position'); // => {left: 15, top: 30, height: 20}

// Get caret offset
$('#inputor').caret('offset'); // => {left: 300, top: 400, height: 20}

var fixPos = 20
// Get position of the 20th char in the inputor.
// not working in `contentEditable` mode
$('#inputor').caret('position', fixPos);

// Get offset of the 20th char.
// not working in `contentEditable` mode
$('#inputor').caret('offset', fixPos);

// more

// Get caret position from the first char in the inputor.
$('#inputor').caret('pos'); // => 15

// Set caret position in the inputor
$('#inputor').caret('pos', 15);

// set iframe context
// NOTE: Related to the iframe's cooridinate.
//       You might want to get the iframe's offset/position on your own
$('#inputor').caret('offset', {iframe: theIframe});
$('#inputor').caret('position', {iframe: theIframe});
$('#inputor').caret('pos', 15, {iframe: theIframe});

```
