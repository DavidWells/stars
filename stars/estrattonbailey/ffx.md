---
repo: estrattonbailey/ffx
url: 'https://github.com/estrattonbailey/ffx'
homepage: ''
starredAt: '2023-11-25T20:55:07Z'
createdAt: '2017-07-26T18:51:37Z'
updatedAt: '2023-11-25T23:35:57Z'
language: JavaScript
license: NA
branch: master
stars: 19
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:43.314Z'
description: Teeny-tiny flexbox grid for React
tags: []
---

# ffx
Teeny-tiny flexbox grid for React. **2kb gzipped.**

[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](http://standardjs.com)

## Features/Goals
1. No boilerplate, no config
2. Outputs Real CSS™
3. Nestable
4. Uses relative units (em)
5. SSR API

## Usage
ffx exports two components, `Flex` and `Box`. `Flex` is designed to be the wrapper and *immediate* parent of `Box`.
```javascript
import { Flex, Box } from 'ffx'

<Flex>
  <Box />
  <Box />
</Flex>
```

Examples:
```javascript
// 1em gutter
<Flex gutter={1} />

// 1em gutter, 2em gutter above 800px
<Flex gutter={[ 1, [ 800, 2 ] ]} />

// wrappable flexbox
<Flex wrap={true} />

// wrappable flexbox, nowrap above 800px
<Flex wrap={[ true, [ 800, false ] ]} />

// passed directly to align-items
<Flex alignItems='flex-start' />

// passed directly to justifyContent
<Flex justifyContent='flex-start' />

// 50% wide
<Box width={1/2} /> // or <Box width={0.5} />

// 100% wide, 50% wide above 800px
<Box width={[ 1, [ 800, 1/2 ] ]} />

// 200px wide
<Box width='200px' />

// fill available space
<Box width='auto' />

// 200px wide, auto width above 800px
<Box width={[ '200px', [ 800, 'auto' ] ]} />

// flex order
<Box order={-1} />

// flex order
<Box order={[ -1, [ 800, 'unset' ] ]} />

// offset by 25%
<Box offset={1/4} width={1/2} />

// offset by 50% above 800px
<Box offset={[[800, 1/2]]} width={[ 1, [ 800, 1/2 ] ]} />
```

CSS output from above elements:
```css
.⚡︎0{margin-left: -0.5em; margin-right: -0.5em}.⚡︎1{flex-wrap: nowrap}.⚡︎3{margin-left: -0em; margin-right: -0em}.⚡︎4{flex-wrap: wrap}@media(min-width:50em){.⚡︎5{flex-wrap: nowrap}}@media(min-width:50em){.⚡︎2{margin-left: -1em; margin-right: -1em}}
```

## Nesting
Grids are fully nestable.
```javascript
<Flex gutter={1}>
  <Box width={1/3} />
  <Box width={2/3}>
    <Flex gutter={1}>
      <Box width={1/2} />
      <Box width={1/2} />
    </Flex>
  </Box>
</Flex>
```

## SSR
This isn't production code, just a simplified example.
```javascript
import { getCSS } from 'ffx'

const html = renderToString(<App />)
const css = getCSS()

res.send(`
<!DOCTYPE html>
<html>
  <head>
    <style id="ffx">${css}</style>
  </head>
  <body>${html}</body>
</html>
`)
```

MIT License
