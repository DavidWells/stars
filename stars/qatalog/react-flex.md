---
repo: qatalog/react-flex
url: 'https://github.com/qatalog/react-flex'
homepage: null
starredAt: '2022-09-19T00:39:19Z'
createdAt: '2021-11-24T22:19:21Z'
updatedAt: '2024-01-09T14:44:56Z'
language: TypeScript
license: MIT
branch: main
stars: 8
isPublic: true
isTemplate: false
isArchived: true
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:21:29.345Z'
description: A browser-agnostic flexbox component with CSS gap support
tags: []
---

<!-- omit in toc -->
# @qatalog/react-flex

1. [What's this?](#whats-this)
2. [Why should I use this package?](#why-should-i-use-this-package)
3. [What CSS-in-JS library does this package use?](#what-css-in-js-library-does-this-package-use)
4. [How do I use it?](#how-do-i-use-it)
5. [What is the full list of props?](#what-is-the-full-list-of-props)
6. [What versions of Node does it support?](#what-versions-of-node-does-it-support)
7. [Is there a changelog?](#is-there-a-changelog)
8. [What license is it released under?](#what-license-is-it-released-under)

## What's this?

A browser-agnostic flexbox component with CSS gap polyfill support. Uses feature detection to ensure consistent rendering across platforms.

## Why should I use this package?

There are 3 main reasons to use this package compared to other similar packages in the ecosystem.

1. **Simplicity**: This package provides only a single component called `Flex` which renders a single DOM element with flexbox. This allows users to compose however many layers of flexboxes they want. This package also keeps the props of the component simple and straightforward.
2. **Flexibility**: This package neither assumes any responsive design logic nor hardcodes measurements. This allows users to provide these values when using the component making it usable in all scenarios.
3. **Compatibility**: This package supports browsers that do not support `gap` CSS property by using `margin` CSS properties and custom calculation logic. This allows users to fearlessly use the flexbox grid design everywhere.

## What CSS-in-JS library does this package use?

While we do use [styled-components](https://styled-components.com/), we are open to any contributions that makes this package independent of styling libraries.

## How do I use it?

Simply import it and use it as any regular component.

```tsx
import Flex from '@qatalog/react-flex';

const Button = ({}) => {
  return (
    <Flex direction="row" alignItems="center" wrap="wrap" gap={8}>
      <div>One</div>
      <div>Two</div>
    </Flex>
  );
};

export default Button;
```

## What is the full list of props?

All the below props are optional.

- `alignContent`: Value for CSS style property `align-content`
- `alignItems`: Value for CSS style property `align-items`
- `justifyContent`: Value for CSS style property `justify-content`
- `direction`: Value for CSS style property `flex-direction`
- `wrap`: Value for CSS style property `flex-wrap`
- `inline`: Extrapolates value for CSS style property `display`. Defaults to `false`.
  + `false`: Value is `flex`
  + `true`: Value is `inline-flex`
- `gap`: Value of gap between children in `px` units. Defaults to `0`. Uses `gap` CSS style property if supported.
- `as`: Renders the component as this type of DOM element. Type of prop is `React.ElementType`. Defaults to `div`.

## What versions of Node does it support?

Minimum supported node version is `14`.

## Is there a changelog?

[Yes](CHANGELOG.md).

## What license is it released under?

[MIT](LICENSE).
