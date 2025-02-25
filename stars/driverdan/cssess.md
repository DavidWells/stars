---
repo: driverdan/cssess
url: 'https://github.com/driverdan/cssess'
homepage: ''
starredAt: '2013-12-02T20:45:49Z'
createdAt: '2010-11-21T20:45:09Z'
updatedAt: '2025-01-05T16:05:12Z'
language: JavaScript
license: NOASSERTION
branch: master
stars: 159
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:07.125Z'
description: JS tool to scan websites for unused CSS selectors
tags: []
---

CSSess
======

CSSess is a JS tool that helps find extra CSS rules on your site. It is designed to be used as a bookmarklet.

The name CSSess comes from the word secess and is pronounced the same way. secess means withdraw or retreat.

It was inspired by Helium (https://github.com/geuis/helium-css/). CSSess has many improvements over Helium:

* Helium depends on querySelectorAll, restricting use to the latest browsers. CSSess uses jQuery as a selector engine.
* Helium requires that you add URLs to check manually. CSSess will spider all same domain links on the current page.
* Helium was designed to be included within the page. CSSess is designed to be used as a bookmarklet.

To install as a bookmarklet use the following in a bookmark URL:

	javascript:(function(d,t){var j=d.createElement(t),s=d.getElementsByTagName(t)[0]||d.getElementsByTagName("link")[0];j.src='http://driverdan.github.com/cssess/cssess-min.js';s.parentNode.insertBefore(j,s);})(document,"script");

To use the un-minified version replace cssess-min.js with cssess.js.

How It Works
------------

Each URL is loaded into a hidden iframe. Once the iframe has finished loading all of the stylesheets and inline styles are checked against the DOM to find unused styles.

Notes
-----

* CSSess will not work cross-domain due to browser security restrictions.
* Contributions are welcome. Feel free to fork on github and submit a pull request.
