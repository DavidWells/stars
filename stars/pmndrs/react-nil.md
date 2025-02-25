---
repo: pmndrs/react-nil
url: 'https://github.com/pmndrs/react-nil'
homepage: ''
starredAt: '2021-01-03T05:42:59Z'
createdAt: '2020-09-15T19:53:38Z'
updatedAt: '2025-02-24T10:54:19Z'
language: TypeScript
license: MIT
branch: master
stars: 909
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:18:10.199Z'
description: ⃝ A react null renderer
tags:
  - fiber
  - node
  - 'null'
  - react
  - renderer
---

[![Size](https://img.shields.io/bundlephobia/minzip/react-nil?label=gzip&style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/react-nil)
[![Version](https://img.shields.io/npm/v/react-nil?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/react-nil)
[![Downloads](https://img.shields.io/npm/dt/react-nil.svg?style=flat&colorA=000000&colorB=000000)](https://npmjs.com/package/react-nil)
[![Twitter](https://img.shields.io/twitter/follow/pmndrs?label=%40pmndrs&style=flat&colorA=000000&colorB=000000&logo=twitter&logoColor=000000)](https://twitter.com/pmndrs)
[![Discord](https://img.shields.io/discord/740090768164651008?style=flat&colorA=000000&colorB=000000&label=discord&logo=discord&logoColor=000000)](https://discord.gg/poimandres)

<p align="left">
  <a id="cover" href="#cover">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset=".github/dark.svg">
      <img style="white-space:pre-wrap" alt="There are legitimate use cases for null components or logical components.&#10&#10A component has a lifecycle, local state, packs side-effects into useEffect, memoizes calculations in useMemo, orchestrates async ops with suspense, communicates via context, maintains fast response with concurrency. And of course — the entire React ecosystem is available." src=".github/light.svg">
    </picture>
  </a>
</p>

#### Nothing to see here ...

Quite so. This package allows you to bring React's high-level component abstraction to Node or wherever you need it. Why not manage your REST endpoints like routes on the client, users as components with mount/unmount lifecycles, self-contained separation of concern, and clean side effects? Suspense for requests, etc.

You can try a small demo here: https://codesandbox.io/s/react-nil-mvpry

#### How does it work?

The following renders a logical component without a view, it renders nothing, but it has a real lifecycle and is managed by React regardless.

```jsx
import { useState, useEffect } from 'react'
import { render } from 'react-nil'

function Foo() {
  const [active, set] = useState(false)
  useEffect(() => void setInterval(() => set((a) => !a), 1000), [])

  // false, true, ...
  console.log(active)
}

render(<Foo />)
```

We can take this further by rendering made-up elements that get returned as a reactive JSON tree from `render`.

You can take a snapshot for testing via `React.act` which will wait for effects and suspense to finish.

```tsx
import { useState, useEffect, act } from 'react'
import { render } from 'react-nil'

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      timestamp: Record<string, unknown>
    }
  }
}

function Test() {
  const [value, setValue] = useState(-1)
  useEffect(() => setValue(Date.now()), [])
  return <timestamp value={value} />
}

const container = await act(async () => render(<Test />))

// { type: 'timestamp', props: { value: number }, children: [] }
console.log(container.head)
```
