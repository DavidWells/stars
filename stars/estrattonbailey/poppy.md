---
repo: estrattonbailey/poppy
url: 'https://github.com/estrattonbailey/poppy'
homepage: null
starredAt: '2023-11-25T20:20:11Z'
createdAt: '2018-10-02T21:48:35Z'
updatedAt: '2024-08-11T23:23:14Z'
language: JavaScript
license: NA
branch: master
stars: 13
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:43.943Z'
description: 'A tiny, fast, configurable popover in 1.6kb.'
tags: []
---

# poppy
A tiny, fast, configurable popover in 1.6kb. 🍻

# Usage
```javascript
import Poppy from 'poppy'

const target = document.getElementById('target')

const pop = new Poppy({
  target: target,
  popover: `
    <div class='my-popover'>
      <h5 class='mv0'>I'm a popover!</h5>
    </div>
  `,
  position: 'left', // from tackjs
  transitionSpeed: 200, // for css transitions
  onChange: ({ pinned }) => {...} // boolean
})

target.addEventListener('mouseenter', pop.pin)
target.addEventListener('mouseleave', pop.unpin)
```

Required CSS:
```css
.poppy {
  position: absolute;
  z-index: 9999;
  top: 0; left: 0;
}
```

# The Name
Huge thanks to [swathysubhash](https://github.com/swathysubhash) for letting me
use the name! This library used to be called [micro-popover](https://github.com/estrattonbailey/micro-popover).

## License
MIT License (c) 2018 Eric Bailey
