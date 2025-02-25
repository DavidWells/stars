---
repo: sungwoncho/pixel-explorer
url: 'https://github.com/sungwoncho/pixel-explorer'
homepage: ''
starredAt: '2015-10-19T02:23:40Z'
createdAt: '2015-09-28T13:02:33Z'
updatedAt: '2015-10-25T06:08:55Z'
language: JavaScript
license: MIT
branch: master
stars: 4
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:52:36.300Z'
description: Explore the screen and look for the pixels with the desired color.
tags: []
---

# Pixel Explorer

[![Build Status](https://travis-ci.org/sungwoncho/pixel-explorer.svg?branch=master)](https://travis-ci.org/sungwoncho/pixel-explorer)

Explore the screen and look for the pixels with the desired color. Optionally draw the output.

## Installation

    npm install pixel-explorer

## API

### find(x, y, size, color)

Finds the pixels with the desired `color`. Search through all pixels in a
rectangle whose sides are of length `size`. The rectangle begins at `x` and `y`
of the screen.

Returns an array of objects containing x and y coordinates of the
pixels.

```javascript
var pixelExplorer = require('pixel-explorer');

pixelExplorer.find(350, 400, 6, '423c42');
// => [{x: 351, y: 400}, {x: 351, y: 401}, {x: 355, y: 400},
//     {x: 352, y: 409}, {x: 352, y: 403}]
```

### explore(x, y, size)

Explores the rectangle from `x` and `y` whose sides are of length `size`.

Returns an array of objects containing x and y coordinates, and the colors
of the pixels.

```javascript
var pixelExplorer = require('pixel-explorer');

pixelExplorer.explore(350, 400, 6);
// => [{x: 350, y: 406, color: '423c42'}, {x: 351, y: 402, color: 'fafafa'},
//     {x: 355, y: 403, color: '0f840f'}, {x: 352, y: 409, color: '000000'},
//     {x: 354, y: 400, color: 'fafafa'}]
```

### draw(x, y, size, color)

Find the specific color in the rectangle specified by the arguments and draws
the result in the console.

*Limitation: the output may not fit in the console depending on the size*

```javascript
var pixelExplorer = require('pixel-explorer');

pixelExplorer.draw(350, 400, 6, '423c42');

// => Output
//  ┌─────┬─────┬─────┬─────┬─────┬─────┬─────┐
//  │     │ 350 │ 351 │ 352 │ 353 │ 354 │ 355 │
//  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
//  │ 400 │     │ X   │     │     │     │ X   │
//  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
//  │ 401 │     │ X   │     │     │     │     │
//  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
//  │ 402 │     │     │ X   │     │     │     │
//  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
//  │ 403 │     │     │ x   │     │     │     │
//  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
//  │ 404 │     │     │     │     │     │     │
//  ├─────┼─────┼─────┼─────┼─────┼─────┼─────┤
//  │ 405 │     │     │     │     │     │     │
//  └─────┴─────┴─────┴─────┴─────┴─────┴─────┘
```

## Contributing

Open issues with bugs or feature requests.

### Run test

    npm test

### Roadmap

* Better draw using node-canvas and png output
* Compare the explored output with pre-set values

## License

MIT
