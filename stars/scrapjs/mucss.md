---
repo: scrapjs/mucss
url: 'https://github.com/scrapjs/mucss'
homepage: ''
starredAt: '2022-11-29T01:12:06Z'
createdAt: '2014-08-30T12:25:31Z'
updatedAt: '2022-11-29T11:03:42Z'
language: JavaScript
license: Unlicense
branch: master
stars: 5
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:07.231Z'
description: Micro css utils for lightweight components
tags: []
---

# Micro CSS [![Build Status](https://travis-ci.org/dfcreative/mucss.svg?branch=master)](https://travis-ci.org/dfcreative/mucss) [![Code Climate](https://codeclimate.com/github/dfcreative/mucss/badges/gpa.svg)](https://codeclimate.com/github/dfcreative/mucss)

CSS utils for lightweight components development.

[![npm install mucss](https://nodei.co/npm/mucss.png?mini=true)](https://npmjs.org/package/mucss)

```js
//include all css methods
var css = require('mucss');

//or include only submodules
var offset = require('mucss/offset');
var padding = require('mucss/padding');

//Apply set of css rules to an element, automatically prefixed.
//Numbers are automatically converted to `px`.
css(el, { transform: 'translate3d(10px,10px,0)' });

//Get style property value, properly prefixed.
css(el, 'transform');

//Get absolute offsets relative to the document, including `position: fixed` detection.
css.offset(el);

//Get element paddings.
css.paddings(el);

//Get element margins.
css.margins(el);

//Get element border widths.
css.borders(el);

//Parse units value.
css.parseValue('123em');

//Set & unset element selectability.
css.selection.enable(el);
css.selection.disable(el);

//Current browser CSS prefixes object.
css.prefix;

//A scrollbar size.
css.scrollbar;

//Whether element is in fixed element or is fixed itself.
css.isFixed(el);

//Whether document has horizontal (x) or vertical (y) scrollbar.
css.hasScrollX();
css.hasScrollY();

//Whether element is in the viewport.
css.isInViewport(el);

//Parse translate3d property of an element, if any.
css.getTranslate(el);
```


[![NPM](https://nodei.co/npm/mucss.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mucss/)
