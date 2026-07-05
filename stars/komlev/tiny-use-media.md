---
repo: komlev/tiny-use-media
url: 'https://github.com/komlev/tiny-use-media'
homepage: ''
starredAt: '2022-02-02T21:04:46Z'
createdAt: '2022-02-01T17:17:36Z'
updatedAt: '2025-02-11T15:51:35Z'
language: JavaScript
license: MIT
branch: main
stars: 53
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:16.729Z'
description: Small (0.5 Kb) react hook for getting media breakpoints state info in runtime
tags:
  - breakpoints
  - hooks
  - media
  - usemedia
---

# tiny-use-media

Small (0.5 Kb) react hook for getting media breakpoints state info in runtime

## Usage

```
npm i tiny-use-media --save
```

Adn in your react code

```js
import { useMedia } from "tiny-use-media";

// ...

const { current, md, lg } = useMedia({
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
});

console.log({ current, md, lg });
/*
  if you current screen size is 900px
  it will print:
  { current: 'md', md: true, lg: false }
*/
```

## API

Input:

```js
// object with breakpoints names/values
const breakpointsConfig = {
  mobile: 320, // min-width for mobile
  tablet: 640, // min-width for tablet
  desktop: 1024, // min-width for desktop
};

useMedia(breakpointsConfig);
```

Output:

```js
const output = useMedia(breakpointsConfig);
```

Output contains "**current**" field which corresponds to a current breakpoint.

It also contains boolean values for each provided breakpoint.

E.g. output for screen size of 900px

```js
{
    current: "tablet",
    mobile: true,
    tablet: true,
    desktop: false
}
```

## License

MIT
