---
repo: asvd/dragscroll
url: 'https://github.com/asvd/dragscroll'
homepage: 'http://asvd.github.io/dragscroll/'
starredAt: '2015-03-23T17:02:23Z'
createdAt: '2015-03-22T14:17:28Z'
updatedAt: '2025-02-19T08:38:17Z'
language: JavaScript
license: MIT
branch: master
stars: 1099
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:46.325Z'
description: micro library for drag-n-drop scrolling style
tags:
  - drag
  - dragscroll
  - enables-scrolling
  - javascript
  - micro-library
  - mouse
  - scroll
  - scrolling
---

dragscroll
==========

Dragscroll is a micro JavaScript library (910 bytes minified) which
enables scrolling via holding the mouse button ("drag and drop" or
"click and hold" style, [online
demo](http://asvd.github.io/dragscroll/)). It has no dependencies and
is written in vanilla JavaScript (which means it works anywhere).


### Usage


Download the and unpack
[distribution](https://github.com/asvd/dragscroll/releases/download/v0.0.8/dragscroll-0.0.8.tar.gz),
or install it using [Bower](http://bower.io/):

```sh
$ bower install dragscroll
```

or npm:

```sh
$ npm install dragscroll
```

Load the `dragscroll.js` in a preferable way (that is an UMD module):

```html
<script src="path/to/dragscroll.js"></script>
```

Add the `dragscroll` class to a scrollable element:

```html
<div class=dragscroll>
    Big text goes here...
</div>
```

That's it! Now you can scroll it by dragging. You can also add the
`dragscroll` class to the `<body>` element and drag the whole page.

Keep in mind that now it is not possible to select the content with
mouse, so apply the `cursor: default;` CSS style to prevent confusing
the users (or even `cursor: grab;` in case the content is not a text).

If you add or remove the `dragscroll` class dynamically, invoke
`dragscroll.reset()` to update the listeners.

You can also add the `nochilddrag` attribute to a scrollable element,
which will only enable drag-scrolling for an element itself, but not
for its subchildren. This can be usefull, if you want to enable the
scrolling the area by dragging its empty space, but keep the
opportunity to select the text (see
[example](http://asvd.github.io/jailed/demos/web/process/)).

-

Follow me on twitter: https://twitter.com/asvd0
