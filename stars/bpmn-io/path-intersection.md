---
repo: bpmn-io/path-intersection
url: 'https://github.com/bpmn-io/path-intersection'
homepage: 'https://www.npmjs.com/package/path-intersection'
starredAt: '2022-02-18T06:06:34Z'
createdAt: '2017-12-13T08:58:07Z'
updatedAt: '2025-02-10T06:15:19Z'
language: JavaScript
license: MIT
branch: main
stars: 112
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:19.241Z'
description: Computes the intersection between two SVG paths.
tags:
  - intersection
  - path-intersection
  - svg
---

# path-intersection

[![CI](https://github.com/bpmn-io/path-intersection/workflows/CI/badge.svg)](https://github.com/bpmn-io/path-intersection/actions?query=workflow%3ACI)

Computes the intersection between two SVG paths.


## Examples

<img width="600" src="https://raw.githubusercontent.com/bpmn-io/path-intersection/master/resources/examples.png" alt="Intersection examples" />

Execute `npm run dev` and navigate to [`http://localhost:9876/debug.html`](http://localhost:9876/debug.html) to see more examples.


## Usage

```javascript
import intersect from 'path-intersection';

const path0 = 'M30,100L270,20';
const path1 = 'M150,150m0,-18a18,18,0,1,1,0,36a18,18,0,1,1,0,-36z';

const intersection = intersect(path0, path1);
// [ { x: ..., y: ..., segment1: ..., segment2: ... }, ... ]
```

Results are approximate, as we use [bezier clipping](https://math.stackexchange.com/questions/118937) to find intersections.


## Building the Project

```
# install dependencies
npm install

# build and test the library
npm run all
```


## Credits

The intersection logic provided by this library is derived from [`path.js`](https://github.com/adobe-webplatform/Snap.svg/blob/master/src/path.js), a part of [Snap.svg](https://github.com/adobe-webplatform/Snap.svg).


## License

Use under the terms of the [MIT license](http://opensource.org/licenses/MIT).
