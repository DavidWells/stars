---
repo: jjenzz/pretty-cache-header
url: 'https://github.com/jjenzz/pretty-cache-header'
homepage: null
starredAt: '2025-12-22T19:50:47Z'
createdAt: '2023-01-03T15:21:16Z'
updatedAt: '2025-12-27T21:11:59Z'
language: TypeScript
license: MIT
branch: main
stars: 256
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-12-27T22:31:48.467Z'
description: >-
  Cache-control header utility that parses human readable time strings into
  seconds.
tags: []
---

# pretty-cache-header

Cache-control header utility that parses human readable time strings into seconds.

Time based values use [Template Literal Types](https://www.typescriptlang.org/docs/handbook/2/template-literal-types.html) to help avoid passing invalid time string formats.

## Installation

```sh
npm i pretty-cache-header
```

## Usage

```node
import { cacheHeader } from 'pretty-cache-header';

return new Response(..., {
  headers: {
    // sets cache control header to "public, max-age=604800, stale-while-revalidate=31536000"
    'Cache-Control': cacheHeader({
      public: true,
      maxAge: '1week',
      staleWhileRevalidate: '1year'
    })
  }
})
```

### TimeString format

Any number followed by a timestring keyword:

1. `ms`, `milli`, `millisecond`, `milliseconds` - will parse to milliseconds
2. `s`, `sec`, `secs`, `second`, `seconds` - will parse to seconds
3. `m`, `min`, `mins`, `minute`, `minutes` - will parse to minutes
4. `h`, `hr`, `hrs`, `hour`, `hours` - will parse to hours
5. `d`, `day`, `days` - will parse to days
6. `w`, `week`, `weeks` - will parse to weeks
7. `mon`, `mth`, `mths`, `month`, `months` - will parse to months
8. `y`, `yr`, `yrs`, `year`, `years` - will parse to years
