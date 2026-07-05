---
repo: kyleshevlin/react-generate-context
url: 'https://github.com/kyleshevlin/react-generate-context'
homepage: ''
starredAt: '2021-10-24T05:32:17Z'
createdAt: '2021-10-16T16:26:13Z'
updatedAt: '2024-04-15T01:09:45Z'
language: TypeScript
license: MIT
branch: main
stars: 25
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:42.009Z'
description: A helper function for reducing React Context boilerplate
tags:
  - context
  - hooks
  - react
---

# `react-generate-context`

**React Context with less boilerplate.**

Creating a new React Context involves a few steps. `react-generate-context` removes a couple of those steps.

The `react-generate-context` package is a single function, `generateContext`, that generates a React Context (in closure) and returns to you the Provider and custom hook to access it in one step. All you need to do is give it a function that creates and updates the `value` prop for your Context. Let's go through an example:

```tsx
import generateContext from 'react-generate-context'

type Context = [
  number,
  {
    inc: () => void
    dec: () => void
  }
]

type Props = {
  startingCount: number
}

/**
 * `generateContext` receives a custom hook function that manages the `value`
 * passed to the Provider under the hood. The function takes any `props` passed
 * to the Provider
 */
const useGetCounterValue = ({ startingCount }: Props): Context => {
  const [state, setState] = React.useState(startingCount)
  const handlers = React.useMemo(
    () => ({
      inc: () => {
        setState(s => s + 1)
      },
      dec: () => {
        setState(s => s - 1)
      },
    }),
    []
  )

  return [state, handlers]
}

/**
 * An optional defaultValue can be passed to the underlying `createContext` function
 */
const defaultValue: Context = [
  0,
  {
    inc: () => {},
    dec: () => {},
  },
]

/**
 * generateContext returns a tuple of a Provider and a custom
 * hook to consume the context. Array destructuring allows you
 * to name the Provider and hook whatever you need to easily
 */
const [CounterProvider, useCounter] = generateContext<Context, Props>(
  useGetCounterValue,
  defaultValue
)

/**
 * We can consume that context in a component with the hook
 */
function Counter() {
  const [count, { inc, dec }] = useCounter()

  return (
    <div>
      {count}
      <div>
        <button onClick={inc}>+</button>
        <button onClick={dec}>-</button>
      </div>
    </div>
  )
}

/**
 * And use the generated Provider
 */
function App() {
  return (
    <CounterProvider startingCount={100}>
      <Counter />
    </CounterProvider>
  )
}
```

## Installation

```
npm install react-generate-context
```

or

```
yarn add react-generate-context
```

## API

```typescript
const [MyProvider, useMyContext] = generateContext<Context, Props>(
  useGetContextValue,
  defaultValue
)
```

`generateContext` receives two arguments: `useGetContextValue` and an optional `defaultValue` for your Context.

#### `useGetContextValue`

```typescript
type UseGetContextValue<Props, Context> = (props: Props) => Context
```

The `useGetContextValue` is a custom hook function that derives the `value` of your context. It is given any `props` passed to the Provider.

Example:

```typescript
type Props = {
  startingCount: number
}

type Context = [
  number,
  {
    inc: () => void
    dec: () => void
  }
]

const useGetCounterValue = ({ startingCount }: Props): Context => {
  const [state, setState] = React.useState(startingCount)
  const handlers = React.useMemo(
    () => ({
      inc: () => {
        setState(s => s + 1)
      },
      dec: () => {
        setState(s => s - 1)
      },
    }),
    []
  )

  return [state, handlers]
}
```

#### `defaultValue`

`defaultValue` is the value utilized by the Context when a Consumer is rendered without a Provider as a parent. It is passed to `React.createContext` under the hood.

## Why?

Reducing boilerplate aside, there's one other good reason to use a helper like `generateContext` when creating Contexts (or at least follow the pattern of its `Provider`).

The Provider returned to you does not allow you to put _any_ components or elements in the same scope where the state change for the context is occurring. This prevents you from making a mistake that causes unnecessary rerendering. For example:

```javascript
import React from 'react'
import SomeOtherFeature from './SomeOtherFeature'
import useManageValue from './useManageValue'

const defaultValue = {}

const MyContext = React.createContext(defaultValue)
const useMyContext = () => React.useContext(MyContext)

const MyProvider = ({ children }) => {
  const value = useManageValue()

  return (
    <MyContext.Provider value={value}>
      {children}
      <SomeOtherFeature />
    </MyContext.Provider>
  )
}
```

In this instance, because we have composed `SomeOtherFeature` in the same scope as where our state change for `value` occurs, no matter what you do to `SomeOtherFeature`, _even if it doesn't consume `useMyContext`_, it will be rerendered _every_ time `value` changes.

The Provider returned to you by `generateContext` _only_ allows you to use it with composition via `children`. It ensures that no mistake like the one above can be made now or in the future. Your `Provider` will work as well as it can. The onus is still on you to write a good custom hook to manage the `value`.
