---
repo: SamHerbert/SVG-Loaders
url: 'https://github.com/SamHerbert/SVG-Loaders'
homepage: 'http://samherbert.net/svg-loaders'
starredAt: '2024-01-03T03:18:44Z'
createdAt: '2014-11-20T01:33:16Z'
updatedAt: '2025-02-24T20:28:18Z'
language: HTML
license: MIT
branch: master
stars: 6904
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:39.587Z'
description: Loading icons and small animations built with pure SVG.
tags: []
---

Example
===========
All loaders may be previewed at:

http://samherbert.net/svg-loaders

NOTE: Chrome 45 intended to deprecate SMIL icons but has since [suspended](https://groups.google.com/a/chromium.org/g/blink-dev/c/5o0yiO440LM/m/mHtmsQxf2bIJ) that deprecation.

Usage
===========
[Download](https://github.com/SamHerbert/SVG-Loaders/archive/master.zip) or `bower install svg-loaders`

```html
<img src="svg-loaders/puff.svg" />
```

An icon's color can be manipulated by changing the `fill` attribute in the SVG file.

```
<svg fill="#fff" width="140" height="64" viewBox="0 0 140 64" xmlns="http://www.w3.org/2000/svg">
```

Note: Not all browsers support SVG, or more specifically, animated SVGs. Check (http://caniuse.com/#feat=svg-smil) to make sure you're good to go. If not, you may want to implement a fallback.

Minify
===========
All SVG files are fairly small in size, but you can make them even smaller by minifying with something like [SVGO](https://github.com/svg/svgo).

Adaptations
===========

[React components by ajwann](https://github.com/ajwann/svg-loaders-react)

