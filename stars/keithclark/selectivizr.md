---
repo: keithclark/selectivizr
url: 'https://github.com/keithclark/selectivizr'
homepage: ''
starredAt: '2015-10-01T17:55:42Z'
createdAt: '2011-01-28T16:43:11Z'
updatedAt: '2025-02-14T15:49:39Z'
language: JavaScript
license: NA
branch: master
stars: 1704
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:36.956Z'
description: >-
  selectivizr is a JavaScript utility that emulates CSS3 pseudo-classes and
  attribute selectors in Internet Explorer 6-8.
tags: []
---

Selectivizr
-----------

**CSS3 selectors for IE 6-8**


_selectivizr_ is a JavaScript utility that emulates CSS3 pseudo-classes
and attribute selectors in Internet Explorer 6-8. Simply include the
script in your pages and selectivizr will do the rest.

To use the library, you'll need to include one of the supported libraries:

  * jQuery (1.3+)
  * Dojo (1.5.0+)
  * Prototype (1.6.1+)
  * Yahoo UI Library (2.8.0+)
  * DOMAssistant (2.8.0+)
  * MooTools (1.3+)
  * NWMatcher (1.2.3+)
  
Then add the following conditional comment _AFTER_ your stylesheets:

	<!--[if (gte IE 6)&(lte IE 8)]>
	  <script type="text/javascript" src="selectivizr.js"></script>
	  <noscript><link rel="stylesheet" href="[fallback css]" /></noscript>
	<![endif]-->

This adds the `selectivizr.js` and an optional fallback CSS file to IE6-8 while
hiding for other browsers.
