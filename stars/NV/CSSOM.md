---
repo: NV/CSSOM
url: 'https://github.com/NV/CSSOM'
homepage: 'https://nv.github.io/CSSOM/docs/parse.html'
starredAt: '2015-01-06T01:51:52Z'
createdAt: '2010-10-26T11:24:05Z'
updatedAt: '2025-02-05T02:13:45Z'
language: JavaScript
license: MIT
branch: master
stars: 751
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:56.971Z'
description: >-
  Unmaintained! ⚠️ CSS Object Model implemented in pure JavaScript. Also, a CSS
  parser.
tags:
  - css-parser
  - cssom
  - dom
  - javascript
---

# CSSOM

CSSOM.js is a CSS parser written in pure JavaScript. It is also a partial implementation of [CSS Object Model](http://dev.w3.org/csswg/cssom/). 

    CSSOM.parse("body {color: black}")
    -> {
      cssRules: [
        {
          selectorText: "body",
          style: {
            0: "color",
            color: "black",
            length: 1
          }
        }
      ]
    }


## [Parser demo](http://nv.github.io/CSSOM/docs/parse.html)

Works well in Google Chrome 6+, Safari 5+, Firefox 3.6+, Opera 10.63+.
Doesn't work in IE < 9 because of unsupported getters/setters.

To use CSSOM.js in the browser you might want to build a one-file version that exposes a single `CSSOM` global variable:

    ➤ git clone https://github.com/NV/CSSOM.git
    ➤ cd CSSOM
    ➤ node build.js
    build/CSSOM.js is done

To use it with Node.js or any other CommonJS loader:

    ➤ npm install cssom

## Why is this not maintained?

1. I no longer use it in my projects
2. Even though cssom npm package has 26 million weekly downloads (as of April 17, 2023), I haven't made a dollar from my work.

If you want specific issues to be resolved, you can hire me for $100 per hour (which is 1/2 of my normal rate).

## Don’t use it if...

You parse CSS to mungle, minify or reformat code like this:

```css
div {
  background: gray;
  background: linear-gradient(to bottom, white 0%, black 100%);
}
```

This pattern is often used to give browsers that don’t understand linear gradients a fallback solution (e.g. gray color in the example).
In CSSOM, `background: gray` [gets overwritten](http://nv.github.io/CSSOM/docs/parse.html#css=div%20%7B%0A%20%20%20%20%20%20background%3A%20gray%3B%0A%20%20%20%20background%3A%20linear-gradient(to%20bottom%2C%20white%200%25%2C%20black%20100%25)%3B%0A%7D).
It does **NOT** get preserved.

If you do CSS mungling, minification, or image inlining, considere using one of the following:

  * [postcss](https://github.com/postcss/postcss)
  * [reworkcss/css](https://github.com/reworkcss/css)
  * [csso](https://github.com/css/csso)
  * [mensch](https://github.com/brettstimmerman/mensch)


## [Tests](http://nv.github.com/CSSOM/spec/)

To run tests locally:

    ➤ git submodule init
    ➤ git submodule update


## [Who uses CSSOM.js](https://github.com/NV/CSSOM/wiki/Who-uses-CSSOM.js)
