---
repo: xdamman/js-line-wrap-detector
url: 'https://github.com/xdamman/js-line-wrap-detector'
homepage: null
starredAt: '2025-05-05T18:09:35Z'
createdAt: '2014-01-06T09:05:34Z'
updatedAt: '2025-05-05T18:09:35Z'
language: JavaScript
license: MIT
branch: master
stars: 45
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-10T22:30:18.439Z'
description: Detect where the text wraps in Javascript
tags: []
---

# jsLineWrapDetector

Detect where the text wrap in any dom element.

## Installation

Just clone this repo or better, use `bower`:

    bower install js-line-wrap-detector

## Usage

    <script src="src/lineWrapDetector.js"></script>
    <script>
    var ps = document.getElementsByTagName('p');
    var p = ps[0];
    var lines = lineWrapDetector.getLines(p);
    console.log(lines.length+" lines: ", lines);
    </script>

With `RequireJS`:

    <script>
    require(['src/lineWrapDetector'], function(detector) {
      var ps = document.getElementsByTagName('p');
      var p = ps[0];
      var lines = detector.getLines(p);
      console.log(lines.length+" lines: ", lines);
    });
    </script>
    
## Tests

    npm install; npm test
