---
repo: code-hike/lighter
url: 'https://github.com/code-hike/lighter'
homepage: 'https://lighter-codehike.vercel.app'
starredAt: '2023-05-28T19:46:45Z'
createdAt: '2022-12-15T15:24:36Z'
updatedAt: '2025-02-25T11:18:33Z'
language: JavaScript
license: NA
branch: main
stars: 95
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:48.602Z'
description: The syntax highlighter used by Code Hike.
tags:
  - syntax-highlighting
---

The syntax highlighter used by Code Hike.

## Usage

```js
import { highlight } from "@code-hike/lighter";

const { lines, style } = await highlight(
  /* code  */ "print('hello')",
  /* lang  */ "py",
  /* theme */ "github-dark"
);

// base foreground and background
const { color, background } = style;

console.log(lines);
```

Output:

```json
[
  [
    { "style": { "color": "#79C0FF" }, "content": "print" },
    { "style": { "color": "#C9D1D9" }, "content": "(" },
    { "style": { "color": "#A5D6FF" }, "content": "'hello'" },
    { "style": { "color": "#C9D1D9" }, "content": ")" }
  ]
]
```

For **dark/light theme support with CSS** see [#25](https://github.com/code-hike/lighter/pull/25)

For more theme colors (like line number foreground, selection background, etc.):

```js
import { getThemeColors } from "@code-hike/lighter";

const themeColors = await getThemeColors("material-darker");
```

## Credits

- Using [vscode-oniguruma](https://github.com/microsoft/vscode-oniguruma) for highlighting
- **Heavily inspired by [Shiki](https://github.com/shikijs/shiki)** and adapted to Code Hike needs.
- Some more inspiration from [starry-night](https://github.com/wooorm/starry-night)
- Grammars and some themes come from [Shiki](https://github.com/shikijs/shiki), which pulls them from different sources.

```

```
