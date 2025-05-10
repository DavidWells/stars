---
repo: mogelbrod/widont
url: 'https://github.com/mogelbrod/widont'
homepage: 'https://www.npmjs.com/package/widont'
starredAt: '2025-05-05T17:40:27Z'
createdAt: '2017-11-16T11:16:24Z'
updatedAt: '2025-05-05T17:40:27Z'
language: JavaScript
license: NA
branch: master
stars: 9
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-05-10T22:30:18.530Z'
description: >-
  Avoids typographical widows in strings by converting the last space/hyphens to
  be non-breaking
tags:
  - javascript
---

# widont

In typesetting, single words on the last line of a paragraph are commonly known
as [widows](https://en.wikipedia.org/wiki/Widows_and_orphans), and are
considered bad style. `widont` eliminates the issue of widows by using a
non-breaking space to force the last two words of a string onto the same line.
If the last word contains hyphens they will be converted to the non-breaking
variant instead.

## Usage

```js
var widont = require('widont')

widont('I dream of a world without widows')
// => 'I dream of a world without\u00a0widows'

widont('I like words with hyphens that stick-together')
// => 'I like words with hyphens that stick\u2011together'

widont('I get HTML entities instead', 'html')
// => 'I get HTML entities&nbsp;instead'

widont('I get exclamation marks', { spaces: '!!', hyphens: '??' })
// => 'I get exclamation!!marks'
```

### In TypeScript

```ts
import * as widont from 'widont'

widont('TypeScript says hello', 'html')
// => 'TypeScript says&nbsp;hello'
```

## API

### `widont(string, [replacements='unicode'], [minWords=3])`

Replaces any number of whitespace before the last word of `string` with a
non-breaking space, unless the last word contains hyphens in which case they
will be replaced (by non-breaking hyphens) instead. Trims trailing whitespace
at the end of `string` if present. Returns non-string inputs as-is.

The optional `replacements` argument specifies what characters to use as
replacements. It can either be a string that maps to a set of predefined
characters (`unicode`, `html` or `ascii`), or an object with the keys `space`
and `hyphen` (both must be provided):

```js
{
  space: '_',
  hyphen: '~'
}
```

A `TypeError` will be thrown for unknown or incomplete `replacements` values.

The `minWords` argument specifies the minimum number of words requires to be
present in the string for the replacement to be applied. It defaults to 3 to
avoid forcing strings only consisting of two words to be kept together, as that
could lead to them overflowing.

## Origins
The original `widont` was created by
[Shaun Inman](https://shauninman.com/archive/2006/08/22/widont_wordpress_plugin).
This implementation is based on the version in
[Kirby CMS](https://github.com/getkirby/toolkit/blob/0ceeb44186ec0e34e45e283ddf0f99a00c192ba9/lib/str.php#L378),
which extends the original by using non-breaking hyphens if the last word
contains hyphens.

## License

[MIT](http://www.opensource.org/licenses/mit-license.php)
