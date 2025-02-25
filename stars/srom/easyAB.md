---
repo: srom/easyAB
url: 'https://github.com/srom/easyAB'
homepage: ''
starredAt: '2013-08-24T22:34:52Z'
createdAt: '2013-06-20T22:55:01Z'
updatedAt: '2024-04-19T06:47:43Z'
language: JavaScript
license: MIT
branch: master
stars: 168
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:53:10.852Z'
description: >-
  ⚠️ Unmaintained ⚠️ | A jQuery plugin for easily setting up A/B tests using
  Google Analytics.
tags: []
---

# ⚠️ This project is no longer maintained ⚠️

easyAB is a light-weight (< 2 Ko) jQuery plugin for easily setting up A/B and multivariate tests using Google Analytics.

This tool aims at helping entrepreneurs and tech savvy people building better landing pages for their projects and products.

## Quick start

```javascript
// change the color of .my-button for 50% of my visitors and
// track the users with analytics using a single method!
$('.my-button').easyab({
  'slot': 5, // set the custom var on the slot 5
  'name': 'test-button',
  'default-value': 'green',
  'alternatives': [
    {
      // set an alternative
      'value': 'blue',
      'alternative': function($this) { $this.css('background-color', 'blue'); }
    }
  ],
});
```

## License

Copyright 2013 [Romain Strock](https://twitter.com/romainstrock) - [MIT License](https://github.com/srom/easyAB/blob/master/LICENSE)
