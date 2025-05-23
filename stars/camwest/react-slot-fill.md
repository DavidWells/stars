---
repo: camwest/react-slot-fill
url: 'https://github.com/camwest/react-slot-fill'
homepage: 'https://camwest.github.io/react-slot-fill/'
starredAt: '2017-03-20T20:17:28Z'
createdAt: '2017-03-07T20:01:46Z'
updatedAt: '2025-01-27T09:09:45Z'
language: TypeScript
license: NOASSERTION
branch: master
stars: 659
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:20:46.592Z'
description: Slot & Fill component for merging React subtrees together. Portal on steroids.
tags:
  - extensibility
  - framework
  - javascript
  - react
---

# react-slot-fill &middot; [![CircleCI Status](https://circleci.com/gh/camwest/react-slot-fill.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/camwest/react-slot-fill) [![Codacy Badge](https://api.codacy.com/project/badge/Coverage/e7c3e47817fc4a81baca16cdb9a78ac1)](https://www.codacy.com/app/cameron_4/react-slot-fill?utm_source=github.com&utm_medium=referral&utm_content=camwest/react-slot-fill&utm_campaign=Badge_Coverage) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)



![Image](images/slot-fill-logo.png)

Slot & Fill component for merging React subtrees together.

## Check out the [simple demo on glitch](https://rsf-demo.glitch.me/) ([view source](https://glitch.com/edit/#!/project/rsf-demo))

## Installation

```
npm install react-slot-fill --save
```

### Check out the examples locally

```
git clone https://github.com/camwest/react-slot-fill
cd react-slot-fill
npm start
```

## Usage

**Note** These examples use React Fiber Alpha

### Toolbar.js

```jsx
import { Slot, Fill } from 'react-slot-fill';

const Toolbar = (props) =>
  <div>
    <Slot name="Toolbar.Item" />
  </div>

export default Toolbar;

Toolbar.Item = (props) =>
  <Fill name="Toolbar.Item">
    <button>{ props.label }</button>
  </Fill>
```

### Feature.js

```jsx
import Toolbar from './Toolbar';

const Feature = () =>
  [
    <Toolbar.Item label="My Feature!" />
  ];
```

### App.js

```jsx
import Toolbar from './Toolbar';
import Feature from './Feature';

import { Provider } from 'react-slot-fill';

const App = () =>
  <Provider>
    <Toolbar />
    <Feature />
  </Provider>

ReactDOMFiber.render(
  <App />,
  document.getElementById('root')
);
```

## Components

### <Provider>

Creates a Slot/Fill context. All Slot/Fill components must be descendants of Provider. You may only pass a single descendant to `Provider`.

```typescript
interface Provider {
  /**
   * Returns instances of Fill react components
   */
  getFillsByName(name: string): Fill[];
  /**
   * Return React elements that were inside Fills
   */
  getChildrenByName(name: string): React.ReactChild[];
}
```

`getFillsByName` and `getChildrenByName` are really useful for testing Fill components.
See [src/lib/__tests/Provider.test.tsx](src/lib/__tests/Provider.test.tsx) for an example.

### <Slot>

Expose a global extension point

```javascript
import { Slot } from 'react-slot-fill';
```

#### Props

```typescript
interface Props {
  /**
   * The name of the component. Use a symbol if you want to be 100% sue the Slot
   * will only be filled by a component you create
   */
  name: string | Symbol;

  /**
   * Props to be applied to the child Element of every fill which has the same name.
   *
   *  If the value is a function, it must have the following signature:
   *    (target: Fill, fills: Fill[]) => void;
   *
   *  This allows you to access props on the fill which invoked the function
   *  by using target.props.something()
   */
  fillChildProps?: {[key: string]: any}

  /**
   * A an optional function which gets all of the current fills for this slot
   * Allows sorting, or filtering before rendering. An example use-case could
   * be to only show a limited amount of fills.
   *
   * By default Slot injects an unstyled `<div>` element. If you want greater
   * control over presentation use this function.
   *
   * @example
   * <Slot name="My.Slot">
   * {(items) => <Component>{items}</Component>}
   * </Slot>
   */
  children?: (fills) => JSX.Element
}
```

### <Fill>

Render children into a Slot

```javascript
import { Fill } from 'react-slot-fill';
```

#### Props

```typescript
interface Props {
  /**
   * The name of the slot that this fill should be related to.
   */
  name: string | Symbol

  /**
   * one or more JSX.Elements which will be rendered
   */
  children: JSX.Element | JSX.Element[]
}
```

You can add additional props to the Fill which can be accessed in the parent node of the slot via fillChildProps.
