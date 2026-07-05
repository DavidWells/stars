---
repo: WebReflection/css-proxied-vars
url: 'https://github.com/WebReflection/css-proxied-vars'
homepage: null
starredAt: '2021-03-27T04:42:13Z'
createdAt: '2021-03-06T13:46:42Z'
updatedAt: '2024-12-16T13:53:02Z'
language: JavaScript
license: ISC
branch: main
stars: 49
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:56.046Z'
description: 'The easiest way to set, read, or update, CSS variables per each element.'
tags: []
---

# css-proxied-vars

[![Build Status](https://travis-ci.com/WebReflection/css-proxied-vars.svg?branch=main)](https://travis-ci.com/WebReflection/css-proxied-vars) [![Coverage Status](https://coveralls.io/repos/github/WebReflection/css-proxied-vars/badge.svg?branch=main)](https://coveralls.io/github/WebReflection/css-proxied-vars?branch=main)

<sup>**Social Media Photo by [Michael Dziedzic](https://unsplash.com/@lazycreekimages) on [Unsplash](https://unsplash.com/)**</sup>

The easiest way to set, read, or update, CSS variables per each element.

**[Live Demo](https://codepen.io/WebReflection/pen/GRNXrEK?editors=0010)**

```js
// explicit only variant
// import proxiedVars from 'css-proxied-vars/explicit';

import proxiedVars from 'css-proxied-vars';

// example => handle all :root CSS variables
const htmlCSSVars = proxiedVars(document.documentElement);

// set CSS variables automatically
htmlCSSVars.bgColor = 'green';

// or explicitly
htmlCSSVars['--bg-color'] = 'green';

// or apply a whole theme via import or literals
Object.assign(htmlCSSVars, {
  bgColor: 'red',
  color: 'gray',
  '--other': 'value'
});
```

### Exports

  * **css-proxied-vars** recognizes explicit variable names, or automatically make *--hyphen-case* any *camelCase* property
  * **css-proxied-vars/explicit** accepts only explicit *--property-name*, without needing dependencies to do work

### Not compatible with IE

If you are targeting this obsolete browser, forget about this module 👍
