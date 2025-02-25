---
repo: backhand/paramount
url: 'https://github.com/backhand/paramount'
homepage: null
starredAt: '2021-06-19T17:08:28Z'
createdAt: '2017-03-02T15:32:33Z'
updatedAt: '2021-06-19T17:08:28Z'
language: JavaScript
license: NA
branch: master
stars: 1
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:33.837Z'
description: null
tags: []
---

paramount [![Build Status](https://secure.travis-ci.org/backhand/paramount.png?branch=master)](https://travis-ci.org/backhand/paramount)
=======================

Argument verification from docblock parameter definitions.

Installation:
------------------------
npm install paramount

Usage:
------
Given a module :
````
    // myModule.js
    /**
     * @param {String} [str] A very important string
     */
    exports.somefunction = function(str) { return 'x ' + str; }
````

Require it through paramount like this:
````
    const paramount = require('paramount');
    const myModule = paramount.require('./path/to/module', module);
    myModule.somefunction(123)
    > Error: function somefunction - invalid argument type for str, expected String
````


The MIT License (MIT)
---------------------

Copyright © `2016` `Frederik Hannibal`

Permission is hereby granted, free of charge, to any person
obtaining a copy of this software and associated documentation
files (the “Software”), to deal in the Software without
restriction, including without limitation the rights to use,
copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following
conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.
