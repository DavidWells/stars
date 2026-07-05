---
repo: gtramontina/draggable.js
url: 'https://github.com/gtramontina/draggable.js'
homepage: 'http://gtramontina.github.com/draggable.js/'
starredAt: '2014-10-15T18:47:23Z'
createdAt: '2012-01-21T04:10:16Z'
updatedAt: '2023-09-08T16:31:53Z'
language: JavaScript
license: NA
branch: master
stars: 121
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:02.025Z'
description: Make your DOM elements draggable easily
tags: []
---

# draggable.js [![Build Status](https://travis-ci.org/gtramontina/draggable.js.png)](https://travis-ci.org/gtramontina/draggable.js) [![codecov.io](https://codecov.io/github/gtramontina/draggable.js/coverage.svg?branch=master)](https://codecov.io/github/gtramontina/draggable.js?branch=master) [![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/gtramontina/draggable.js/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
##### Make your DOM elements draggagle easily

### Examples

DOM:

```html
<div id="elementToDrag">
  <div class="handle"></div>
</div>
```

To make the whole element draggable:

```javascript
var elementToDrag = document.getElementById('elementToDrag');
draggable(elementToDrag);
```

To make it draggable only when dragging the handle element:

```javascript
var elementToDrag = document.getElementById('elementToDrag');
var handle = elementToDrag.getElementsByClassName('handle')[0];
draggable(elementToDrag, handle);
```

#### Notes
* You have to provide the raw element, not the one wrapped by your favorite dom query lib. Using jQuery, for example, you'd need to do something like `var elementToDrag = $('#elementToDrag').get(0);`
* If you are using AMD (e.g. require.js) this lib becomes a module. Otherwise it'll create a global `draggable`.

### Browser Compatibility
I've ran the tests in Chrome and Firefox. On [travis-ci](https://travis-ci.org/gtramontina/draggable.js) the tests run in Phantomjs. If you find any incompatibility or want to support other browsers, please do a pull request with the fix! :-)

### Development
*Prerequisites*  
[phantomjs](http://phantomjs.org/download.html)   
mocha `npm install mocha`  



### License
This is licensed under the feel-free-to-do-whatever-you-want-to-do license.
