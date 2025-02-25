---
repo: bredele/lookfor
url: 'https://github.com/bredele/lookfor'
homepage: ''
starredAt: '2015-03-13T00:41:37Z'
createdAt: '2013-09-21T17:16:02Z'
updatedAt: '2015-03-13T00:41:37Z'
language: JavaScript
license: NA
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:47.904Z'
description: Client-side full-text search using CSS and built for speed.
tags: []
---

look for
======

  Client-side full-text search using CSS and built for speed.

## Installation

with component:

    $ component install bredele/lookfor

with nodejs:

    $ npm install lookfor


## Usage

  `lookfor` uses dataset (`data-search`) to index dom elements...

```html
<div class="searchable" data-search="beep"></div>
<div class="searchable" data-search="beepandboop"></div>
```

  ...and dynamically creates and updates a stylesheet node for search. 

```js
var search = require('lookfor')();

search('beep');
search('boop');
```

  see [examples](https://github.com/bredele/lookfor/blob/master/examples/index.html).
  

## How does it work?
 
  `lookfor` relies on CSS3 selectors (such as `:not()` and `[attr*=]`) rather than JavaScript. Instead changing one by one all the elements matching the query, `lookfor` updates the inner HTML of a single `<style>` element. Here's an example:

```html
<style>
	.searchable:not([data-search*='beep']) {
		display: none;
	}
</style>
```

  The browser does all the work and won't trigger unnecessary repain/relayout mechanism.


## Web components

  `lookfor` can be used to performed a full-text search in a web component. It's easy you just has to pass the web component host element (`el`):

```js
var search = require('lookfor')(el);
```

## License

The MIT License (MIT)

Copyright (c) 2014 Olivier Wietrich <olivier.wietrich@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
