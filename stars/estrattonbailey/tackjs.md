---
repo: estrattonbailey/tackjs
url: 'https://github.com/estrattonbailey/tackjs'
homepage: 'https://tackjs.now.sh/'
starredAt: '2023-11-25T20:20:45Z'
createdAt: '2017-03-31T14:06:33Z'
updatedAt: '2023-11-25T20:29:19Z'
language: TypeScript
license: NA
branch: master
stars: 15
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:43.809Z'
description: "\U0001F4CC Tiny utility to position an element absolutely in relation to another element."
tags: []
---

# tackjs
Tiny utility to position an element absolutely in relation to another element. **500b gzipped.**

> What's this for? Think popovers, modals, tooltips, scroll-jacking, etc.

## Install
```bash
npm i tackjs --save
```

## Usage
Usage is very straightfoward. Think, "pin *element* to *target* at the *top*":
```javascript
import tack from 'tackjs'

const element = document.querySelector('...')
const target = document.querySelector('...')

const pin = tack(element, target, 'top')
```

To update the position – say after the window resizes – use `update`:
```javascript
pin.update()
```

If you need to un-pin and remove all styles:
```javascript
pin.destroy()
```

But don't worry! It can be re-pinned as well:
```javascript
pin.update()
```

**N.B.** `tackjs` also adds an `.is-tacked` class to all pinned elements.

### Alignment
Tack supports the following coordinates relative to the passed `target` element:
- `top`
- `bottom`
- `left`
- `right`
- `topLeft`
- `topRight`
- `bottomLeft`
- `bottomRight`

## License
MIT License © [Eric Bailey](https://estrattonbailey.com)
