---
repo: jamesyu/css_page_flip
url: 'https://github.com/jamesyu/css_page_flip'
homepage: ''
starredAt: '2014-06-18T00:28:04Z'
createdAt: '2010-01-23T20:56:09Z'
updatedAt: '2024-04-04T20:53:41Z'
language: JavaScript
license: NA
branch: master
stars: 24
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:04.023Z'
description: Page flipping using javascript and CSS3 in webkit.
tags: []
---

h1. CSS Page Flip: a CSS and JS 3D Page Flipper

*Version 0.2 (Jan 2010)*

This is an open source pure CSS and Javascript 3D Page Flipping framework (which requires jQuery)

h2. What does this do?

It converts this:

<pre><code>
<ol id="foo">
	<li>Page 1</li>
	<li>Page 2</li>
	<li>Page 3</li>
</ol>
</code></pre>

Into a page flippable layout using pure CSS3 animations. Currently works in Safari and iPhone.

Example in action:  "http://jamesyu.org/css_page_flip/examples/example.html":http://jamesyu.org/css_page_flip/examples/example.html
Download the source here: "http://jamesyu.org/css_page_flip/lib/css_page_flip.js":http://jamesyu.org/css_page_flip/lib/css_page_flip.js

h2. Usage

Simply include all source files under lib, and (for the example above) call:

<pre><code>
	CSSPageFlip.init('foo');
</code></pre>
	
You can apply your own styles to each page by targeting "ol li .page". CSSPageFlip
will set the size of the flipping UI to fill the space in the containing element.

See the examples directory for more usage details.

h2. TODO

* AJAX fetching for more pages
* Better animations
* Optional controls, zooming, and other goodness
