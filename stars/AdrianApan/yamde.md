---
repo: AdrianApan/yamde
url: 'https://github.com/AdrianApan/yamde'
homepage: 'https://codesandbox.io/s/modest-framework-6zmgb?file=/src/App.js'
starredAt: '2021-04-18T07:42:53Z'
createdAt: '2021-04-12T18:11:58Z'
updatedAt: '2023-04-24T19:09:57Z'
language: TypeScript
license: MIT
branch: master
stars: 25
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:17:49.668Z'
description: Yet another markdown editor.
tags:
  - dark
  - light
  - markdown
  - markdown-editor
  - react
  - react-component
  - reactjs
  - themes
  - typescript
---

## YAMDE

![yamde_logo_light](https://user-images.githubusercontent.com/69169115/114769765-86de3f00-9d62-11eb-9b28-c691f62f0e86.png)

Y.A.M.D.E - yet another markdown editor.

**Demo:**

[![View YAMDE demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/modest-framework-6zmgb?fontsize=14&hidenavigation=1&theme=dark)

---

### 🌱 Features

- Responsive
- Light/dark mode support
- Customizable toolbar
- Lightweight: [Bundlephobia](https://bundlephobia.com/result?p=yamde)

---

### 🔧 Installation

`npm install yamde`

---

### 💻 Usage

Example implementation:

```jsx
import React, { useState } from 'react'
import Yamde from 'yamde'

export const App = () => {
  const [text, setText] = useState('')

  return <Yamde value={text} handler={setText} theme="light" />
}
```

---

### ⚙️ Options

#### 🎨 Themes

There are two available theme: `dark` and `light`.
This can be controlled via the `theme` prop (defaults to `light` if non specified).

**Light**

```jsx
<Yamde value={text} handler={setText} theme="light" />
```

![CleanShot 2021-04-15 at 00 26 39](https://user-images.githubusercontent.com/69169115/114793141-a6d12b00-9d81-11eb-9005-828d5ed6c931.gif)

**Dark**

```jsx
<Yamde value={text} handler={setText} theme="dark" />
```

![CleanShot 2021-04-15 at 00 28 50](https://user-images.githubusercontent.com/69169115/114793167-b5b7dd80-9d81-11eb-9ca9-c8c2a90e27c0.gif)

#### ⌨️ Toolbar actions

You can customize the toolbar actions by passing in the `toolbar` prop (`toolbar?: string[]`).
Omiting this prop will default to showing all available actions.

```jsx
<Yamde value={text} handler={setText} toolbar={['bold', 'italic', 'strikethrough']} />
```

Available actions:

| Identifier      | Description            |
| --------------- | ---------------------- |
| `bold`          | **Bold** text.         |
| `italic`        | _Italic_ text.         |
| `strikethrough` | ~~Strikethrough~~ text |
| `heading1`      | Heading 1 (H1)         |
| `heading2`      | Heading 2 (H2)         |
| `heading3`      | Heading 3 (H3)         |
| `ulist`         | Unordered list         |
| `olist`         | Ordered list           |
| `table`         | Table markdown         |
| `image`         | Image markdown         |
| `quote`         | Blockquote markdown    |
| `code`          | Code highlight         |
| `hr`            | Horizontal rule        |

#### `required` prop

If you use YAMDE in a form that uses HTML form validation, you can set the `required` prop to `true` (by default this is set to `false`):

```jsx
<Yamde value={text} handler={setText} required />
```
