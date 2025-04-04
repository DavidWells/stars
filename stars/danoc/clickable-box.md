---
repo: danoc/clickable-box
url: 'https://github.com/danoc/clickable-box'
homepage: ''
starredAt: '2022-02-24T06:10:35Z'
createdAt: '2018-11-14T05:12:33Z'
updatedAt: '2023-10-13T06:18:12Z'
language: JavaScript
license: MIT
branch: main
stars: 106
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:22:10.506Z'
description: >-
  React component to add `onClick` to HTML elements without sacrificing
  accessibility.
tags:
  - accessibility
  - component
  - react
---

# 📦 ClickableBox

[![NPM version](https://badgen.net/npm/v/clickable-box)](https://www.npmjs.com/package/clickable-box) [![Test build status](https://github.com/danoc/clickable-box/workflows/Test/badge.svg)](https://github.com/danoc/clickable-box/actions?query=workflow%3ATest) [![Bundle size](https://badgen.net/bundlephobia/min/clickable-box?label=size)](https://bundlephobia.com/result?p=clickable-box) [![Bundle size](https://badgen.net/bundlephobia/minzip/clickable-box?label=gzip%20size)](https://bundlephobia.com/result?p=clickable-box)

> React component to add `onClick` to HTML elements without sacrificing accessibility.

## What is this?

It's [very hard](https://www.scottohara.me/blog/2018/10/03/unbutton-buttons.html) to remove all styles from HTML `button` elements. It's also hard to create clickable `div`s that are accessible. This can cause developers to ship inaccessible UI.

The `ClickableBox` React component accepts an `onClick` prop and an element to render. It returns the element with the `onClick` as well as the attributes and event listeners needed to make it as accessible as a `button`.

## Install

You can install `ClickableBox` with npm, Yarn, or pnpm.

```bash
npm install clickable-box
yarn add clickable-box
pnpm install clickable-box
```

## Usage

Here's how to use `ClickableBox` to make a clickable SVG:

```jsx
// import ClickableBox from 'clickable-box';

<ClickableBox
  onClick={this.closeModal}
  aria-label="Close modal"
  className="icon-button"
>
  <CloseIcon />
</ClickableBox>
```

`ClickableBox` will return a `span` that looks like this:

```js
<span
  // Make the element clickable
  onClick={this.closeModal}
  // Make the element navigable by keyboard
  tabIndex={0}
  // Call `this.closeModal` if the user presses either the
  // enter or space key while the element is in focus
  onKeyDown={...}
  // Tell screen readers that the element is a button
  role="button"
  // All other props are passed through to the element
  aria-label="Close modal"
  className="icon-button"
>
  <CloseIcon />
</span>
```

The resulting HTML is accessible for users navigating by screen readers, keyboard, and mouse/touch.

## Props

There are a few props that are built into `ClickableBox`:

| prop       | type                                             | description                                                  |
| ---------- | ------------------------------------------------ | ------------------------------------------------------------ |
| `onClick`  | `function` \| defaults to: `undefined`           | The action to perform when the element is pressed            |
| `is`       | `string`, `React.Element` \| defaults to: `span` | The element to render                                        |
| `disabled` | `boolean` \| defaults to: `false`                | Makes element non-interactive, even if `onClick` is provided |
| `ref`      | `React.Ref`                                      | Provides access to the React element                         |

You can pass any custom prop as well. This component will forward those props to the rendered element.

## When should you use this?

- You're building a button that looks like plain text.
- You're building a button that has content spanning multiple columns or rows.
- You're making a clickable SVG icon.

## When shouldn't you use this?

- You're linking to another page: Use an `a` tag with an `href` instead. The anchor tag is semantically correct, allows users to preview the URL, open it in a new tab, and copy the link to their clipboard.
- You're using this as a submit button in a form. (It's possible, but [there's a quirk](https://github.com/danoc/clickable-box/issues/4).)
- You're building a button that [looks like a button](https://getbootstrap.com/docs/4.0/components/buttons/#examples): This is fairly easy to build as a `button` element with CSS.
- You think it'd be easier to simply style a `button`: This is a good sign that you should use a `button` element instead.

## FAQs

**How can I style this with `cursor: pointer`?**

`ClickableBox` accepts all props including `className` and `style` prop. If you prefer, you can add the cursor style globally with this CSS:

```css
/* Targets all instances of `ClickableBox` */
[role="button"] {
  cursor: pointer;
}
```

**What are accessibility best practices for `ClickableBox`?**

- Pass `aria-label` to `ClickableBox` if `children` contains an SVG and no descriptive text. The value of `aria-label` should describe the action that will happen if the button is interacted with. It will be announced to users navigating with screen readers.
- You shouldn't use `ClickableBox` within an anchor tag or another button. You also shouldn't use an `a` or `button` in the `children` prop.
