---
repo: ryhan/guides.js
url: 'https://github.com/ryhan/guides.js'
homepage: ''
starredAt: '2015-04-09T15:40:54Z'
createdAt: '2013-04-10T18:33:04Z'
updatedAt: '2024-04-04T10:22:54Z'
language: CoffeeScript
license: NA
branch: master
stars: 73
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:45.663Z'
description: >-
  When designing and developing for the web, it's sometimes difficult to follow
  baselines and precisely align content. Instead of guessing, use guides.js
  overlay a grid over you HTML while you're working so that you can visually
  check that everything is aligned perfectly.
tags: []
---

guides.js
=========

When designing and developing for the web, it's sometimes difficult to follow baselines and precisely align content. Instead of guessing, use guides.js overlay a grid over you HTML while you're working so that you can visually check that everything is aligned perfectly.

### Demo
[http://ryhan.github.io/guides.js/demo/](http://ryhan.github.io/guides.js/demo/)

![Image](http://f.cl.ly/items/1P410b2u1N0Q0s1P0H0d/Screen%20Shot%202013-04-20%20at%205.37.32%20AM.png)

### Usage

Include jQuery and guides.js, and then call
```javascript
new GridSystem();
```

Pressing the "g" key will toggle the visibility of the grid.

### Options

#### Hiding on start
To hide the grid from the start, call 'hide' on your GridSystem object. For example,
```javascript
(new GridSystem()).hide();
```

#### Grid Spacing / Alignment
You can also pass a few parameters to adjust the grid. For example, to adjust the alignment and spacing of the grid, one might call
```javascript
new GridSystem({
  align: 'left',
  x: { major: 300, minor: 100, gutter: 20},
  y: { minor: 50 }
});
```

<table>
  <tr>
    <th class="name">Name</th>
    <th class="type">Type</th>
    <th class="default">Default</th>
    <th class="desc">Description</th>
  </tr>
  <tr>
    <td>align</td>
    <td>string</td>
    <td>'center'</td>
    <td class="desc">Decides how the grid should be aligned. Particularly important for resizing. Can be set to 'left' or 'center'.</td>
  </tr>
  <tr>
    <td>x</td>
    <td>object</td>
    <td>major: 150, minor: 0, gutter: 30</td>
    <td class="desc">Set the major and minor gridlines as well as gutters for vertical lines. All values are in pixels.</td>
  </tr>
  <tr>
    <td>y</td>
    <td>object</td>
    <td>major: 192, minor: 24, gutter: 0 </td>
    <td class="desc">Set the major and minor gridlines as well as gutters for horizontal lines. All values are in pixels.</td>
  </tr>
</table>
