---
repo: artalar/act
url: 'https://github.com/artalar/act'
homepage: ''
starredAt: '2023-01-06T17:34:12Z'
createdAt: '2023-01-05T00:13:05Z'
updatedAt: '2025-01-18T11:26:57Z'
language: TypeScript
license: NA
branch: main
stars: 180
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T19:59:59.420Z'
description: >-
  Act is the most efficient reactive state library in both: speed, size,
  correctness.
tags:
  - react
  - reactive
---

**Act** is a reactive library that is incredibly efficient in terms of speed, size and consistency. [Here is](https://perf.js.hyoo.ru/#!bench=9h2as6_u0mfnn) a big benchmark comparing all popular state managers, which Act passes with flying colors. The size is only [0.5KB gzipped](https://bundlejs.com/?q=%40artalar%2Fact)!

I built it for fun, but you are free to use it in your projects. I'm open to bug reports and suggestions.

> See also: [how is Act so small and so fast?](#background)

## Installation

```sh
npm i @artalar/act
```

## Usage

Pass initial value to `act` function to create mutable observer or pass a callback to create a computed observer. You could mutate observer by call it with a new value. All observers are lazy and recalculates only when has a subscribtion. You could read acts (lets call it "act" / "acts") by call it as a function. Act reading inside a computer is reactive.

All updates are batched and will be applied in the next microtask. So you can update multiple acts synchronously and all computed will callculate and subscribers will be notified only once. You could redefine this behavior by [overriding `act.notify` method](#sync-batch).

> See [React example below](#react-example).

### Basic example

You could use Act with React and Svelte without bindings!

[![Edit @artalar/act](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/artalar-act-9wz836?file=/src/index.ts)

```ts
import { act } from '@artalar/act'

// create mutable reactive value reference
const counterAct = act(0)
// create computed reactive value reference, use other acts here in any conditions
const isOddAct = act(() => Boolean(counterAct() % 2))

// kind a actions
const set = (n: number) => counterAct(n)
const add = (n: number) => counterAct(counterAct() + n)
const inc = () => add(1)

// subscribe
const un = isOddAct.subscribe((v) => console.log('isOdd', v))
// 'isOdd false'

;(async () => {
  set(0)
  await 0
  // nothing

  inc()
  await 0
  // 'isOdd true'
  add(2)
  await 0
  // nothing
  inc()
  await 0
  // 'isOdd false'

  inc()
  inc()

  await 0
  // nothing

  inc()
  inc()
  inc()

  await 0
  // 'isOdd true'

  // unsubscribe
  un()
  inc()
  await 0
  // nothing
})()
```

### Filter example

The computed act accepts an equality check function as the second argument and allows you to filter updates with `shallowEqual` etc.

```ts
const filterAct = act('')
const listAct = act([])
const listFilteredAct = act(
  () => {
    const filter = filterAct()
    return listAct().filter((text) => text.includes(filter))
  },
  (prev, next) => isShallowEqual(prev, next),
)
```

### Conditional branches example

Act's proudest feature is conditional branches optimization. Your conditions and the usage of other acts in them, no matter how complex, will be optimized in the most efficient way at the minimal cost.

```ts
const isAdminAct = act(false)
const listAct = act([])
const filterAct = act('')
const listFilteredAct = act(
  () => listAct().filterAct((text) => text.includes(filterAct())),
  isShallowEqual,
)
export const listViewAct = act(() =>
  isAdminAct() ? listFilteredAct() : listAct(),
)
```

### Dynamic acts example

This snippet shows how you can use (subscribe to) acts inside loops and create (and delete) acts dynamically. This could be useful for optimizing your data updates and subscriptions.

> See [example dynamic list in React](#react-example-dynamic-list).

```ts
const listAct = act([])
const sumAct = act(() =>
  listAct().reduce((acc, counterAct) => acc + counterAct(), 0),
)
const add = () => listAct([...listAct(), act(0)])
```

### React example

Here comes the magic... You don't need an adapter to use Act in React! The built-in [useSyncExternalStore](https://beta.reactjs.org/reference/react/useSyncExternalStore) is the only thing you need.

[![Edit @artalar/act react](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/artalar-act-react-vyqch1?fontsize=14&hidenavigation=1&theme=dark)

```ts
const counterAct = act(0)
const inc = () => counterAct(counterAct() + 1)

export default function App() {
  const counter = useSyncExternalStore(counterAct.subscribe, counterAct)

  return <button onClick={inc}>{counter}</button>
}
```

### React example dynamic list

This example shows how you can share state between components and optimize rerenders with a couple of lines.

[![Edit @artalar/act react](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/artalar-act-react-list-vesmct?file=/src/App.tsx)

### Svelte

Act provides a compatible subscription interface, so you can use the `$` prefix to subscribe to an act.

[REPL example](https://svelte.dev/repl/66d2d612134c46d3b3f5a0b933d2c200?version=3.55.0)

### Sync batch

You could specify your own batch function by redefining `act.notify`. By default `act.notify` scheduled to the next tick, but you could handle it and delay for a more time or call it synchronously to call subscribers immediately.

```ts
const { notify } = act
act.notify = () => requestAnimationFrame(notify)
```

## Background

![image](https://user-images.githubusercontent.com/27290320/236627543-0d3793e9-ce7a-4b87-b489-c01524fc7e82.png)

> https://excalidraw.com/#json=A5gmwbDPUWevsv-0U2utk,DdyrOlteLoiGuUZU3KFe2w

I have spent half a decade researching reactive programming and prototyping. The most production-ready and feature-rich result of my work is [reatom.dev](https://www.reatom.dev/). Under the hood Reatom uses topological sorting on top of immutable graph features, to achieve things like DI and lifecycle hooks. But does it apply to each and every use case? Nope. So I decided to create a lightweight version of Reatom with a simpler api, lower cost and smaller size.

Sooo, how does it work? One of the challenges in reactive programming is optimizing node combination, which can cause [glitches](https://en.wikipedia.org/wiki/Reactive_programming#Glitches). However, conditional usage of computed dependencies is the hardest and most painful thing, as there is a lot of corner cases to consider if you want conditions of any kind to be supported in the most optimal way.

For example, when you need to unsubscribe from all unused dependencies, how do you know which of them are used and which are not? Basically, there is a hook working under the hood to link the parent and the child of a computation. And when the dependencies used in your computations are the same every time, the hook understands it and doesn't resubscribe to them. But what if you use the same dependency several times? Or, when you stop using a dependency at the top level of your computations, but keep using other dependencies at lower levels, how to understand whether the lower dependencies are new or were used before?

All these cases are managed with a complex cache invalidation policy which has a significant performance and memory cost.

But... We already use a lot of memory for cache and CPU for its invalidation? So, maybe that overhead is not worth it and the whole recalculation of all dependency graph could be cheaper? Is it? Well, this library answers **YES**.

Act does not use bidirectional links in dependency graphs and doesn't need to invalidate them. The only connection built from scratch on each update is "subscriber <- (any number of computed nodes without knowledge of each other) <- value setter (`ActValue` type)". This is super cheap.

But there is one limitation: as we don't have cross-links and invalidation states, if we want to read an act without subsciption, we need to run all invalidation logic each time. And there is another performance. Because dependency setters need to know about each subscriber, each subscriber should traverse the whole graph every time and if you have one complex act with many subscribers it would not be perfectly optimal. The good news are: 1) this is a rare case; 2) the whole graph traversal is probably cheap thanks to JIT.

However, [Reatom](https://www.reatom.dev/) combines both approaches and will optimize all your computations in the most complex cases, allowing you to inspect immutable snaphots of any update. If you need something more feature-rich, have a look at it.

### Algorithm

Subscriber is the source of truth. Subscriber pulls a computer, and the computer collects all used dependencies and its states.

When someone tries to read a _computer act_ state, it first walks through the previous dependencies list and compares the fresh state with the saved state.
If nothing has changed, it returns the current computed state; otherwise, it runs a passed computed function first and collects the dependencies list from scratch.

Each touched _value act_ saves the current subscriber (to feature update notification) and add itself to subscriber values list (to unsubscribe).

Every subscriber should traverse the whole dependencies graph to be linked with all depending value acts.

When a value act receives an update, it clears the subscribers list and calls them. Each subscriber clears self values list to collect it from scratch and prevent memory leaks in unused value acts.

As you might have noticed, all links are immutable. There is no cache invalidation and no memory or complexity overhead.

Every traverse (subscription invalidation) has a version which helps to cache visited acts.

The main limitation is a computer reading out of reactive notification.
As we can only have visiting cache during invalidation, each invalidation invalidates the cache of other invalidation.
It means that the update of one graph will drop the visited cache of other graph.
However, it is a rare case in a fully reactive system, and the invalidation itself is cheap.
