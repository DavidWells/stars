---
repo: Fetchnotes/Caret.js
url: 'https://github.com/Fetchnotes/Caret.js'
homepage: ''
starredAt: '2015-03-13T15:55:24Z'
createdAt: '2014-04-21T03:25:21Z'
updatedAt: '2017-11-22T07:29:30Z'
language: JavaScript
license: MIT
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:47.498Z'
description: >-
  Measure the position in pixels of the caret of a text input, relative to the
  page or to the input. No dependencies.
tags: []
---

![Caret.js](http://i.imgur.com/w8fvhs8.png)
Measure the position of the caret of a text input, relative to the page or to
the input. No dependencies needed.

### Demo
You can check out a nifty demo [here](http://plnkr.co/edit/r3mvs6PEvTDFZEhnuoPY?p=preview).

### Usage

```javascript

var textarea = document.getElementById('#myTextarea');

var caret = new Caret(textarea)

textarea.onkeyup = function(event) {
  console.log(caret.position); // Prints out position object {x: int, y: int}
};

````
