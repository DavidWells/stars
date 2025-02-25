---
repo: ccampbell/gator
url: 'https://github.com/ccampbell/gator'
homepage: 'http://craig.is/riding/gators'
starredAt: '2015-01-04T08:59:33Z'
createdAt: '2012-11-28T16:49:21Z'
updatedAt: '2024-05-31T22:33:14Z'
language: JavaScript
license: NA
branch: master
stars: 492
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:57.951Z'
description: Event delegation in Javascript
tags:
  - event-delegation
  - events
  - javascript
---

# Gator

Gator is a Javascript event delegation library.

It is around **800** bytes when gzipped and minified and has no external dependencies.

## Browser Support

Out of the box Gator works in
- Chrome
- Safari 5+
- Firefox 3.6+
- Internet Explorer 9+

The ``legacy.js`` plugin adds support for
- Safari < 5
- Firefox < 3.6
- Internet Explorer 6, 7, 8

*When using the legacy plugin only single classes, single ids, and single tag names are supported for selectors*

## Getting Started

1.  Include gator on your page before the closing ``</body>`` tag

    ```html
    <script src="/path/to/gator.min.js"></script>
    ```

2.  Add some events

    ```html
    <script>
        // add a click event to document that checks for elements with class expand
        Gator(document).on('click', '.expand', function(e) {
            console.log('clicked on', this);
            return false;
        });

        // add a click event to document with no delegation
        Gator(document).on('click', function() {
            console.log('clicked on document!');
        });

        // remove all click events on .expand
        Gator(document).off('click', '.expand');

        // remove all click events on document
        Gator(document).off('click');
    </script>
    ```

## Documentation

Full documentation is available at http://craig.is/riding/gators
