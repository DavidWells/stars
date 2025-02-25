---
repo: uiwjs/react-only-when
url: 'https://github.com/uiwjs/react-only-when'
homepage: 'https://uiwjs.github.io/react-only-when/'
starredAt: '2021-07-25T03:15:20Z'
createdAt: '2021-06-19T03:47:41Z'
updatedAt: '2025-01-07T12:18:41Z'
language: TypeScript
license: MIT
branch: main
stars: 11
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:49.880Z'
description: A declarative component for conditional rendering.
tags:
  - react-component
  - reactjs
  - uiw
  - uiwjs
---

react-only-when
===

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor)
[![Build & Deploy](https://github.com/uiwjs/react-only-when/actions/workflows/ci.yml/badge.svg)](https://github.com/uiwjs/react-only-when/actions/workflows/ci.yml)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/@uiw/react-only-when)](https://www.npmjs.com/package/@uiw/react-only-when)
[![npm version](https://img.shields.io/npm/v/@uiw/react-only-when.svg)](https://www.npmjs.com/package/@uiw/react-only-when)
[![Coverage Status](https://uiwjs.github.io/react-only-when/badges.svg)](https://uiwjs.github.io/react-only-when/coverage/lcov-report/)

A declarative component for conditional rendering. Copy [`react-only-when`](https://github.com/sag1v/react-only-when), let it support TypeScript.

## Quick Start

```bash
$ npm install --save @uiw/react-only-when
```

## Usage

```jsx
import Only from '@uiw/react-only-when'
 
<Only when={true}>
  <h1>Here I Am</h1>
</Only>
```

```jsx
import { If } from '@uiw/react-only-when/if'

<If condition={props.error}>
  <h1>{props.error}</h1>
</If>
```

```jsx
import { Switch, Case, Default } from '@uiw/react-only-when/switch'

<Switch>
  <Case condition={age < 6}>preschool</Case>
  <Case condition={age >= 6}>primary school</Case>
  <Default>you graduated</Default>
</Switch>
```

## \<If />

React component that renders the children if the `condition` prop is `true`.

```jsx
import { If } from '@uiw/react-only-when';
// Or
import { If } from '@uiw/react-only-when/if'

<div>
  <If
    condition={props.error}
    render={() => (
      <h1>{props.error}</h1>
    )}
  />
  <If condition={props.error}>
    <h1>{props.error}</h1>
  </If>
</div>
```

Or you could just use plain JavaScript:

```jsx
<div>
  {props.error && (
    <h1>{props.error}</h1>
  )}
</div>
```

Only Example

```jsx mdx:preview&background=#fff&codePen=true
import React, { useState } from 'react';
import Only from '@uiw/react-only-when';

export default function App() {
  const [show, setShow] = useState(true)
  return (
    <div className="app">
      <button onClick={() => setShow(!show)}>Toggle</button>
      <Only when={show}>
        <h1>Here I Am</h1>
      </Only>
    </div>
  )
}
```

## \<Switch />

```jsx
import { Switch, Case, Default } from '@uiw/react-only-when/switch'

<Switch>
  <Case condition={age < 6}>preschool</Case>
  <Case as="div" condition={age >= 6}>primary school</Case>
  <Default>you graduated</Default>
</Switch>
```

```jsx mdx:preview&background=#fff&codePen=true
import React, { useState, Fragment } from 'react';
import { Switch, Case, Default } from '@uiw/react-only-when/switch'

export default function App() {
  const [age, setAge] = useState(19)
  return (
    <Fragment>
      <input type="range" onChange={(evn) => setAge(Number(evn.target.value))} /> {age}<br />
      <Switch>
        <Case condition={age < 6}>Preschool</Case>
        <Case condition={age >= 6 && age < 18}>Primary school</Case>
        <Case condition={age >= 18 && age < 60}>Went to college</Case>
        <Default>you graduated</Default>
      </Switch>
    </Fragment>
  );
}
```

Defaults to specifying a wrapped HTML Element.

```jsx mdx:preview&background=#fff&codePen=true
import React, { useState, Fragment } from 'react';
import { Switch, Case, Default } from '@uiw/react-only-when/switch'

export default function App() {
  const [age, setAge] = useState(19)
  return (
    <Fragment>
      <input type="range" onChange={(evn) => setAge(Number(evn.target.value))} /> {age}
      <br />
      <Switch>
        <Case as="span" condition={age < 6}>Preschool</Case>
        <Case as="em" condition={age >= 6 && age < 18}>Primary school</Case>
        <Case as="div" condition={age >= 18 && age < 60}>Went to college</Case>
        <Default as="p">you graduated</Default>
      </Switch>
    </Fragment>
  );
}
```

## `<Only />` props

| prop name  | type | default | isRequired | description |
| ----- | ----- | ----- | ----- | ----- |
| children | react element | `null` | `true` | A single child element |
| when | bool | `false` | `true` | When true, children will rendered as is |
| hiddenMode | string | `null`   | `false` | Determines how children should be hidden |
| className  | string | `w-hidden` | `false` | This is working in combination with `hiddenMode={"css"}` |

**`hiddenMode` enum**

| hiddenMode | description |
| ----- | ----- |
| `null` | Will not render the child |
| `display` | Will render the child with `display:none` |
| `visibility` | Will render the child with `visibility:hidden` |
| `css` | Will render the child with a CSS class (you can pass it a custom `className` prop) |

## `<If />` Props

```tsx
import { ReactElement } from 'react';
import { FC, PropsWithChildren } from 'react';
export interface IfProps {
  readonly condition?: boolean;
  readonly render?: () => ReactElement;
}
export declare const If: FC<PropsWithChildren<IfProps>>;
```

## `<Switch />` `<Case />` `<Default />` Props

```tsx
import type { FC, PropsWithChildren } from 'react';
export const Switch: FC<PropsWithChildren<{}>>;
type TagType = React.ElementType | keyof JSX.IntrinsicElements;
interface CaseElementProps<T extends TagType> {
  as?: T;
  readonly condition?: boolean;
}
export type CaseProps<T extends TagType> = CaseElementProps<T> & React.ComponentPropsWithoutRef<T>;
export const Case: <T extends TagType>(props: CaseProps<T>) => any;
export const Default: <T extends TagType>(props: Omit<CaseProps<T>, 'condition'>) => import("react/jsx-runtime").JSX.Element;
```

## Development

Runs the project in development mode.  

```bash
# Step 1, run first, listen to the component compile and output the .js file
# listen for compilation output type .d.ts file
npm run watch
# Step 2, development mode, listen to compile preview website instance
npm run start
```

**production**

Builds the app for production to the build folder.

```bash
npm run build
```

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/uiwjs/react-only-when/graphs/contributors">
  <img src="https://uiwjs.github.io/react-only-when/CONTRIBUTORS.svg" />
</a>

Made with [contributors](https://github.com/jaywcjlove/github-action-contributors).


## License

MIT © [`sag1v`](https://github.com/sag1v) & [`uiwjs`](https://github.com/uiwjs)
