---
repo: callumacrae/socialSharesBookmarklet
url: 'https://github.com/callumacrae/socialSharesBookmarklet'
homepage: null
starredAt: '2014-02-20T10:07:34Z'
createdAt: '2014-02-19T19:43:16Z'
updatedAt: '2016-08-22T19:41:12Z'
language: JavaScript
license: NA
branch: master
stars: 2
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:05.190Z'
description: A bookmarklet to show you how many times something has been shared.
tags: []
---

# Social shares bookmarklet

This is the repository for a bookmarklet which shows you how many times a link has been shared when you hover the mouse over it.

To use the bookmarklet, add the following as a bookmark:

```
javascript:(function(){var s=document.createElement('script');s.src='http://macr.ae/stuff/ssb/script.min.js';document.body.appendChild(s);})();
```

Unminified, it does the following:

```javascript
(function () {
	var s = document.createElement('script');
	s.src = 'http://macr.ae/stuff/ssb/script.min.js';
	document.body.appendChild(s);
})();
```
