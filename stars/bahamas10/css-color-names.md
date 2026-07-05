---
repo: bahamas10/css-color-names
url: 'https://github.com/bahamas10/css-color-names'
homepage: null
starredAt: '2015-01-08T03:19:16Z'
createdAt: '2013-03-15T09:09:50Z'
updatedAt: '2025-01-14T16:22:15Z'
language: JavaScript
license: MIT
branch: master
stars: 146
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:55.381Z'
description: A JSON Object of css color names mapped to their hex value
tags: []
---

css-color-names
===============

A JSON Object of css color names mapped to their hex value

Usage
-----

``` js
var csscolors = require('css-color-names');
console.dir(csscolors);
```

yields

``` json
{
  "aqua": "#00ffff",
  "aliceblue": "#f0f8ff",
  "antiquewhite": "#faebd7",
  "black": "#000000",
  "blue": "#0000ff",
  ...
}
```

How was this list generated?
----------------------------

In the Makefile you'll see a line like this:

	./getcolors.sh | ./stringify.js > $(FILE)

The first command scrapes a site for the list,
and outputs the results separated by newlines.  The
second command creates the JSON object and outputs
it to stdout, which then gets redirected into
`css-color-names.json`

Installation
------------

    npm install css-color-names

License
-------

MIT
