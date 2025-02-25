---
repo: auchenberg/slotCount.js
url: 'https://github.com/auchenberg/slotCount.js'
homepage: null
starredAt: '2015-01-06T01:49:37Z'
createdAt: '2013-09-25T21:47:07Z'
updatedAt: '2024-02-10T18:28:55Z'
language: JavaScript
license: MIT
branch: master
stars: 63
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:57.201Z'
description: 'Simple slot machine-like counter, inspired by Google Plus.'
tags: []
---

## slotCount.js

### [Demo](http://auchenberg.github.com/slotCount.js)

Simple slot machine-like counter, inspired by Google Plus.

No dependencies. AMD and CJS compatible.

Works in modern browsers. Chrome, Firefox, Safari 6+, IE10+.

## Installation

#### Manually

Adding to your HTML file:

    <script src="/path_to_http_invoke/slotcount.js"></script>

#### with [Bower](http://bower.io)

    bower install slotcount

#### with [Component](https://github.com/component/component)

    component install auchenberg/slotcount.js

## Usage

```javascript
var counter = new slotCount(container, initialCount);

counter.set(newCount);
counter.dispose();
```

## Examples

### Random number every 2000ms

```javascript
var counter = new slotCount(document.querySelector('.counter-box'), 10);

setInterval(function() {
  var random = Math.floor(Math.random() * 50);
  counter.set(random);
}, 2000);
```

## Test

You can test the component implementation of slotCount.js with Mocha in your browser.

Make sure you run ```component build``` and then point your browser locally to ```test/index.html```.

## Credits
slotCount.js is a project by [Kenneth Auchenberg](http://kenneth.io)

## License

    The MIT License (MIT)
