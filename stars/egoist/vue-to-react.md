---
repo: egoist/vue-to-react
url: 'https://github.com/egoist/vue-to-react'
homepage: ''
starredAt: '2019-07-11T22:01:33Z'
createdAt: '2019-07-06T13:22:47Z'
updatedAt: '2025-01-20T19:14:20Z'
language: TypeScript
license: MIT
branch: master
stars: 201
isPublic: true
isTemplate: false
isArchived: false
isFork: false
hasReadMe: true
refreshedAt: '2025-02-25T21:19:29.531Z'
description: Turn a Vue component into a React component.
tags: []
---

# vue-to-react

[![NPM version](https://badgen.net/npm/v/@egoist/vue-to-react)](https://npmjs.com/package/@egoist/vue-to-react) [![NPM downloads](https://badgen.net/npm/dm/@egoist/vue-to-react)](https://npmjs.com/package/@egoist/vue-to-react) [![CircleCI](https://badgen.net/circleci/github/egoist/vue-to-react/master)](https://circleci.com/gh/egoist/vue-to-react/tree/master) [![donate](https://badgen.net/badge/support%20me/donate/ff69b4)](https://github.com/sponsors/egoist)

This works for both Vue 2 and Vue 3.

## Install

```bash
yarn add @egoist/vue-to-react
```

## Usage

```js
import React from 'react'
import { render } from 'react-dom'
import toReact from '@egoist/vue-to-react'

const VueComponent = {
  data() {
    return {
      count: 0
    }
  },

  render(h) {
    return h(
      'button',
      {
        on: {
          click: () => this.count++
        }
      },
      [this.count]
    )
  }
}

const ReactComponent = toReact(VueComponent)

render(<ReactComponent />, document.getElementById('app'))
```

### Passing Props

By default we pass all props from React to Vue:

```js
const Counter = toReact({
  props: ['initialCount'],
  render(h) {
    return h('button', {}, [this.initialCount])
  }
})

const App = <Counter initialCount={0} />
```

However you can customize how the props are passed to Vue with the `passProps` option:

```js
toReact(VueComponent, {
  // Only pass `initialCount` prop
  passProps: props => ({ initialCount: props.initialCount }),
  // Or disable props
  passProps: false
})
```

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**@egoist/vue-to-react** © [EGOIST](https://github.com/egoist), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by EGOIST with help from contributors ([list](https://github.com/egoist/vue-to-react/contributors)).

> [github.com/egoist](https://github.com/egoist) · GitHub [@EGOIST](https://github.com/egoist) · Twitter [@\_egoistlily](https://twitter.com/_egoistlily)
