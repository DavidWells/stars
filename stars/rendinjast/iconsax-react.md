---
repo: rendinjast/iconsax-react
url: 'https://github.com/rendinjast/iconsax-react'
homepage: 'https://iconsax-react.pages.dev/'
starredAt: '2021-10-30T01:45:30Z'
createdAt: '2021-10-25T23:22:06Z'
updatedAt: '2025-02-13T15:54:05Z'
language: TypeScript
license: MIT
branch: master
stars: 254
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:41.314Z'
description: ICONSAX for React and React Native ✌️
tags:
  - iconsax
  - react
  - react-native
  - svg-icons
---

<h1 align="center">iconsax for React and React Native</h1>

<p align="center">
  1000 icons in 6 different styles, total 6000 icons | 
Perfectly balance | 
24px grid-based
<p>

<p align="center">
  <a href="https://iconsax-react.pages.dev/"><strong>Browse icons at site</strong></a>
</p>
<br>
<br>

> ©️ iconsax [github](https://github.com/lusaxweb/iconsax) and
> [official website](https://iconsax.io/) (other format and platform available)

## Installation

### React

```bash
yarn add iconsax-react
# or
npm i iconsax-react
```

### React Native

```bash
yarn add iconsax-react-native react-native-svg
# or
npm i iconsax-react-native react-native-svg
```

## Usage

```jsx
import React from 'react';
//import icon. for React Native import from 'iconsax-react-native'
import { EmojiHappy } from 'iconsax-react';

const Example = () => {
  // then use it as a normal React Component
  return <EmojiHappy />;
};
```

You can configure Icons with inline props:

```jsx
<EmojiHappy color="#eee" variant="Bulk" size={54} />
```

## Props

| Prop      | Type                                                | Default        | Note                   |
| --------- | --------------------------------------------------- | -------------- | ---------------------- |
| `color`   | `string`                                            | `currentColor` | css color              |
| `size`    | `number` `string`                                   | 24px           | size={24} or size="24" |
| `variant` | `Linear` `Outline` `TwoTone` `Bulk` `Broken` `Bold` | `Linear`       | icons styles           |

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## License

[MIT](./LICENSE)
