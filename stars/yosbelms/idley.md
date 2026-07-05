---
repo: yosbelms/idley
url: 'https://github.com/yosbelms/idley'
homepage: null
starredAt: '2022-01-22T21:48:36Z'
createdAt: '2018-09-21T04:47:56Z'
updatedAt: '2025-02-11T15:50:46Z'
language: TypeScript
license: NA
branch: master
stars: 36
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T20:37:19.151Z'
description: Helper functions for implementing the idle-until-urgent pattern
tags: []
---

# Idley

Helper functions for implementing the idle-until-urgent pattern. For detailed explanation of this pattern, see [this](https://philipwalton.com/articles/idle-until-urgent/) article from [Philip Walton](https://github.com/philipwalton).

## Installation

```
// with yarn
yarn add idley

// with npm
npm install idley
```

## Usage

```ts
// ES2015+ and TS
import { computed, throttled, debounced } from 'idley'

// CommonJS
var idley = require('idley')
```

## Functions

### Computed

`computed(fn: function): function`

Creates a function that returns the result of executing the passed `fn` when the browser is idle. If the result is requested and it has not been computed yet, the function will be executed immediately.

```ts
import { computed } from 'idley'

const heavyTask = () => 5

const foo = computed(heavyTask)

console.log(foo()) // 5
```

### Throttled

`throttled(fn: function): function`

Creates a throttled function that only invokes the passed `fn` at most once when the browser is idle.

```ts
import { throttled } from 'idley'

const heavyTask = (n) => console.log(n)

const foo = throttled(heavyTask)

foo(1)
foo(2)

// 2
```

### Debounced

`debounced(fn: function): function`

Creates a debounced function that delays invoking the passed `fn` until the browser is idle.


```ts
import { debounced } from 'idley'

const heavyTask = (n) => console.log(n)

const foo = debounced(heavyTask)

foo(1)
foo(2)

// 1
// 2
```

_This library relies on requestIdleCallback. It will degrade to requestAnimationFrame, or setTimeout in this order_

Published under MIT Licence

(c) Yosbel Marin 2018
